const express = require("express");
const BeneficiaryController = require("../../controller/beneficiary/BeneficiaryController");

const BeneficiaryRouter = express.Router();

BeneficiaryRouter.get("/", BeneficiaryController.findAll);

BeneficiaryRouter.put("/edit/:id", BeneficiaryController.edit);

BeneficiaryRouter.delete("/delete/:id", BeneficiaryController.delete);

BeneficiaryRouter.post("/create", BeneficiaryController.create);

module.exports = BeneficiaryRouter;
