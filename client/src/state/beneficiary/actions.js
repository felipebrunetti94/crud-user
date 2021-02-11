import * as BENEFICIARY_TYPES from "./types";

export const createCheckBeneficiary = ({ documentID }) => ({
  type: BENEFICIARY_TYPES.CHECK,
  documentID,
});

export const createChecAllkBeneficiary = (checked) => ({
  type: BENEFICIARY_TYPES.CHECK_ALL,
  checked,
});

export const createAddBeneficiary = () => ({
  type: BENEFICIARY_TYPES.ADD,
});

export const createOpenEdit = (beneficiary) => ({
  type: BENEFICIARY_TYPES.EDIT,
  beneficiary,
});

export const createOpenDelete = () => ({
  type: BENEFICIARY_TYPES.DELETE,
});

export const createGoToDefault = () => ({
  type: BENEFICIARY_TYPES.GO_TO_DEFAULT,
});

export const createUpdateBeneficiaries = (beneficiaries) => ({
  type: BENEFICIARY_TYPES.UPDATE_BENEFICIARIES,
  beneficiaries,
});

export const createUpdateFilter = (filter) => ({
  type: BENEFICIARY_TYPES.UPDATE_FILTER,
  filter,
});

export const createDeleteBeneficiary = (beneficiary) => ({
  type: BENEFICIARY_TYPES.DELETE_BENEFICIARY,
  beneficiary,
});

export const createUpdateEdited = (edited) => ({
  type: BENEFICIARY_TYPES.UPDATE_EDITED,
  edited,
});

export const createRemoveToast = (key) => ({
  type: BENEFICIARY_TYPES.REMOVE_TOAST,
  key,
});
