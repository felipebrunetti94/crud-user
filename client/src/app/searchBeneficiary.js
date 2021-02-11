// @ts-check

import Beneficiary, { IBeneficiary } from "../domain/beneficiary/Beneficiary";

/**
 * @description search user beneficiary by name, cpf/cnpj, bank agency or bank account
 * @param {string} searchValue
 * @param {IBeneficiary[]} beneficiaries
 * @param {{onError: Function}} onError
 */
const searchBeneficiary = (searchValue, beneficiaries, { onError }) => {
  try {
    const filtered = Beneficiary.filterBy(searchValue, beneficiaries);
    return filtered;
  } catch (error) {
    console.error(error);
    onError(error);
  }
};

export default searchBeneficiary;
