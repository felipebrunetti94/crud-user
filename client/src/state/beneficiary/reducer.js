import { STATES } from "./initialState";
import * as BENEFICIARY_TYPES from "./types";

const BeneficiaryReducer = (state, action) => {
  switch (action.type) {
    case BENEFICIARY_TYPES.CHECK:
      return {
        ...state,
        beneficiaries: state.beneficiaries.map((beneficiary) =>
          beneficiary.documentID === action.documentID
            ? { ...beneficiary, checked: !beneficiary.checked }
            : beneficiary
        ),
      };
    case BENEFICIARY_TYPES.CHECK_ALL:
      return {
        ...state,
        beneficiaries: state.beneficiaries.map((beneficiary) => ({
          ...beneficiary,
          checked: action.checked,
        })),
      };
    case BENEFICIARY_TYPES.ADD:
      return {
        ...state,
        status: STATES.ADD,
      };
    case BENEFICIARY_TYPES.DELETE:
      const deleted = state.beneficiaries.filter(
        (beneficiary) => beneficiary.checked
      );
      return {
        ...state,
        status: STATES.DELETE,
        deleted,
      };
    case BENEFICIARY_TYPES.GO_TO_DEFAULT:
      return {
        ...state,
        status: STATES.DEFAULT,
      };
    case BENEFICIARY_TYPES.UPDATE_BENEFICIARIES:
      return {
        ...state,
        beneficiaries: [...action.beneficiaries, ...state.beneficiaries],
      };
    case BENEFICIARY_TYPES.UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case BENEFICIARY_TYPES.DELETE_BENEFICIARY:
      const filterRemoved = (beneficiary) =>
        action.beneficiary.documentID !== beneficiary.documentID;
      return {
        ...state,
        beneficiaries: state.beneficiaries.filter(filterRemoved),
        deleted: state.deleted.filter(filterRemoved),
      };
    case BENEFICIARY_TYPES.EDIT:
      return {
        ...state,
        status: STATES.EDIT,
        edited: action.beneficiary,
      };
    case BENEFICIARY_TYPES.UPDATE_EDITED:
      return {
        ...state,
        edited: { ...state.edited, ...action.edited },
      };
    case BENEFICIARY_TYPES.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(
          (toast) => toast.message !== action.message
        ),
      };
    default:
      return state;
  }
};

export default BeneficiaryReducer;
