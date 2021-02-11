// @ts-check

import BeneficiaryRepository from "../infra/beneficiary/BeneficiaryRepository";

class NoBeneficiariesFoundError extends Error {
  constructor() {
    super("Nenhuma beneficiário foi encontrado");
    this.severity = "error";
  }
}

/**
 * @description find all beneficiaries
 * @param {*} param1
 */
const findBeneficiary = async ({ onSuccess, onError }) => {
  try {
    const beneficiaries = await BeneficiaryRepository.findAll();
    if (beneficiaries.length === 0) {
      throw new NoBeneficiariesFoundError();
    }

    onSuccess(beneficiaries);
  } catch (error) {
    onError(error);
  }
};

export default findBeneficiary;
