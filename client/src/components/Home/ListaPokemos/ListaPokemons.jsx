import React from "react";
import CardPokemon from "../CardPokemon/CardPokemon";
import { CircularProgress, Grid } from "@mui/material";

const ListaPokemos = (props) => {

  return (
    <Grid container spacing={3} alignItems="center">
      {props.pokemons.map((p) => (
        <Grid key={p.id} item xs={12} sm={6} md={4} >
          <CardPokemon key={ p.name &&p.name}   pokemon={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListaPokemos;
