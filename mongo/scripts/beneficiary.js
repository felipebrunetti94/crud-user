const faker = require("faker-br");
const RandExp = require("randexp");

const banks = ["237", "104", "756", "001"];
const status = ["RASCUNHO", "VALIDADO"];
const accountType = ["CONTA_CORRENTE", "CONTA_POUPANCA"];

const getRandom = (list) => list[Math.floor(Math.random() * list.length)];

const getRandomAgency = (bank) => {
  if (bank === "001") {
    const base = new RandExp(/^[0-9]{0,4}$/).gen();
    const digit = new RandExp(/^[xX0-9]{0,1}$/).gen();
    return {
      base,
      digit,
    };
  } else {
    const base = new RandExp(/^(?!0+$)[0-9]{0,10}$/).gen();
    const digit = new RandExp(/^[0-9]{0,1}$/).gen();
    return {
      base,
      digit,
    };
  }
};

const getRandomAccount = (bank) => {
  if (bank === "001") {
    const base = new RandExp(/^[0-9]{0,8}$/).gen();
    const digit = new RandExp(/^(?!0+$)[0-9]{0,11}$/).gen();
    return {
      base,
      digit,
    };
  } else {
    const base = new RandExp(/^(?!0+$)[0-9]{0,11}$/).gen();
    const digit = new RandExp(/^[0-9]{0,1}$/).gen();
    return {
      base,
      digit,
    };
  }
};

const createBeneficiary = () => {
  const bank = getRandom(banks);
  const beneficiary = {
    name: faker.name.findName(),
    bank,
    account: getRandomAccount(bank),
    agency: getRandomAgency(bank),
    status: getRandom(status),
    documentID: faker.br.cpf(),
    accountType: getRandom(accountType),
  };
  return beneficiary;
};

const generateBeneficiaries = (amount = 30) => {
  return Array.apply(null, Array(amount)).map(() => createBeneficiary());
};

module.exports = generateBeneficiaries;
