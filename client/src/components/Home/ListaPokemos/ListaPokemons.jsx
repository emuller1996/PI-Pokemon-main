import React from "react";
import CardPokemon from "../CardPokemon/CardPokemon";
import { CircularProgress, Grid } from "@mui/material";

const ListaPokemos = (props) => {
  if (props.pokemons.length === 0)
    return <CircularProgress />;

  return (
    <Grid container spacing={3} alignItems="center">
      {props.pokemons.map((p) => (
        <Grid key={p.name} item xs={12} sm={6} md={4} >
          <CardPokemon  pokemon={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListaPokemos;
