const ordenamientoPorInsercion = (arr) => {

    for(let i = 1; i < arr.length; i++) {
        for(let j = 0; j < i; j++) {
            if(arr[i] < arr[j]) {
                let elementoAInsertar = arr.splice(i, 1)[0];
                arr.splice(j, 0, elementoAInsertar);
            }
        }
    }

    return arr;
}