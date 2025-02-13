# pathogen Vocabulary Specification

![CI](https://github.com/w3c-ccg/pathogen-vocab/workflows/CI/badge.svg) [![CD](https://github.com/w3c-ccg/pathogen-vocab/actions/workflows/cd.yml/badge.svg)](https://github.com/w3c-ccg/pathogen-vocab/actions/workflows/cd.yml)

## DRAFT / EXPERIMENTAL VOCABULARY

A pathogen is any organism that can produce disease. A pathogen may also be referred to as an infectious agent, or simply a germ or virus. This Pathogen Vocab specification describes a Linked Data vocabulary for asserting Verifiable Credentials related to pathogen information such as:
- medical test & immunization measurement event (PCR, antibody, antigen, lateral flow, other test)
- medical vaccination event (see "Vaccination Certificate Vocabulary")
- infection risk and access control

## Related Projects

The pathogen vocab is inspired building upon the following community work:
- [Vaccination Certificate Vocabulary](https://w3c-ccg.github.io/vaccination-vocab/)
- [WHO Smart Vaccination Card Work](https://www.who.int/publications/m/item/interim-guidance-for-developing-a-smart-vaccination-certificate) 
- [CCG Traceability Vocabulary](https://github.com/w3c-ccg/traceability-vocab)
- [Interoperability of health certificates trust framework](https://ec.europa.eu/health/sites/health/files/ehealth/docs/trust-framework_interoperability_certificates_en.pdf) of EU E-Health Network

We encourage contributions meeting the [Contribution Guidelines](CONTRIBUTING.md). While we prefer the creation of issues and Pull Requests in the GitHub repository, discussions often occur on the [public-credentials](http://lists.w3.org/Archives/Public/public-credentials/) mailing list as well.

## Getting Started

If you are only interested in the vocabulary itself, the items contained therein, and/or the example Verifiable Credentials, please see the [spec itself](https://w3c-ccg.github.io/pathogen-vocab/).

If you are a developer who is interested in working directly with the vocabulary, possibly adding schemas, and/or running tests and viewing details of how the JSON-JD and resultant Verifiable Credentials are built, then read on.

### Developer Setup

To get started building, testing, or contributing to this repository you will need at a minimum [`Node.js`](https://nodejs.org/en/) and [`git`](https://git-scm.com/)

After you have the dependencies, the first time setup is as follows:

1) checkout this repository

```
$ git checkout https://github.com/w3c-ccg/pathogen-vocab.git
```

2) Once the repository is checked out, run `npm install` in the created directory to get all project dependencies

```
$ cd pathogen-vocab
$ npm install
```

3) After the repository is checked out, and all dependencies have been installed, then you can build the vocabulary itself

```
$ npm runbuild:all
```
This can take a while, as it will run through the entire process of merging the individual schemas, creating test vectors, and ultimately creating a signed verifiable credential for each vocabulary item.  If you would like to view details on the build process, please see the [README](https://github.com/w3c-ccg/pathogen-vocab/tree/main/packages/pathogen-schemas) located in the actual schemas build project folder.

4) Finally, once everything is built and tested, you can serve up the spec and related documentaion locally: 

```
$ npx serve docs
```

### Making Contributions

This repository takes a "test / code first" approach to vocabulary development and deals specifically with data types required for
track and trace of supply chain data, particularly in a cross border context. Focus is especially given to schema objects that describe
common supply chain elements, shared by multiple use cases, as well as to items for which inspections and audits may be required, and thereby
merit creation of Verifiable Credentials to store the results of such an inspection for verification by a third party.

In order to have your contributions accepted you MUST:

1. Add synthetic data generation for any new data types / vocabulary terms.
2. Add any "special case" testing you believe is helpful for your data structures.
3. Run all tests locally and ensure they are all passing.
4. Generate the latest version of the spec to include your changes to vocabular / data model.
5. Open a Pull Request with your changes, a clear description of them in the description, and demonstrate passing CI Tests.
6. Any references to schemas you wish to include in your schema should be recreated locally and referenced there. In these local schemas, only include the properties relevant to the schema you have created. For example, [Person](https://schema.org/Person) is an existing schema on schema.org, but a Person.json schema has been added to this repo, including only the relevant and used properties for the other pathogen schemas. This is to hopefully make pathogen schemas easier to understand and manage by not incorporating too many unnecessarily large schemas. The schemas that have been made local in this way (like Person.json) should still reference the schema.org entry like so:

```
    "$comment": "{\"term\": \"Person\", \"@id\": \"https://schema.org/Person\"}",
```

Pull requests will not as a rule be merged if any conflicts exist, or if testing is incomplete.

Any changes that potentially introduce breaking or non-backwards compatible functionality MUST have a corresponing issue and discussion, and will require consensus from the editors in order to be introduced or to have any related Pull Requests accepted and merged.

A one week (7 day) period will be provided for review of pull requests related to data schemas or project functionality prior to merge to allow suffient review time. Execptions may be made for essential documentation, or to allow for immediate hotfix of security issues or functionality breaking items.


## Ontology Structure

This repository hosts [json-schema](https://json-schema.org/) which it uses to create [jsonld](https://json-ld.org/).

All JSON Schema must have an `$id` property, and it must resolve to the JSON-Schema Document.

For example see [https://w3id.org/pathogen/schemas/Person.json](https://w3id.org/pathogen/schemas/Person.json).

We are currently 🚧 EXPERIMENTING 🚧 with injecting JSON-LD concepts like `@id` and `@type` in JSON Schema using `$comment`.

For example see:

```json
"$id": "https://w3id.org/pathogen/schemas/Person.json",
"$schema": "http://json-schema.org/draft-07/schema#",
"$comment": "{\"term\": \"Person\", \"@id\": \"https://schema.org/Person\"}",
"title": "Person",
"description": "A person",
```

These attributes are then used to determinstically build a JSON-LD context hosted at:

[https://w3id.org/pathogen/v1](https://w3id.org/pathogen/v1)

This context can then be used to produce verifiable credentials for supply chain pathogen, for example:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/pathogen/v1"
  ],
  "id": "https://example.com/123",
  "type": ["VerifiableCredential"],
  "issuer": {
    "id": "did:key:z6MkoTHsgNNrby8JzCNQ1iRLyW5QQ6R8Xuu6AA8igGrMVPUM"
  },
  "issuanceDate": "2020-03-10T04:24:12.164Z",
  "expirationDate": "2029-03-10T04:24:12.164Z",
  "credentialSubject": {
    "id": "did:example:123",
    "type": "Place",
    "address": {
      "type": "PostalAddress",
      "organizationName": "Bednar - Kutch",
      "streetAddress": "8440 Khalid Canyon",
      "addressLocality": "Gislasonland",
      "addressRegion": "Ohio",
      "postalCode": "96546",
      "addressCountry": "Liechtenstein"
    }
  },
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2021-02-09T21:54:29.223Z",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..1Xba7-B-YTstwnbIewQFpbMgGfOdRuoDLEBezZlb4M1qMwI9GCUAbeTCsGCPd62XLwyNjPqb9aJGj_xk7iUiBw",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:key:z6MkoTHsgNNrby8JzCNQ1iRLyW5QQ6R8Xuu6AA8igGrMVPUM#z6MkoTHsgNNrby8JzCNQ1iRLyW5QQ6R8Xuu6AA8igGrMVPUM"
  }
}
```

Inside JSON Schema you will see things like:

```json
 "$ref": "https://w3id.org/pathogen/schemas/Product.json"
```

These are JSON Schema reference tags and they allow for nesting of types that are defined in JSON Schema.

In general, you should strive to model concepts as types that are defined in JSON Schema and composed from smaller types.

## Versioning

This repository will be versioned at periodic points in time with a Q1 Calendar Year target for major releases. Versioning tags will follow a pattern of `[MAJOR].[MINOR].[PATCH]`
Version Definitions:

- MAJOR - significant changes rolled forward from the previous major version. Major versions MAY include breaking or non-backwards compatible changes
- MINOR - backwards compatible changes that may introduce new functionality or extensions of objects that are backwards compatible
- PATCH - minor changes that are non breaking and resolve discovered issues or bugs

As a rule, versioning will follow the specification outlined in the [Semantic Versioning 2.0](https://semver.org/) spec

This approach to versioning gives the ability to integrate with and provided automated testing and validation against defined types without worry of instability or breaking changes being introduced, while also limiting the frequency of possibly breaking changes to prevent a large number of incompatible versions.


## Project Structure

This project uses [lerna](https://github.com/lerna/lerna) to manage packages and dependencies as a single project.

In addition the following key areas in the repo should be noted for understanding how to add schemas and understand the code layout:

- The index file in [docs](./docs/index.html) is the master public facing documentation page.  It is a baseline specification, with the bulk of the contents being automatically generated after tests have been run on items
- JSON Schema for each object to be referenced is stored in the [schemas](.docs/schemas) folder
- Code Generation to create synthetic test data is located in [generators](./packages/pathogen-schemas/src/generators)
- Test Vectors are run against fixtures that are auo generated and located in the [fixtures](./packages/pathogen-schemas/src/__fixtures__) folder, and correspond to the defined schemas
- [Contexts](./docs/contexts) stores the interim combined json-ld vocabulary for test and verification
- Verifiable Credential Examples are autogenerated and populated into the spec. Example single credential and VC examples are located in the fixtures folder mentioned above.

### Contributing to Vocabulary

All the terms, schemas and context definitions are generated from [./packages/pathogen-schemas](./packages/pathogen-schemas).

```
cd ./packages/pathogen-schemas
npm i
npm run build:all
npm run test:schemas
```

The commands above will build the spec and test vectors deterministically from source, clean up any formatting using lint, and run all tests.

### Adding a new type

1. create a [JSON Schema](https://json-schema.org/) in the [schemas](./packages/pathogen-schemas/schemas) folder.
2. add synthetic data generation for it to the [generators](./packages/pathogen-schemas/src/generators).
4. run the build using: `npm run build:all`
   Fix any errors found.
5. review the latest spec changes by serving docs: `npx serve ./docs`.

## Additional notes

If you are unsure of how to do something please open an issue, and ask for help.

Please follow the conventions established for the other properties, for example:

### General Formatting and Guidelines

UTF-8 should be used as the standard encoding for all assets in this repository, and any services utilizing these objects as schemas should support UTF-8

Wherever possible JSON-LD in use as a Verifiable Credential should be ["small in size"](https://www.w3.org/TR/vc-imp-guide/#pf4a). Some harder limits will likely be established based on common and broadly distributed VC libraries but at this time be aware that a VC could be rejected from this repo for exceeding reasonable size limits

### Room for Improvements

Certain items such as `allOf` on the JSON Schema side of things would be quite helpful to support, so that better patterns of inheritence can be modeled.  We are open to contriutions that improve our support of auto-generation of JSON-LD from JSON Schema.

### Date / Time

Wherever possible, dates should be formatted as `YYYY-MM-DD` so as to be directly compatible with `xsd:date`.  Static Dates should be used in generated data so as to avoid unecessary changes in the repository on build.

### Place (as an example)

- [JSON Schema](./docs/schemas/Place.json)
- [Data Generator](./packages/pathogen-schemas/src/generators/Place.js)
- [JSON-LD Context (derrived)](./docs/contexts/pathogen-v1.jsonld)
- [Vocabular Definition (derrived)](https://w3id.org/pathogen#place)


### Common Environment Variables for Build and Deelopment

Some useful environment variables to make testing, generation, and validation stricter, or more verbose are detailed here:

```
VERBOSE_BUILD=true        # sets general verbosity levels up when building

FULL_ERROR_HANDLING=true  # forces hard stops at points in the process when warning or other exceptions are caught

VERBOSE_BUILD_GENERAL     # increases verbosity in object generation on common objects

VERBOSE_BUILD_AG=true     # indstry veritcal specific stops, see also VERBOSE_BUILD_STEEL and related
```
