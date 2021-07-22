const busquedaBinaria = (arr, objetivo) => {
    const indiceMedio = Math.floor(arr.length / 2);
    const primeraMitad = arr.slice(0, indiceMedio);
    const segundaMitad = arr.slice(indiceMedio,)

    if(arr.length === 1 && arr[0] !== objetivo) return false;

    if(arr[indiceMedio] === objetivo) {
        return true;
    } else if(arr[indiceMedio] > objetivo) {
        return busquedaBinaria(primeraMitad, objetivo);
    } else if(arr[indiceMedio] < objetivo) {
        return busquedaBinaria(segundaMitad, objetivo);
    }
}