const mergeAndSort = (firstHalf, secondHalf) => {
  let newArr = [];

  let itemsLeft = firstHalf.length + secondHalf.length;
  let i = 0;
  let j = 0;

  while (itemsLeft > 0) {
    if (i > firstHalf.length - 1) {
      const secondHalfRest = secondHalf.slice(j);

      newArr.push(...secondHalfRest);
      itemsLeft -= secondHalfRest.length;
    } else if (j > secondHalf.length - 1) {
      const firstHalfRest = firstHalf.slice(i);

      newArr.push(...firstHalfRest);
      itemsLeft -= firstHalfRest.length;
    } else {
      if (firstHalf[i] < secondHalf[j]) {
        newArr.push(firstHalf[i]);
        i++;
        itemsLeft--;
      } else if (firstHalf[i] > secondHalf[j]) {
        newArr.push(secondHalf[j]);
        j++;
        itemsLeft--;
      } else {
        newArr.push(firstHalf[i], secondHalf[j]);
        i++;
        j++;
        itemsLeft -= 2;
      }
    }
  }

  return newArr;
};

const split = (arr) => {
  if (arr.length === 1) return arr;
  else {
    const middle = arr.length / 2;
    let firstHalf = arr.slice(0, middle);
    let secondHalf = arr.slice(middle);

    firstHalf = split(firstHalf);
    secondHalf = split(secondHalf);

    return mergeAndSort(firstHalf, secondHalf);
  }
};

const mergeSort = (arr) => {
  const sorted = split(arr);

  return sorted;
};
