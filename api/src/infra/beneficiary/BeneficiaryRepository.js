const { EmptyDatabaseError } = require("../errors");
const BeneficiaryModel = require("./BeneficiaryModel");

const BeneficiaryRepository = {
  create: async (beneficiaryData) => {
    try {
      const beneficiary = new BeneficiaryModel(beneficiaryData);

      const doc = await beneficiary.save();
      console.log("\nnew beneficiary", doc);
      return doc;
    } catch (error) {
      throw error;
    }
  },
  delete: async (documentID) => {
    try {
      const deleted = await BeneficiaryModel.findOneAndDelete({
        documentID,
      });

      return deleted;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  find: async () => {
    try {
      const beneficiaries = await BeneficiaryModel.find();

      if (!beneficiaries.length) {
        throw new EmptyDatabaseError();
      }

      return beneficiaries;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  edit: async (beneficiaryData) => {
    try {
      const { documentID, ...updatedProps } = beneficiaryData;
      const doc = await BeneficiaryModel.findOneAndUpdate(
        { documentID },
        { ...updatedProps }
      );

      return doc;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = BeneficiaryRepository;
