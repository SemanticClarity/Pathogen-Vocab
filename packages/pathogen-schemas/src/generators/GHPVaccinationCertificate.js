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
const getVaccinationEventId = () => {
    const id = faker.random.uuid();
    return id;
};
const getVaxOrder = () => {
    const order = ['1 of 2', '2 of 2', '1 of 1'];
    return order[faker.random.number({ min: 0, max: 2 })];
};
const getGender = () => {
    const genderType = faker.random.arrayElement(['male', 'female', 'other', 'unknown']);
    return genderType;
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
        linkedVaccineEvent: getVaccinationEventId(),
        recipient: getPatientInfo(),
        gender: getGender(),
        disease: diseaseType,
        vaccineDescription: descType,
        vaccineType: vaxType,
        medicinalProductName: getMedicinalProductName(),
        marketingAuthorizationHolder: getMarketingAuthHolder(),
        doseNumber: getVaxOrder(),
        batchNumber: getBatchNumber(),
        dateOfVaccination: faker.date.between('2021-06-18', '2021-02-01'),
        administeringCenter: getAdministeringCenter(),
        healthProfessional: getHealthProfessional(),
        nextVaccinationDate: faker.date.between('2021-07-18', '2021-02-01'),
        countryOfVaccination: 'CA'
    };
    return example;
};

module.exports = { getGHPVaccinationCertificate };
