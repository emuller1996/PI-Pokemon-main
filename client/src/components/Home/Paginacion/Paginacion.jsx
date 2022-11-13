import { Pagination } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import './Paginacion.css';

const Paginacion = ({PokemonPorPagina,TotalPokemon,Paginar})=>{
    
    /* <nav className="paginacion-nav  mx-auto">
            <ul>
                {NumeroDePaginas.map( n => (
                    <li  key={n} onClick={()=> Paginar(n)}>
                        <a>{n}</a>
                    </li>
                ))}
            </ul>
            
        </nav> */

    const NumeroDePaginas = [];
    const [page,setPage] = useState(0);

    for (let i=1; i <= Math.ceil(TotalPokemon/PokemonPorPagina); i++){
        NumeroDePaginas.push(i);
    }

    const handleChange = (event, value) => {
        setPage(value);
        Paginar(value);
      };
    return (

        
        <Pagination style={ { backgroundColor :'#2e4595' }}  className='mx-4 mt-3  py-2 rounded  text-white' defaultPage={page} color="primary" page={page && page}  onChange={handleChange} count={NumeroDePaginas.length} siblingCount={0} />

    )
}

export default Paginacion;