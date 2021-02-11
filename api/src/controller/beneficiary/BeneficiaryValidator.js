const VALIDATION_ERROR = {
  MISSING_PARAMS: "MISSING_PARAMS",
};

class InvalidRequestError extends Error {
  constructor(missingParam) {
    super(missingParam);
    this.code = VALIDATION_ERROR.MISSING_PARAMS;
  }
}

const BeneficiaryValidator = {
  validateCreate(req) {
    if (!req.body) {
      throw new InvalidRequestError("body");
    }
    return req.body;
  },
  validateDelete(req) {
    if (req.params.id) {
      return req.params.id;
    }
    throw new InvalidRequestError("Identificador do beneficiário");
  },
  validateEdit(req) {
    const { documentID } = req.body;
    if (documentID) {
      throw new InvalidRequestError("Identificador do beneficiário");
    }
    return req.body;
  },
};

module.exports = BeneficiaryValidator;
