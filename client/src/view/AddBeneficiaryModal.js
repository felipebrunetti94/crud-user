import { useContext, useState } from "react";
import {
  Button,
  Typography,
  Card,
  Grid,
  Icon,
  TextField,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import BeneficiaryContext from "../state/beneficiary/BenficiaryContext";
import createBeneficiary from "../app/createBeneficiary";
import Toast from "./Toast";
import { createUpdateBeneficiaries } from "../state/beneficiary/actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: "90vh",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    padding: "2rem 0 4rem",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  root: {},
}));

const AddBeneficiaryModal = ({ open, onClose }) => {
  const [formState, setFormState] = useState({ error: {}, value: {} });
  const classes = useStyles();
  const [state, dispatch] = useContext(BeneficiaryContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((current) => ({
      ...current,
      value: { ...current.value, [name]: value },
    }));
  };

  const handleAddBeneficiary = (e) => {
    e.preventDefault();
    createBeneficiary(formState.value, {
      onSuccess: (res) => {
        Toast.success(`Beneficiário ${res.name} editado com sucesso.`);
        dispatch(createUpdateBeneficiaries(res));
      },
      onError: (error) => {
        setFormState((current) => ({ ...current, error: { ...error.fields } }));
        Toast.error(error.message);
      },
    });
  };

  const { error, value } = formState;
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby="Adcionar novo beneficiário"
      aria-describedby="modal para adicionar novo beneficiário"
    >
      <Card className={classes.paper}>
        <Grid container justify="flex-end">
          <Button onClick={onClose}>
            <Icon>clear</Icon>
          </Button>
        </Grid>
        <form className={classes.root} noValidate>
          <Grid>
            <Typography variant="h6">Quais os dados do favorecido</Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} lg={6}>
              <TextField
                onChange={handleChange}
                error={error.name}
                name="name"
                label="Qual o nome completo ou a razão social do favorecido?"
                value={value.name}
                fullWidth
                helperText={error.name}
              />
            </Grid>
            <Grid item md={4} lg={4}>
              <TextField
                onChange={handleChange}
                error={error.documentID}
                name="documentID"
                fullWidth
                label="Qual o CPF ou CNPJ?"
                value={value.documentID}
                helperText={error.documentID}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6} lg={6}>
              <TextField
                onChange={handleChange}
                error={error.email}
                name="email"
                label="Qual o e-mail do favorecido?"
                value={value.email}
                helperText={error.email}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid>
            <Typography variant="h6">
              Quais os dados bancários do favorecido
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} lg={6}>
              <TextField
                fullWidth
                onChange={handleChange}
                error={error.bank}
                name="bank"
                label="Qual o banco do favorecido?"
                value={value.bank}
                helperText={error.bank}
              />
            </Grid>
            <Grid item md={4} lg={4}>
              <TextField
                fullWidth
                onChange={handleChange}
                error={error.agency}
                name="agency"
                label="Qual a agência?"
                value={value.agency}
                helperText={error.agency}
              />
            </Grid>
            <Grid item md={2} lg={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                error={error.agencyDigit}
                name="agencyDigit"
                label="Dígito"
                value={value.agencyDigit}
                helperText={error.agencyDigit}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} lg={6}>
              <TextField
                fullWidth
                onChange={handleChange}
                error={error.accountType}
                name="accountType"
                label="Qual o tipo da conta?"
                value={value.accountType}
                helperText={error.accountType}
              />
            </Grid>
            <Grid item md={4} lg={4}>
              <TextField
                fullWidth
                onChange={handleChange}
                error={error.account}
                name="account"
                label="Qual a conta corrente?"
                value={value.account}
                helperText={error.account}
              />
            </Grid>
            <Grid item md={2} lg={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                error={error.accountDigit}
                name="accountDigit"
                label="Dígito"
                value={value.accountDigit}
                helperText={error.accountDigit}
              />
            </Grid>
          </Grid>
        </form>
        <Grid container justify="space-between">
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBeneficiary}
          >
            Salvar
          </Button>
        </Grid>
      </Card>
    </Modal>
  );
};

export default AddBeneficiaryModal;
