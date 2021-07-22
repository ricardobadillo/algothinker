const ordenamientoPorSeleccion = (lista, arr = [...lista]) => {
    let posicionMasBajo, posicionEscaneo, temporal;
    for(let i = 0; i < arr.length; i++) {
        posicionMasBajo = i;
        posicionEscaneo = i + 1;
        
        for(let j = i + 2; j < arr.length + 1; j++) {
            if(arr[posicionEscaneo] < arr[posicionMasBajo]) {
                posicionMasBajo = posicionEscaneo; 
                posicionEscaneo = posicionMasBajo + 1;
            } else {
                posicionEscaneo = j;
            }
        }
        if(arr[posicionMasBajo] < arr[i]) {
            temporal = arr[i];
            arr[i] = arr[posicionMasBajo];
            arr[posicionMasBajo] = temporal;
        }
    }
    return arr;
}