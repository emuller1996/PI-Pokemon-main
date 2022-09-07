import React from 'react';
import './Paginacion.css';

const Paginacion = ({PokemonPorPagina,TotalPokemon,Paginar})=>{

    const NumeroDePaginas = [];

    for (let i=1; i <= Math.ceil(TotalPokemon/PokemonPorPagina); i++){
        NumeroDePaginas.push(i);
    }

    return (
        <nav className="paginacion-nav">
            <ul>
                {NumeroDePaginas.map( n => (
                    <li key={n} onClick={()=> Paginar(n)}>
                        <a >{n}</a>
                    </li>
                ))}
            </ul>
        </nav>

    )
}

export default Paginacion;