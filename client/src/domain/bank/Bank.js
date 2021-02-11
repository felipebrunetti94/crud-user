import Beneficiary from "../beneficiary/Beneficiary";

class ValidationSchemaError extends Error {
  constructor(fields) {
    super("Favor corrigir os campos informados.");
    this.fields = fields;
  }
}

export const BANKS = {
  BRADESCO: "237",
  CAIXA_ECONOMICA_FEDERAL: "104",
  SICOOB: "756",
  BANCO_DO_BRASIL: "001",
};

export const ACCOUNT_TYPE = {
  CONTA_CORRENTE: "CONTA CORRENTE",
  CONTA_POUPANCA: "CONTA POUPANCA",
  CONTA_FACIL: "CONTA FACIL",
};

export const BBValidationSchema = {
  agency: {
    maxLength: 4,
    digit: {
      pattern: /^[xX0-9]{0,1}$/,
    },
  },
  account: {
    maxLength: 8,
    digit: {
      pattern: /^(?!0+$)[0-9]{0,11}$/,
    },
  },
  accountType: {
    allowedTypes: [
      ACCOUNT_TYPE.CONTA_CORRENTE,
      ACCOUNT_TYPE.CONTA_POUPANCA,
      ACCOUNT_TYPE.CONTA_FACIL,
    ],
  },
};

const ValidationSchema = {
  agency: {
    maxLength: 10,
    required: true,
    pattern: /^(?!0+$)[0-9]{0,10}$/,
    digit: {
      exactLength: 1,
      required: false,
      pattern: /^[0-9]{0,1}$/,
    },
  },
  account: {
    maxLength: 11,
    required: true,
    pattern: /^(?!0+$)[0-9]{0,11}$/,
    digit: {
      exactLength: 1,
      required: true,
      pattern: /^[0-9]{0,1}$/,
    },
  },
  accountType: {
    required: true,
    allowedTypes: [ACCOUNT_TYPE.CONTA_CORRENTE, ACCOUNT_TYPE.CONTA_POUPANCA],
  },
};

const isEmpty = (obj) => Object.values(obj).length === 0;

const fields = [
  "name",
  "email",
  "documentID",
  "bank",
  "agency",
  "agencyDigit",
  "account",
  "accountDigit",
  "accountType",
];

export const validateBB = (benefiary) => {
  let error = {};
  fields.forEach((field) => {
    if (!benefiary[field]) {
      error[field] = "Campo obrigatório";
    }
  });
  if (benefiary.agency < BBValidationSchema.agency.maxLength) {
    error.agency = `Campo agência deve ter no máximo ${BBValidationSchema.agency.maxLength}.`;
  }
  if (benefiary.account < BBValidationSchema.account.maxLength) {
    error.account = `Campo conta deve ter no máximo ${BBValidationSchema.account.maxLength}.`;
  }
  if (
    benefiary.accountDigit &&
    !benefiary.accountDigit.match(BBValidationSchema.account.digit.pattern)
  ) {
    error.accountDigit = "Dígito deve ser um número de 0 - 9.";
  }

  if (isEmpty(error)) {
    return benefiary;
  }
  throw new ValidationSchemaError(error);
};

export const defaultValidation = (benefiary) => {
  let error = {};
  fields.forEach((field) => {
    if (!benefiary[field]) {
      error[field] = "Campo obrigatório";
    }
  });

  if (!benefiary.agency) {
    error.agency = "Campo obrigatório.";
  }
  if (benefiary.agency < ValidationSchema.agency.maxLength) {
    error.agency = `Campo agência deve ter no máximo ${ValidationSchema.agency.maxLength}.`;
  }
  if (benefiary.account < ValidationSchema.account.maxLength) {
    error.account = `Campo conta deve ter no máximo ${ValidationSchema.account.maxLength}.`;
  }
  if (
    benefiary.accountDigit &&
    !benefiary.accountDigit.match(ValidationSchema.account.digit.pattern)
  ) {
    error.accountDigit = "Dígito deve ser um número de 0 - 9.";
  }
  if (isEmpty(error)) {
    return benefiary;
  }
  throw new ValidationSchemaError(error);
};

/**
 * @description Validate if beneficiary data respect bank rule policy
 * @param {import("../beneficiary/Beneficiary").IBeneficiary} benefiary
 */
const validate = (benefiary) => {
  if (benefiary.accountType === BANKS.BANCO_DO_BRASIL) {
    return validateBB(benefiary);
  }
  return defaultValidation(benefiary);
};

const Bank = { validate };

export default Bank;
