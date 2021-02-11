import { useState, useContext } from "react";
import {
  Link,
  Breadcrumbs,
  Icon,
  AppBar,
  Container,
  Box,
  Button,
  InputBase,
  IconButton,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import BeneficiaryContext from "../state/beneficiary/BenficiaryContext";
import {
  createAddBeneficiary,
  createUpdateFilter,
} from "../state/beneficiary/actions";

const Header = ({ onAddBeneficiary }) => {
  const [state, dispatch] = useContext(BeneficiaryContext);

  const handleSearchChange = (e) => {
    dispatch(createUpdateFilter(e.target.value));
  };

  const searchValue = state.filter;

  return (
    <>
      <div style={{ height: "3rem" }}>
        <Typography>Transfeera</Typography>
      </div>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          background: "#1FBFAE",
          height: "3.5rem",
          padding: "0 3rem",
          color: "white",
        }}
      >
        <Link
          color="inherit"
          href="/"
          aria-current="page"
          style={{
            borderBottom: "0.25rem solid white",
            fontSize: "1rem",
            fontStyle: "none",
            padding: "0.75rem 0.25rem",
          }}
        >
          Seus favorecidos
        </Link>
      </Breadcrumbs>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ background: "rgba(159, 173, 187, 0.2)", padding: 50 }}
      >
        <Button onClick={() => dispatch(createAddBeneficiary())}>
          <Typography variant="h3">Seus favorecidos</Typography>
          <Icon style={{ fontSize: "4rem", color: "#1FBFAE" }}>add_circle</Icon>
        </Button>
        <Grid container item justify="flex-end">
          <Paper style={{ backgroundColor: "white" }}>
            <InputBase
              style={{ padding: "0.5rem", width: "15rem" }}
              placeholder="Nome, CPF, agência ou conta"
              inputProps={{
                "aria-label": "pesquisa por nome, cpf, agência ou conta",
              }}
              value={searchValue}
              onChange={handleSearchChange}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
