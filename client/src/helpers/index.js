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
    if(a.attack.base_stat < b.attack.base_stat) return -1
    if(a.attack.base_stat > b.attack.base_stat) return 1
    return 0;
}


