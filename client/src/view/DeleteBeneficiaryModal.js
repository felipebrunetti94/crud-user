import { useContext } from "react";
import { Button, Typography, Card, Grid, Icon } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import BeneficiaryContext from "../state/beneficiary/BenficiaryContext";

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

const DeleteBeneficiaryModal = ({ open, onClose, onDelete }) => {
  const classes = useStyles();
  const [state] = useContext(BeneficiaryContext);
  const beneficiary = state.deleted[0];
  const handleDeleteBeneficiary = () => onDelete(beneficiary);
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby={`Excluir beneficiário: ${
        beneficiary ? beneficiary.name : ""
      }`}
      aria-describedby="modal de confirmação para exclusão de beneficiário"
    >
      <Card className={classes.paper}>
        <Grid container justify="flex-end">
          <Button onClick={onClose}>
            <Icon>clear</Icon>
          </Button>
        </Grid>
        <Grid>
          <Typography variant="h6">Excluir Favorecido</Typography>
        </Grid>
        <div className={classes.text}>
          <Typography className={classes.title}>
            Você confirma a exclusão do favorecido{" "}
            {beneficiary ? beneficiary.name : ""}?
          </Typography>
          <Typography>
            O Histórico de pagamentos para este favorecido será mantido, mas ele
            será removido da sua lista de favorecidos.
          </Typography>
        </div>
        <Grid container justify="space-between">
          <Button variant="outlined" color="primary" onClick={onClose}>
            Voltar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteBeneficiary}
          >
            Confirmar exclusão
          </Button>
        </Grid>
      </Card>
    </Modal>
  );
};

export default DeleteBeneficiaryModal;
