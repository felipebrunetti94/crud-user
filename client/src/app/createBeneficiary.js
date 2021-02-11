// @ts-check

import Bank from "../domain/bank/Bank";
import BeneficiaryRepository from "../infra/beneficiary/BeneficiaryRepository";

/**
 * @description Create new beneficiary
 * @param {import("../domain/beneficiary/Beneficiary").IBeneficiary} beneficiary
 * @param {import("./types").ICallback} callback
 */
const createBeneficiary = async (beneficiary, { onSuccess, onError }) => {
  try {
    const validBeneficiary = Bank.validate(beneficiary);
    const newBenefiary = await BeneficiaryRepository.register(validBeneficiary);
    console.log(newBenefiary);
    onSuccess(newBenefiary);
  } catch (error) {
    onError(error);
  }
};

export default createBeneficiary;
