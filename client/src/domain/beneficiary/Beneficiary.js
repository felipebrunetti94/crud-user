/**
 * @typedef IBeneficiary
 * @property {string} documentID
 * @property {string} name
 * @property {string} agency
 * @property {string} account
 * @property {string?} email
 * @property {string?} status
 * @property {string?} accountType
 * @property {string?} bank
 */

export const STATUS = {
  RASCUNHO: "RASCUNHO",
  VALIDADO: "VALIDADO",
};

export const EDITABLE_PROPERTIES = {
  EMAIL: "email",
};

export class NoBeneficiaryFoundError extends Error {
  constructor(filter) {
    super(`Nenhum beneficiário encontrado para o filtro: ${filter}`);
    this.name = "NoBeneficiaryFoundError";
  }
}

/**
 * @description Filter beneficiary by search value
 * @param {string} searchValue
 * @param {IBeneficiary[]} beneficiaries
 */
export const filterBy = (searchValue, beneficiaries) => {
  const filtered = beneficiaries.filter(
    (beneficiary) =>
      beneficiary.documentID.match(searchValue) ||
      beneficiary.name.match(searchValue) ||
      beneficiary.agency.match(searchValue) ||
      beneficiary.account.match(searchValue)
  );

  if (beneficiaries.length > 0 && filtered.length === 0) {
    throw new NoBeneficiaryFoundError(searchValue);
  }

  return filtered;
};

/**
 *
 * @param {IBeneficiary} beneficiary
 */
const isEditable = (beneficiary) => STATUS.RASCUNHO === beneficiary.status;

const Beneficiary = { filterBy, isEditable };

export default Beneficiary;
