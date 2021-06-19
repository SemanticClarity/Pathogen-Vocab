const faker = require('faker');
const { getGHPEventRecipient } = require('./GHPEventRecipient');

faker.seed(42);

const diseaseType = faker.random.arrayElement(['900000000000003001']);
const descType = faker.random.arrayElement([]);
const vaxType = faker.random.arrayElement([]);

const getGHPVaccinationCredential = () => {
const getPatientInfo = () => {
    const subject = getGHPEventRecipient();
    return subject;
};
const getVaxOrder = () => {
    const order = ['1 of 2', '2 of 2', '1 of 1'];
    return order[faker.random.number({ min: 0, max: 2 })];
};

const getMarketingAuthHolder = () => {
    const authholders = [
            'AstraZeneca AB',
            'Biontech Manufacturing GmbH',
            'Moderna Biotech Spain S.L.',
            'Novavax CZ AS'
        ];

    return authholders[faker.random.number({ min: 0, max: 3 })];
};

const getMedicinalProductName = () => 'COVID-19 Vaccine';

const example = {
        '@context': ['https://w3id.org/pathogen/v1'],
        type: 'GHPVaccinationCertificate',
        linkedVaccineCertificate: '', // calculate hashlink of an example certificate obj in memory
        recipient: getPatientInfo(),
        tg: diseaseType,
        vd: descType,
        vt: vaxType,
        mp: getMedicinalProductName(),
        ma: getMarketingAuthHolder(),
        dn: getVaxOrder(),
        dt: faker.date.between('2021-06-18', '2021-02-01'),
        co: 'CA'
    };
    return example;
};

module.exports = { getGHPVaccinationCredential };
