import { useContext, useState } from "react";
import BeneficiaryContext from "../state/beneficiary/BenficiaryContext";
import {
  Button,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Checkbox,
  Grid,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { cpfMask, accountMask, agencyMask } from "./masks";
import Beneficiary from "../domain/beneficiary/Beneficiary";
import {
  createChecAllkBeneficiary,
  createCheckBeneficiary,
  createOpenDelete,
  createOpenEdit,
} from "../state/beneficiary/actions";
import Toast from "./Toast";

const BeneficiariesGrid = ({ data = [], columns }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const count = Math.ceil(data.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const [state, dispatch] = useContext(BeneficiaryContext);

  const handleDeleteBeneficiary = () =>
    state.beneficiaries.some((beneficiary) => beneficiary.checked)
      ? dispatch(createOpenDelete())
      : Toast.info("Por favor selecione pelo menos um contrato para remover.");

  return (
    <Grid style={{ padding: 50 }}>
      <Grid container item>
        <Button
          variant="contained"
          hover="true"
          color="secondary"
          style={{ fontSize: "0.75rem", padding: "1rem" }}
          onClick={handleDeleteBeneficiary}
        >
          Excluir selecionados
        </Button>
      </Grid>
      <Grid container item direction="row" justify="center" alignItems="center">
        <Table style={{ marginTop: 50, marginBottom: 50 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={(e) =>
                    dispatch(createChecAllkBeneficiary(e.target.checked))
                  }
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.headerName}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(start, end).map((beneficiary) => (
              <TableRow
                key={beneficiary.documentID}
                selected={beneficiary.checked}
                onDoubleClick={() => dispatch(createOpenEdit(beneficiary))}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={beneficiary.checked}
                    onClick={() =>
                      dispatch(createCheckBeneficiary(beneficiary))
                    }
                    // inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell>{beneficiary.name}</TableCell>
                <TableCell>{cpfMask.apply(beneficiary.documentID)}</TableCell>
                <TableCell>{beneficiary.bank}</TableCell>
                <TableCell>{agencyMask.apply(beneficiary.agency)}</TableCell>
                <TableCell>{accountMask.apply(beneficiary.account)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={
                      Beneficiary.isEditable(beneficiary)
                        ? "default"
                        : "primary"
                    }
                  >
                    {beneficiary.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination count={count} page={page} onChange={handlePageChange} />
      </Grid>
    </Grid>
  );
};

export default BeneficiariesGrid;
