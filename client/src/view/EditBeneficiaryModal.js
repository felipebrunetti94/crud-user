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
import Beneficiary from "../domain/beneficiary/Beneficiary";
import { createUpdateEdited } from "../state/beneficiary/actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: "40%",
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
}));

const EditBeneficiaryModal = ({ open, onClose, onEdit }) => {
  const [formState, setFormState] = useState({ error: {}, value: {} });
  const classes = useStyles();
  const [state, dispatch] = useContext(BeneficiaryContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(createUpdateEdited({ [name]: value }));
  };
  const { error, value } = formState;
  const { edited } = state;
  const disabled = edited.status === "VALIDADO";
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby={`Editar beneficiário: ${edited ? edited.name : ""}`}
      aria-describedby="Modal de edição de beneficiário"
    >
      <Card className={classes.paper}>
        <Grid container justify="flex-end">
          <Button onClick={onClose}>
            <Icon>clear</Icon>
          </Button>
        </Grid>
        <Grid>
          <Typography variant="h6">{edited.name}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">
            <Button
              variant="contained"
              color={Beneficiary.isEditable(edited) ? "default" : "primary"}
            >
              {edited.status}
            </Button>
          </Typography>
        </Grid>
        <form className={classes.root} noValidate>
          <Grid>
            <Typography variant="h6">Quais os dados do favorecido</Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} lg={6}>
              <TextField
                onClick={handleChange}
                disabled={disabled}
                error={error.name}
                id="name"
                name="name"
                label="Qual o nome completo ou a razão social do favorecido?"
                value={edited.name}
                fullWidth
                helperText={error.name}
              />
            </Grid>
            <Grid item md={4} lg={4}>
              <TextField
                disabled={disabled}
                onClick={handleChange}
                error={error.documentID}
                id="documentID"
                name="documentID"
                fullWidth
                label="Qual o CPF ou CNPJ?"
                value={edited.documentID}
                helperText={error.documentID}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6} lg={6}>
              <TextField
                disabled={disabled}
                onClick={handleChange}
                error={error.email}
                id="email"
                name="email"
                label="Qual o e-mail do favorecido?"
                value={edited.email}
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
                disabled={disabled}
                fullWidth
                onClick={handleChange}
                error={error.bank}
                id="bank"
                name="bank"
                label="Qual o banco do favorecido?"
                value={edited.bank}
                helperText={error.bank}
              />
            </Grid>
            <Grid item md={4} lg={4}>
              <TextField
                disabled={disabled}
                fullWidth
                onClick={handleChange}
                error={error.agency}
                id="agency"
                name="agency"
                label="Qual a agência?"
                value={edited.agency}
                helperText={error.agency}
              />
            </Grid>
            <Grid item md={2} lg={2}>
              <TextField
                disabled={disabled}
                fullWidth
                onClick={handleChange}
                error={error.agencyDigit}
                id="agencyDigit"
                name="agencyDigit"
                label="Dígito"
                value={edited.agencyDigit}
                helperText={error.agencyDigit}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} lg={6}>
              <TextField
                disabled={disabled}
                fullWidth
                onClick={handleChange}
                error={error.accountType}
                id="accountType"
                name="accountType"
                label="Qual o tipo da conta?"
                value={edited.accountType}
                helperText={error.accountType}
              />
            </Grid>
            <Grid item md={4} lg={4}>
              <TextField
                disabled={disabled}
                fullWidth
                onClick={handleChange}
                error={error.account}
                id="account"
                name="account"
                label="Qual a conta corrente?"
                value={edited.account}
                helperText={error.account}
              />
            </Grid>
            <Grid item md={2} lg={2}>
              <TextField
                disabled={disabled}
                fullWidth
                onClick={handleChange}
                error={error.accountDigit}
                id="accountDigit"
                name="accountDigit"
                label="Dígito"
                value={edited.accountDigit}
                helperText={error.accountDigit}
              />
            </Grid>
          </Grid>
        </form>
        <Grid container justify="space-between">
          <Grid item>
            <Button variant="outlined" color="primary" onClick={onClose}>
              Voltar
            </Button>
          </Grid>

          <Grid container item spacing={3}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              <Icon>delete</Icon>
            </Button>
            <Button variant="contained" color="primary" onClick={onEdit}>
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
};

export default EditBeneficiaryModal;
