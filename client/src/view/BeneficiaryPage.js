import { useReducer, useEffect } from "react";
import Header from "./Header";
import BeneficiariesGrid from "./BeneficiariesGrid";
import Footer from "./Footer";
import DeleteBeneficiaryModal from "./DeleteBeneficiaryModal";
import AddBeneficiaryModal from "./AddBeneficiaryModal";
import EditBeneficiaryModal from "./EditBeneficiaryModal";
import searchBeneficiary from "../app/searchBeneficiary";
import findBeneficiary from "../app/findBeneficiary";
import deleteBeneficiary from "../app/deleteBeneficiary";
import editBeneficiary from "../app/editBeneficiary";
import BeneficiaryContext from "../state/beneficiary/BenficiaryContext";
import BeneficiaryReducer from "../state/beneficiary/reducer";
import BeneficiaryInitialState, {
  STATES,
} from "../state/beneficiary/initialState";
import {
  createAddBeneficiary,
  createGoToDefault,
  createUpdateBeneficiaries,
  createDeleteBeneficiary,
} from "../state/beneficiary/actions";
import Toast from "./Toast";

const columns = [
  { field: "name", headerName: "Favorecido", width: 300 },
  { field: "documentID", headerName: "CPF/CNPJ", width: 130 },
  { field: "bank", headerName: "Banco", width: 150 },
  { field: "agency", headerName: "Agência", width: 150 },
  { field: "account", headerName: "CC", width: 150 },
  {
    field: "status",
    headerName: "Status do favorecido",
    width: 200,
    valueGetter: (params) => <button>{params.getValue("status")}</button>,
  },
];

const BeneficiaryPage = () => {
  const [state, dispatch] = useReducer(
    BeneficiaryReducer,
    BeneficiaryInitialState
  );

  useEffect(() => {
    findBeneficiary({
      onSuccess: (res) => dispatch(createUpdateBeneficiaries(res)),
      onError: (error) => {
        Toast.error(error);
      },
    });
  }, []);

  const { beneficiaries, filter } = state;

  const handleOpenAddBeneficiary = () => {
    dispatch(createAddBeneficiary());
  };

  const handleEditBeneficiary = (editedBeneficiary) => {
    editBeneficiary(editedBeneficiary, {
      onSuccess: (res) => {
        Toast.success(`Beneficiário ${res.name} editado com sucesso.`);
        dispatch(createUpdateBeneficiaries(res));
      },
      onError: (error) => Toast.error(error),
    });
  };

  const handleDeleteBeneficiary = (deletedBeneficiary) => {
    deleteBeneficiary(deletedBeneficiary, {
      onSuccess: (res) => {
        Toast.success(`Beneficiário ${res.name} removido com sucesso.`);
        dispatch(createDeleteBeneficiary(res));
      },
      onError: (error) => Toast.error(error),
    });
  };

  const isDeleteModalOpen = state.deleted.length > 0;

  const dataGrid = searchBeneficiary(filter, beneficiaries, {
    onError: (error) => Toast.error(error.message),
  });

  return (
    <BeneficiaryContext.Provider value={[state, dispatch]}>
      <div>
        <Header onAddBeneficiary={handleOpenAddBeneficiary} />
        <BeneficiariesGrid data={dataGrid} columns={columns} />
        <Footer />

        <DeleteBeneficiaryModal
          open={isDeleteModalOpen}
          onClose={() => dispatch(createGoToDefault())}
          onDelete={handleDeleteBeneficiary}
        />
        <AddBeneficiaryModal
          open={state.status === STATES.ADD}
          onClose={() => dispatch(createGoToDefault())}
        />
        <EditBeneficiaryModal
          open={state.status === STATES.EDIT}
          onClose={() => dispatch(createGoToDefault())}
          onEdit={handleEditBeneficiary}
        />
      </div>
    </BeneficiaryContext.Provider>
  );
};

export default BeneficiaryPage;
