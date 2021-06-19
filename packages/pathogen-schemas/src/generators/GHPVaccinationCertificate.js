const faker = require('faker');
const { getGHPEventRecipient } = require('./GHPEventRecipient');

faker.seed(42);

const diseaseType = faker.random.arrayElement(['900000000000003001']);
const descType = faker.random.arrayElement([]);
const vaxType = faker.random.arrayElement([]);

const getGHPVaccinationCertificate = () => {
const getPatientInfo = () => {
    const subject = getGHPEventRecipient();
    return subject;
};
const getVaxOrder = () => {
    const order = ['1 of 2', '2 of 2', '1 of 1'];
    return order[faker.random.number({ min: 0, max: 2 })];
};
const getGender = () => {
    const genderType = faker.random.arrayElement(['male', 'female', 'other', 'unknown']);
    return genderType;
};
const getTargetDisease = () => 'ICD-10#J12.82';

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

const getBatchNumber = () => {
    const batchnumbers = ['A1235742', 'B1235742', 'C1235742', 'D1235742', 'X4509598'];
    return batchnumbers[faker.random.number({ min: 0, max: 3 })];
};
const getAdministeringCenter = () => {
    const centers = [
        'Cambridge Pinebush Vaccination Clinic, Cambridge',
        'The Boardwalk Vaccination Clinic, Waterloo',
        'Service BC Invermere'
    ];
    return centers[faker.random.number({ min: 0, max: 2 })];
};
const getHealthProfessional = () => {
    const healthprofs = ['VRDRCR70H08H703B', 'MSSCZN70H08H704F', 'RCSTGI90B1823661'];
    return healthprofs[faker.random.number({ min: 0, max: 2 })];
};

const example = {
        '@context': ['https://w3id.org/pathogen/v1'],
        type: 'GHPVaccinationCertificate',
        recipient: getPatientInfo(),
        ge: getGender(),
        tg: diseaseType,
        vd: descType,
        vt: vaxType,
        mp: getMedicinalProductName(),
        ma: getMarketingAuthHolder(),
        dn: getVaxOrder(),
        bn: getBatchNumber(),
        dt: faker.date.between('2021-06-18', '2021-02-01'),
        ac: getAdministeringCenter(),
        hp: getHealthProfessional(),
        co: 'CA',
        nd: faker.date.between('2021-07-18', '2021-02-01')
    };
    return example;
};

module.exports = { getGHPVaccinationCertificate };
