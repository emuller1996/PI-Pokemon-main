import React, { useEffect, useState } from "react";
import "./NuevoPokemon.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../actions/index";
import { validateName } from "../../helpers/index";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
    Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";

const NuevoPokemon = (props) => {


  // STATES REACT
  const [errors, setErrors] = React.useState({});
  const [types, setTypes] = useState([]);
  const [name, setName] = React.useState({
    name: "",
  });
  const [stats, setStats] = React.useState({
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    peso: "",
    altura: "",
  });
  const [response, setResponse] = useState(false);
  const [open, setOpen] = React.useState(false);

  //HOOKS
  const typesDB = useSelector(  state => state.types)
  const dispatch = useDispatch();
  



  //USE EFFECTS
  useEffect(() => {
    dispatch(getTypes());
  }, [response]);





  //FUNCTIONS
  const handleTypeChange = function (e) {

    const typesIn = types.find( t => t.id===e.target.value);
    if(typesIn){
        setTypes(types.filter( t => t.id !== e.target.value ))
    }else{
        setTypes([...types, { id: e.target.value, name: e.target.name }]);
    }
    
  };

  const handleInputChange = function (event) {
    console.log(event.target.value);
    setName({
      ...name,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateName({
        ...name,
        [event.target.name]: event.target.value,
      })
    );
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleStatsChange = function (e) {
    setStats({
      ...stats,
      [e.target.name]: parseInt(e.target.value, 10),
    });

    setErrors(
      validateName({
        ...stats,
        ...name,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onSubmit = async function (e) {
    e.preventDefault();
    const data = Object.assign(name, stats, { types });
    try {
      const result = await axios.post("/pokemons",data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result.data);
      setResponse(result.ok);
      setName({
        name: "",
      });
      setStats({
        vida: "",
        ataque: "",
        defensa: "",
        velocidad: "",
        peso: "",
        altura: "",
      });
      setTypes([]);
      setOpen(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container border shadow  blue-60 shadow rounded py-4">
        <h2>Nuevo Pokemon</h2>
        <form
          className="w-75 mx-auto"
          action=""
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12}>
              <TextField
                error={errors.name ? true : false}
                helperText={errors.name}
                onChange={handleInputChange}
                value={name.name ? name.name : ""}
                fullWidth
                required
                id="name"
                name="name"
                label="name pokemon"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.vida ? true : false}
                helperText={errors.vida}
                onChange={handleStatsChange}
                value={stats.vida}
                fullWidth
                id="vida"
                name="vida"
                label="Hp"
                type="number"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.ataque ? true : false}
                helperText={errors.ataque}
                onChange={handleStatsChange}
                value={stats.ataque}
                fullWidth
                id="ataque"
                name="ataque"
                label="Attack"
                type="number"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.defensa ? true : false}
                helperText={errors.defensa}
                onChange={handleStatsChange}
                value={stats.defensa}
                fullWidth
                id="defensa"
                name="defensa"
                label="Defense"
                type="number"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.velocidad ? true : false}
                helperText={errors.defensa}
                onChange={(e) => handleStatsChange(e)}
                value={stats.velocidad}
                fullWidth
                id="velocidad"
                name="velocidad"
                label="Speed"
                type="number"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.peso ? true : false}
                helperText={errors.peso}
                onChange={(e) => handleStatsChange(e)}
                value={stats.peso}
                fullWidth
                id="peso"
                name="peso"
                label="Weight"
                type="number"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.altura ? true : false}
                helperText={errors.altura}
                onChange={(e) => handleStatsChange(e)}
                value={stats.altura}
                fullWidth
                id="altura"
                name="altura"
                label="Height"
                type="number"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <p>Types</p>
              <FormGroup>
                <Grid
                  className="text-start px-4"
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  mb={4}
                >
                  {typesDB.length !== 0 ? (
                    typesDB.map((t) => (
                      <Grid key={t.name} item xs={6} sm={4} md={3} lg={2}>
                        <FormControlLabel
                          className="text-capitalize"
                          control={<Checkbox />}
                          label={t.name}
                          value={t.id}
                          name={t.name}
                          onChange={(e) => handleTypeChange(e)}
                        />
                      </Grid>
                    ))
                  ) : (
                    <CircularProgress />
                  )}
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button
                    type="submit"
                    disabled={Object.values(errors).length !== 0 ? true : false}
                    variant="contained"
                  >
                    <i className="fa-regular fa-floppy-disk fa-xl me-2"></i>Save
                  </Button>
                </Grid>
              </FormGroup>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
      >
        <Alert severity="success">Pokemon Created!</Alert>
      </Snackbar>
      <Footer />
    </div>
  );
};

export default NuevoPokemon;