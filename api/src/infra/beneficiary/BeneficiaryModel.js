const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeneficiarySchema = new Schema(
  {
    name: String,
    bank: String,
    account: {
      number: String,
      digit: String,
    },
    agency: {
      number: String,
      digit: String,
    },
    status: String,
    accountType: String,
    documentID: { type: String, unique: true },
  },
  { collection: "Beneficiary" }
);

const BeneficiaryModel = mongoose.model("Beneficiary", BeneficiarySchema);

module.exports = BeneficiaryModel;
