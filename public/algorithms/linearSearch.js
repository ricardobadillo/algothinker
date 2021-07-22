
//Secuencialmente verifica cada elemento de una lista 
//esperando encontrar un valor que coincida con el
//elemento objetivo
const busquedaLineal = (objetivo, lista) => {
    let tamanoLista = lista.lenght;
    let elementoActual;

    for(let i = 0; i < tamanoLista; i++) {
        elementoActual = lista[i];

        if(elementoActual === objetivo) {
            return true;
        }
    }

    //en el peor de los casos la complejidad temporal es O(n)
    return false;
}