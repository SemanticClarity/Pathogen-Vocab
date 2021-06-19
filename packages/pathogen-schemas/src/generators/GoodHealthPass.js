const faker = require('faker');
const { getGHPEventRecipient } = require('./GHPEventRecipient');

const getGoodHealthPass = () => {
    const getPatientInfo = () => {
        const subject = getGHPEventRecipient();
        return subject;
    };
    const example = {
        '@context': ['https://w3id.org/pathogen/v1'],
        type: 'GoodHealthPass',
        linkedCredential: faker.random.uuid(),
        recipient: getPatientInfo(),
        status: faker.random.boolean()
    };
    return example;
};

module.exports = { getGoodHealthPass };
