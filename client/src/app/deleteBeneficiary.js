// @ts-check

import { IBeneficiary } from "../domain/beneficiary/Beneficiary";
import BeneficiaryRepository from "../infra/beneficiary/BeneficiaryRepository";
import { ICallback } from "./types";

/**
 * @description Delete any beneficiary
 * @param {IBeneficiary[]} beneficiaries
 * @param {ICallback} callback
 */
const deleteBeneficiary = async (beneficiaries, { onSuccess, onError }) => {
  try {
    const deleted = await BeneficiaryRepository.remove(beneficiaries);
    onSuccess(deleted);
  } catch (error) {
    onError(error);
  }
};
export default deleteBeneficiary;
