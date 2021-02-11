export const STATES = {
  DEFAULT: "DEFAULT",
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const BeneficiaryInitialState = {
  beneficiaries: [],
  filter: "",
  deleted: [],
  state: STATES.DEFAULT,
  edited: {},
};

export default BeneficiaryInitialState;
