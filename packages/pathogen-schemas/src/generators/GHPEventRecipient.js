const faker = require('faker');

faker.seed(42);
// const genderType = faker.random.arrayElement(['male', 'female', 'other', 'unknown']);

const getGHPEventRecipient = () => {
  const example = {
    '@context': ['https://w3id.org/pathogen/v1'],
    type: 'GHPEventRecipient',
    familyName: faker.name.lastName(),
    givenName: faker.name.firstName(),
    birthDate: faker.date.between('1950-01-01', '2004-01-01')
    // gender: genderType
  };
  return example;
};

module.exports = { getGHPEventRecipient };
