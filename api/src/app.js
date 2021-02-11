const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const BeneficiaryRouter = require("./routes/beneficiary/BeneficiaryRouter");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/beneficiary", BeneficiaryRouter);

module.exports = app;
