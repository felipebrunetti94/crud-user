const path = require("path");
const fs = require("fs");
const yargs = require("yargs");
const generateBeneficiaries = require("./beneficiary");

const argv = yargs
  .command("amount", "Decides the number of claims to generate", {
    amount: {
      description: "The amount to generate",
      alias: "a",
      type: "number",
    },
  })
  .help()
  .alias("help", "h").argv;

if (argv.hasOwnProperty("amount")) {
  const file = path.normalize(`${__dirname}/../beneficiarydata.json`);
  const amount = argv.amount;
  const beneficiaries = generateBeneficiaries(amount);

  const jsonObj = JSON.stringify(beneficiaries);

  fs.writeFile(file, jsonObj, function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });
}
