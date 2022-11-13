import { Box } from '@mui/system';
import React from 'react';
import logoPokemon from "../../pokemon-logo.png";

export default function Navbar() {


    return (
        <>
            <div
                className="container-fluid p-1 mb-4 shadow"
                style={{ backgroundColor: "#1a1e4b" }}
            >
                <div className="row m-0">
                    <div className="col-5">
                        <span
                            className="text-light text-start"
                            style={{ fontSize: "0.7em" }}
                        >
                            <img style={{ width: "1.5em" }} src="/favicon.ico" alt="ICON" />{" "}
                            Henry PI PT-07
                        </span>
                    </div>
                    <div className="col-5">
                        <span className="text-light " style={{ fontSize: "0.7em" }}>
                            Estefano Muller
                        </span>
                        <a
                            href="https://github.com/emuller1996"
                            style={{ fontSize: "0.7em" }}
                        >
                            <i className="fa-brands fa-github ms-2 fa-xl text-warning"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/estefano-m%C3%BCller-3a9b8b237/"
                            style={{ fontSize: "0.7em" }}
                        >
                            <i className="fa-brands fa-linkedin ms-2 fa-xl text-warning"></i>
                        </a>
                    </div>
                </div>
            </div>

            <Box>
                <img
                    style={{ width: "300px" }}
                    src={logoPokemon}
                    alt="LOGO_POKEMON_NINTENDO"
                />
            </Box>
        </>
    )
}