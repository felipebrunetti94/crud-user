const BeneficiaryRepository = require("../../infra/beneficiary/BeneficiaryRepository");
const BeneficiaryValidator = require("./BeneficiaryValidator");
const BeneficiarySerializer = require("./BeneficiarySerializer");
const handleError = require("../handleError");
const STATUS = require("../status");

const BeneficiaryController = {
  delete: async (req, res) => {
    try {
      const documentID = BeneficiaryValidator.validateDelete(req);
      const deleted = await BeneficiaryRepository.delete(documentID);
      res.status(STATUS.SUCCESS).end(BeneficiarySerializer.serialize(deleted));
    } catch (error) {
      handleError(error, res);
    }
  },
  edit: async (req, res) => {
    try {
      const beneficiaryData = req.body;
      const beneficiary = await BeneficiaryRepository.edit(beneficiaryData);
      res
        .status(STATUS.SUCCESS)
        .end(BeneficiarySerializer.serialize(beneficiary));
    } catch (error) {
      handleError(error, res);
    }
  },
  create: async (req, res) => {
    try {
      const beneficiaryData = req.body;
      const beneficiary = await BeneficiaryRepository.create(beneficiaryData);
      res
        .status(STATUS.SUCCESS)
        .end(BeneficiarySerializer.serialize(beneficiary));
    } catch (error) {
      handleError(error, res);
    }
  },
  findAll: async (req, res) => {
    try {
      const beneficiaries = await BeneficiaryRepository.find();
      res
        .status(STATUS.SUCCESS)
        .end(BeneficiarySerializer.serialize(beneficiaries));
    } catch (error) {
      handleError(error, res);
    }
  },
};

module.exports = BeneficiaryController;
