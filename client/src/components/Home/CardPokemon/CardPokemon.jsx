import { Grid, LinearProgress, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import "./CardPokemon.css";

const CardPokemon = (props) => {
  return (
    <Link to={`/pokemon/${props.pokemon.id}`} className="text-decoration-none">
      <Box
        key={props.pokemon.name}
        border={1}
        borderColor={"#1a1e4b"}
        borderRadius={2}
        bgcolor={"#d5daea"}
      >
        <h2> {props.pokemon.name} </h2>
        <img
          className="img-pokemon"
          src={props.pokemon.img}
          alt="IMAGE_POKEMON"
        />
        <Box mx={3} mb={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <span className="text-center">
                HP
              </span>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress
                variant="determinate"
                value={props.pokemon.vida}
                style={{ padding: "0.3em" }}
              />
            </Grid>
            <Grid item xs={3}>
              <span className="text-center">
                ATTACK
              </span>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress
                variant="determinate"
                value={props.pokemon.ataque}
                style={{ padding: "0.3em" }}
              />
            </Grid>
          </Grid>
        </Box>

        <ul className="tipes">
          <p>Types</p>
          {props.pokemon.types.map((t) => (
            <li>{t.type ? t.type.name : t.name}</li>
          ))}
        </ul>
      </Box>
    </Link>
  );
};

export default CardPokemon;
