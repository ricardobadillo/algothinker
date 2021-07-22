const ordenamientoBurbuja = (lista, arr = [...lista]) => {
    let tamano = arr.length - 1;
    let restante = tamano;
    let ordenado;
    let enOrden;
    let a, b, temporal;
    for(let i = 0; i < tamano; i++) {
        ordenado = false;
        enOrden = 0;
        for(let j = 0; j < restante; j++) {
            
            a = arr[j];
            b = arr[j + 1];
            if(a > b) {
                temporal = b;
                b = a;
                a = temporal;
                arr[j] = a;
                arr[j + 1] = b
            } else {
                enOrden++;
                if(enOrden === arr.length - 2) {
                    ordenado = true;
                    break;
                }
            }
        }
        restante--;
        if(ordenado) break;
    }
    return arr;
}