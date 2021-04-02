const path = require('path');
const fs = require('fs-extra');
const { Ed25519KeyPair } = require('@transmute/did-key-ed25519');
const { Ed25519Signature2018 } = require('@transmute/ed25519-signature-2018');
//const { Bls12381G2KeyPair } = require("@transmute/did-key-bls12381");
//const { BbsBlsSignature2020 } = require("@mattrglobal/jsonld-signatures-bbs");
const vcjs = require('@transmute/vc.js');
const { documentLoader } = require('../src/data/vc/documentLoader');

console.log('🧪 Initializing credential builder');
const schemas = require('../index.js');

const saveDir = __dirname.split('packages')[0];

const issueCreds = async (credTemplate, schemaName) => {
    try {
        const key = Ed25519KeyPair.from(require('../src/data/vc/keypair.json'));

        const verifiableCredential = await vcjs.ld.issue({
            credential: credTemplate,
            suite: new Ed25519Signature2018({
                key,
                date: '2019-12-11T03:50:55Z'
            }),
            documentLoader,
        });
        const result = await vcjs.ld.verifyCredential({
            credential: verifiableCredential,
            suite: new Ed25519Signature2018(),
            documentLoader,
        });
        // console.log(result)
        if (result.verified) {
            const vcFile = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/vc.json`);
            const vcFileDoc = path.resolve(saveDir, `./docs/credentials/${schemaName}.json`);
            if (process.env.VERBOSE_BUILD) {
                console.log('Writing credential example to:', vcFile);
            }
            fs.outputFileSync(
                vcFile,
                JSON.stringify(verifiableCredential, null, 2),
            );
            fs.outputFileSync(
                vcFileDoc,
                JSON.stringify(verifiableCredential, null, 2),
            );
        } else {
            console.log('Error verifying credential for:', schemaName);
        }
    } catch (credentialError) {
        console.warn('Could not issue Credential:', schemaName, '\n', credentialError);
        if (process.env.FULL_ERROR_HANDLING) {
            process.exit(1);
        }
    }
};

const credPromises = [];
Object.keys(schemas).forEach((schemaName) => {
    if (process.env.VERBOSE_BUILD) {
        console.log('Generating credentials for:', schemaName);
    }
    const schema = schemas[schemaName];
    const exampleFile = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/credential.json`);
    if (!fs.existsSync(exampleFile)) {
        console.warn(`No good example for ${schemaName} to generate credential from`);
    } else {
        try {
            if (process.env.VERBOSE_BUILD) {
                console.log('Generating credential for:', schemaName);
            }
            const credTemplate = JSON.parse(
                fs.readFileSync(
                    exampleFile,
                ),
            );
            credPromises.push(issueCreds(credTemplate, schemaName));
        } catch (fileErr) {
            console.log('Error reading credential template for schema:', schemaName);
        }
    }
});

Promise.allSettled(credPromises).then((results) => results.forEach((result) => {
    // noop
    if (process.env.VERBOSE_BUILD) {
        console.log(result.status);
    }
}));
