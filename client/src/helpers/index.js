export function compare_name( a, b )
  {
  if ( a.name.toLowerCase() < b.name.toLowerCase()){
    return -1;
  }
  if ( a.name.toLowerCase() > b.name.toLowerCase()){
    return 1;
  }
  return 0;
}

export function compare_attack( a, b ){
    if(a.attack.base_stat > b.attack.base_stat) return -1
    if(a.attack.base_stat < b.attack.base_stat) return 1
    return 0;
}


export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Nombre es requerido.';
  } else if (!/^[A-Z]+$/i.test(input.name)) {
    errors.name = 'Nombre invalido (Solo Letras!!)';
  }


  if (!input.vida) {
    errors.vida = 'Vida es requerido';
  } else if (!/^[0-9]+$/.test(input.vida) || input.vida > 100) {
    errors.vida = 'Vida is invalido';
  }

  if (!input.ataque) {
    errors.ataque = 'ataque es requerido';
  } else if (!/^[0-9]+$/.test(input.ataque) || input.ataque > 100) {
    errors.ataque = 'ataque is invalido';
  }

  return errors;

};


