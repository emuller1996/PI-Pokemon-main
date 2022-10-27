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
    if(a.ataque > b.ataque) return -1
    if(a.ataque < b.ataque) return 1
    return 0;
}

export function compare_vida( a, b ){
  if(a.vida > b.vida) return -1
  if(a.vida < b.vida) return 1
  return 0;
}


export function validateName(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Nombre es requerido.';
  } else if (!/^[A-Z]+$/i.test(input.name)) {
    errors.name = 'Nombre invalido (Solo Letras!!)';
  }

  if ( input.vida > 100 || input.vida < 0 ) { errors.vida = 'Vida invalida'; }
  if ( input.ataque > 100 || input.ataque < 0) { errors.ataque = 'ataque  invalida'; }
  if ( input.defensa > 100 || input.defensa < 0) { errors.defensa = 'defensa invalida'; }
  if ( input.velocidad > 100 || input.velocidad < 0) { errors.velocidad = 'velocidad invalida'; }
  if ( input.peso > 550 || input.peso < 0) { errors.peso = 'peso invalida'; }
  if ( input.altura > 22 || input.altura < 0) { errors.altura = 'altura invalida'; }




 

  return errors;

};


export function validateStast(input){
  let errors = {};
  console.log(input);
  

  return errors;

}


