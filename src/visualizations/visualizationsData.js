import * as d3 from 'd3';
import { applyAttributes, centerTextInsideContainer } from 'helpers';
import { TickIcon, ErrorIcon } from './svgs';

const visualizations = {
  bubble: {
    algorithm: (
      dataStructure,
      stepData,
      externalInputs,
      arr = [...dataStructure]
    ) => {
      let a, b, temp;
      let initial = stepData.initial;
      const markers = stepData.markers;

      a = arr[initial];
      b = arr[initial + 1];

      if (a > b) {
        temp = b;
        b = a;
        a = temp;

        arr[initial] = a;
        arr[initial + 1] = b;
      }

      const endOfIteration = stepData.initial === stepData.remaining - 1;
      if (!endOfIteration) {
        markers.pop();
        markers.push({
          startRow: 9,
          startCol: 24,
          endRow: 26,
          endCol: 3,
          className: 'codeEditor',
          type: 'background',
        });
      } else {
        markers.pop();
        markers.push({
          startRow: 6,
          startCol: 22,
          endRow: 29,
          endCol: 2,
          className: 'codeEditor',
          type: 'background',
        });
      }

      return {
        transformedDataStructure: arr,
        special: {
          initial: endOfIteration ? 0 : stepData.initial + 1,
          remaining: endOfIteration
            ? stepData.remaining - 1
            : stepData.remaining,
          finished: endOfIteration && stepData.remaining === 1 ? true : false,
          markers,
        },
      };
    },
    keyframe: (svg, data, special) => {
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i + 1) * 50)
        .attr('y', 200)
        .attr('class', (d, index) => {
          if (index === special.initial && special.remaining > 0)
            return 'array-item burbuja-mayor';
          else if (index === special.initial + 1 && special.remaining > 0)
            return 'array-item burbuja-comparacion';
          else if (
            index > special.remaining ||
            (index === 0 && special.remaining === 0)
          )
            return 'array-item burbuja-ordenado';
          else return 'array-item';
        });

      svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => (i + 1) * 50)
        .attr('y', 200)
        .call(centerTextInsideContainer, 40)
        .attr('fill', (d, index) => {
          if (
            (index === special.initial || index === special.initial + 1) &&
            special.remaining !== 0
          )
            return 'white';
          else return 'black';
        })
        .attr('id', (d, index) => {
          if (index === special.initial && special.remaining !== 0)
            return 'texto-burbuja-mayor';
          else if (index === special.initial + 1 && special.remaining !== 0)
            return 'texto-burbuja-comparacion';
          else return undefined;
        })
        .text((d) => d);

      //leyenda
      svg
        .append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .attr('x', 50)
        .attr('y', 400)
        .attr('fill', '#413EE8');

      svg
        .append('text')
        .attr('x', 80)
        .attr('y', 400)
        .attr('transform', 'translate(0, 15)')
        .text('Casilla del valor maximo');

      svg
        .append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .attr('x', 50)
        .attr('y', 450)
        .attr('fill', '#E83E41');

      svg
        .append('text')
        .attr('x', 80)
        .attr('y', 450)
        .attr('transform', 'translate(0, 15)')
        .text('Casilla de comparacion');
    },
    transition: (svg, mode, data, special) => {
      //mueve la casilla con el mayor elemento
      let greater = {
        boxXCoordinate: null,
        text: null,
        value: null,
      };
      let comparison = {
        boxXCoordinate: null,
        text: null,
        value: null,
      };

      greater.boxXCoordinate = svg.select('.burbuja-mayor')._groups[0][0]
        ? Number(svg.select('.burbuja-mayor').attr('x'))
        : null;
      greater.text = svg.select('#texto-burbuja-mayor')._groups[0][0]
        ? Number(svg.select('#texto-burbuja-mayor').attr('x'))
        : null;
      greater.value = svg.select('#texto-burbuja-mayor')._groups[0][0]
        ? Number(svg.select('#texto-burbuja-mayor').text())
        : null;
      comparison.boxXCoordinate = svg.select('.burbuja-comparacion')
        ._groups[0][0]
        ? Number(svg.select('.burbuja-comparacion').attr('x'))
        : null;
      comparison.text = svg.select('#texto-burbuja-comparacion')._groups[0][0]
        ? Number(svg.select('#texto-burbuja-comparacion').attr('x'))
        : null;
      comparison.value = svg.select('#texto-burbuja-comparacion')._groups[0][0]
        ? Number(svg.select('#texto-burbuja-comparacion').text())
        : null;

      if (greater.value > comparison.value) {
        svg
          .select('.burbuja-mayor')
          .transition()
          .duration(200)
          .attr('x', greater.boxXCoordinate + 25)
          .attr('y', 150)
          .transition()
          .duration(200)
          .attr('x', greater.boxXCoordinate + 50)
          .attr('y', 200);
        svg
          .select('.burbuja-comparacion')
          .transition()
          .duration(200)
          .attr('x', comparison.boxXCoordinate - 25)
          .attr('y', 250)
          .transition()
          .duration(200)
          .attr('x', comparison.boxXCoordinate - 50)
          .attr('y', 200);
        svg
          .select('#texto-burbuja-mayor')
          .transition()
          .duration(200)
          .attr('x', greater.boxXCoordinate + 25)
          .attr('y', 150)
          .transition()
          .duration(200)
          .attr('x', greater.boxXCoordinate + 50)
          .attr('y', 200);
        svg
          .select('#texto-burbuja-comparacion')
          .transition()
          .duration(200)
          .attr('x', comparison.boxXCoordinate - 25)
          .attr('y', 250)
          .transition()
          .duration(200)
          .attr('x', comparison.boxXCoordinate - 50)
          .attr('y', 200);
      }
    },
    code: '/algorithms/bubbleSort.js',
  },
  selection: {
    algorithm: (
      dataStructure,
      stepData,
      externalInputs,
      arr = [...dataStructure]
    ) => {
      let lowPosition, scanPosition, temporary;
      const markers = stepData.markers;

      for (let i = stepData.iteration; i < arr.length; i++) {
        lowPosition = stepData.lowPosition;
        scanPosition = stepData.scanPosition;

        for (
          let j =
            scanPosition < lowPosition + 2 ? lowPosition + 2 : scanPosition + 1;
          j < arr.length + 1;
          j++
        ) {
          if (arr[scanPosition] < arr[lowPosition]) {
            lowPosition = scanPosition;
            scanPosition = lowPosition + 1;
          } else {
            scanPosition = j;
          }

          markers.pop();
          markers.push({
            startRow: 6,
            startCol: 30,
            endRow: 13,
            endCol: 4,
            className: 'codeEditor',
            type: 'background',
          });

          return {
            transformedDataStructure: arr,
            special: {
              ...stepData,
              iteration: i,
              lowPosition,
              scanPosition,
              previousLow: null,
              previousTarget: null,
              markers,
            },
          };
        }

        if (arr[lowPosition] < arr[i] && i < arr.length - 2) {
          temporary = arr[i];
          arr[i] = arr[lowPosition];
          arr[lowPosition] = temporary;
        }

        markers.pop();
        markers.push({
          startRow: 2,
          startCol: 24,
          endRow: 19,
          endCol: 2,
          className: 'codeEditor',
          type: 'background',
        });

        return {
          transformedDataStructure: arr,
          special: {
            ...stepData,
            iteration: i + 1,
            lowPosition: i + 1,
            scanPosition: i + 2,
            remaining: stepData.remaining - 1,
            finished: stepData.remaining === 1 ? true : false,
            previousLow: lowPosition,
            previousTarget: i,
          },
        };
      }
    },
    keyframe: (svg, data, special) => {
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', '30%')
        .attr('y', (d, i) => (i + 1) * 50)
        .attr('class', (d, index) => {
          if (special.lowPosition === index && special.remaining !== 0) {
            return 'array-item seleccion-mas-bajo';
          } else if (
            special.scanPosition === index &&
            special.remaining !== 0
          ) {
            return 'array-item seleccion-escaneo';
          } else if (
            index < data.length - 1 - special.remaining ||
            (special.remaining === 0 && index === data.length - 1)
          ) {
            return 'array-item seleccion-ordenado';
          }

          return 'array-item';
        });

      svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', '30%')
        .attr('y', (d, i) => (i + 1) * 50)
        .call(centerTextInsideContainer, 40)
        .attr('fill', (d, index) => {
          if (
            (index === special.lowPosition || index === special.scanPosition) &&
            special.remaining !== 0
          )
            return 'white';
          return 'black';
        })
        .attr('class', (d, index) => {
          if (special.lowPosition === index && special.remaining !== 0) {
            return 'texto-seleccion texto-seleccion-mas-bajo';
          } else if (
            special.scanPosition === index &&
            special.remaining !== 0
          ) {
            return 'texto-seleccion texto-seleccion-escaneo';
          } else {
            return 'texto-seleccion';
          }
        })
        .text((d, i) => d);
    },
    transition: (svg, mode, data, special) => {
      if (
        mode === 'forward' &&
        special.previousLow !== null &&
        special.previousTarget !== null
      ) {
        let low, target; //posiciones en el eje Y
        let nodesSVG = {
          rectArray: svg.selectAll('.array-item').nodes(),
        };

        low = Number(
          nodesSVG['rectArray'][special.previousLow].getAttribute('y')
        );

        target = Number(
          nodesSVG['rectArray'][special.previousTarget].getAttribute('y')
        );

        svg
          .select(`.array-item:nth-child(${special.previousLow + 1})`)
          .transition()
          .duration(200)
          .attr('x', '20%')
          .transition()
          .duration(200)
          .attr('x', '30%')
          .attr('y', target);

        svg
          .select(
            `.texto-seleccion:nth-child(${
              data.length + special.previousLow + 1
            })`
          )
          .transition()
          .duration(200)
          .attr('x', '20%')
          .transition()
          .duration(200)
          .attr('x', '30%')
          .attr('y', target);

        svg
          .select(`.array-item:nth-child(${special.previousTarget + 1})`)
          .transition()
          .duration(240)
          .attr('x', '40%')
          .transition()
          .duration(200)
          .attr('x', '30%')
          .attr('y', low);

        svg
          .select(
            `.texto-seleccion:nth-child(${
              data.length + special.previousTarget + 1
            })`
          )
          .transition()
          .duration(240)
          .attr('x', '40%')
          .transition()
          .duration(200)
          .attr('x', '30%')
          .attr('y', low);
      }
    },
    code: '/algorithms/selectionSort.js',
  },
  insertion: {
    algorithm: (
      dataStructure,
      stepData,
      externalInputs,
      arr = [...dataStructure]
    ) => {
      let iteration = stepData.iteration;
      let orderedItemIndex = stepData.comparisonIndex;
      let finished = false;
      let endOfIteration = false;
      const markers = [];

      stepData.iterationItem = arr[iteration];
      stepData.orderedItem = arr[orderedItemIndex];

      if (
        (arr[orderedItemIndex] < arr[iteration] && arr.length === 2) ||
        arr.length === 1
      ) {
        finished = true;
        endOfIteration = true;

        return {
          transformedDataStructure: arr,
          special: {
            ...stepData,
            iteration: endOfIteration ? iteration + 1 : iteration,
            comparisonIndex: endOfIteration ? 0 : orderedItemIndex,
            finished,
            markers,
          },
        };
      }

      if (arr[orderedItemIndex] > arr[iteration]) {
        let itemToInsert = arr.splice(iteration, 1)[0];
        arr.splice(orderedItemIndex, 0, itemToInsert);

        if (iteration === arr.length - 1) {
          finished = true;
        }

        endOfIteration = true;
      }
      orderedItemIndex += 1;

      markers.pop();

      if (
        arr[orderedItemIndex] < arr[iteration] &&
        iteration === arr.length - 1 &&
        orderedItemIndex === arr.length - 2
      ) {
        finished = true;
        endOfIteration = true;
      }

      if (!endOfIteration) {
        endOfIteration = orderedItemIndex === iteration;
        markers.push({
          startRow: 3,
          startCol: 19,
          endRow: 8,
          endCol: 3,
          className: 'codeEditor',
          type: 'background',
        });
      } else {
        markers.push({
          startRow: 2,
          startCol: 24,
          endRow: 9,
          endCol: 2,
          className: 'codeEditor',
          type: 'background',
        });
      }

      return {
        transformedDataStructure: arr,
        special: {
          ...stepData,
          iteration: endOfIteration ? iteration + 1 : iteration,
          comparisonIndex: endOfIteration ? 0 : orderedItemIndex,
          finished,
          markers,
        },
      };
    },
    keyframe: (svg, data, special) => {
      //Dibuja los cuadrados
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i + 1) * 50)
        .attr('y', 200)
        .attr('class', (d, i) => {
          // i != special.iteracion
          //   ? "array-item"
          //   : "array-item insercion-comparacion"
          let cssClass;

          if (i > special.comparisonIndex && i < special.iteration)
            cssClass = 'array-item item-reindexado';
          else if (i === special.comparisonIndex)
            cssClass = 'array-item insercion-ordenado';
          else if (i === special.iteration)
            cssClass = 'array-item insercion-comparacion';
          else cssClass = 'array-item';

          return cssClass;
        });

      //Dibuja el area que resalta los ordenados
      svg
        .append('rect')
        .attr('x', 45)
        .attr('y', 187)
        .attr('width', special.iteration * 50)
        .attr('height', 16 * 4)
        .attr('fill', '#0466C8')
        .attr('fill-opacity', '0.2')
        .attr('stroke-width', 0)
        .attr('stroke', 'black');

      //Dibuja los valores de cada item
      svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => (i + 1) * 50)
        .attr('y', 200)
        .call(centerTextInsideContainer, 40)
        .attr('fill', (d, index) => {
          return 'black';
        })
        .attr('class', (d, i) => {
          let cssClass;

          if (i > special.comparisonIndex && i < special.iteration)
            cssClass = 'texto-reindexado';
          else if (i === special.comparisonIndex) cssClass = 'texto-ordenado';
          else if (i === special.iteration) cssClass = 'texto-comparacion';

          return cssClass;
        })
        .text((d) => d);
    },
    transition: (svg, mode, data, special) => {
      if (mode === 'forward' && special.orderedItem > special.iterationItem) {
        let nodosSVG = {
          reindexed: svg.selectAll('.array-item.item-reindexado').nodes(),
          sortedX: svg
            .select('.array-item.insercion-ordenado')
            .node()
            .getAttribute('x'),
        };

        //Hace que el item de la iteracion se mueva verticalmente
        svg
          .select('.array-item.insercion-comparacion')
          .transition()
          .duration(100)
          .attr('y', 250)
          .transition()
          .duration(300)
          .attr('x', nodosSVG.sortedX)
          .transition()
          .duration(100)
          .attr('y', 200);

        svg
          .select('.texto-comparacion')
          .transition()
          .duration(100)
          .attr('y', 250)
          .transition()
          .duration(300)
          .attr('x', nodosSVG.sortedX)
          .transition()
          .duration(100)
          .attr('y', 200);

        //Hace que los items ordenados se muevan horizontalmente
        svg
          .select('.insercion-ordenado')
          .transition()
          .duration(500)
          .attr('x', (d, i) => Number(nodosSVG.sortedX) + 50);

        svg
          .select('.texto-ordenado')
          .transition()
          .duration(500)
          .attr('x', (d, i) => Number(nodosSVG.sortedX) + 50);

        svg
          .selectAll('.array-item.item-reindexado')
          .transition()
          .duration(500)
          .attr(
            'x',
            (d, i) => Number(nodosSVG.reindexed[i].getAttribute('x')) + 50
          );

        svg
          .selectAll('.texto-reindexado')
          .transition()
          .duration(500)
          .attr(
            'x',
            (d, i) =>
              nodosSVG.reindexed[i] &&
              Number(nodosSVG.reindexed[i].getAttribute('x')) + 50
          );
      }
    },
    code: `/algorithms/insertionSort.js`,
  },
  merge: {
    algorithm: (
      dataStructure,
      stepData,
      externalInputs,
      arr = [...dataStructure]
    ) => {
      const markers = [];

      const mergeAndSort = (arr, stepData) => {
        const firstHalf = arr;
        const secondHalf =
          stepData.historyStack[stepData.historyStack.length - 1].queue[0]
            .array;
        const newArray = stepData.newArray;
        let itemsToMerge =
          stepData.itemsToMerge === 0
            ? firstHalf.length + secondHalf.length
            : stepData.itemsToMerge;
        let i = stepData.firstHalfIndex;
        let j = stepData.secondHalfIndex;

        alert(itemsToMerge);

        if (i > firstHalf.length - 1) {
          const secondHalfRest = secondHalf.slice(j);

          newArray.push(...secondHalfRest);
          itemsToMerge -= secondHalfRest.length;
        } else if (j > secondHalf.length - 1) {
          const firstHalfRest = firstHalf.slice(i);

          newArray.push(...firstHalfRest);
          itemsToMerge -= firstHalfRest.length;
        } else {
          if (firstHalf[i] < secondHalf[j]) {
            alert('FC');
            newArray.push(firstHalf[i]);
            i++;
            itemsToMerge--;
          } else if (firstHalf[i] > secondHalf[j]) {
            alert('SC');
            newArray.push(secondHalf[j]);
            j++;
            itemsToMerge--;
          } else {
            alert('TC');
            newArray.push(firstHalf[i], secondHalf[j]);
            i++;
            j++;
            itemsToMerge -= 2;
          }
        }

        if (
          itemsToMerge === 0 &&
          !stepData.historyStack[stepData.historyStack.length - 1].queue[
            stepData.currentHalf
          ].sorted
        ) {
          if (stepData.currentHalf === 0) {
            alert(
              JSON.stringify(
                stepData.historyStack[stepData.historyStack.length - 1].queue
              )
            );

            stepData.historyStack[
              stepData.historyStack.length - 1
            ].queue.unshift({
              half: 0,
              array: newArray,
              sorted: true,
            });
          } else {
            stepData.historyStack[stepData.historyStack.length - 1].queue.pop();

            stepData.historyStack[stepData.historyStack.length - 1].queue.push({
              half: 1,
              array: newArray,
              sorted: true,
            });
          }
        }

        if (
          (stepData.currentHalf === 0 &&
            itemsToMerge === 0 &&
            stepData.historyStack[stepData.historyStack.length - 1].queue[0]
              .sorted) ||
          (stepData.currentHalf === 1 &&
            stepData.historyStack[stepData.historyStack.length - 1].queue[0] &&
            stepData.historyStack[stepData.historyStack.length - 1].queue[1]
              .sorted &&
            itemsToMerge === 0)
        ) {
          alert('BOTH SORTED');
          const mergedArray =
            stepData.currentHalf === 0
              ? newArray
              : stepData.historyStack[
                  stepData.historyStack.length - 1
                ].queue[0].array.concat(
                  stepData.historyStack[stepData.historyStack.length - 1]
                    .queue[1].array
                );

          alert(
            'MERGED ARRAY ' +
              mergedArray +
              ' CURRENT HALF ' +
              stepData.currentHalf
          );

          stepData.historyStack.pop();

          const lastUnsortedArrayOnTheQueue = !stepData.historyStack[
            stepData.historyStack.length - 1
          ].queue[0].sorted
            ? 0
            : 1;

          if (lastUnsortedArrayOnTheQueue === 0) {
            stepData.historyStack[
              stepData.historyStack.length - 1
            ].queue.unshift({
              half: 0,
              array: mergedArray,
              sorted: true,
            });
          } else {
            stepData.historyStack[stepData.historyStack.length - 1].queue.pop();

            stepData.historyStack[stepData.historyStack.length - 1].queue.push({
              half: 1,
              array: mergedArray,
              sorted: true,
            });
          }

          alert(
            'HISTORY TOP' +
              JSON.stringify(
                stepData.historyStack[stepData.historyStack.length - 1]
              )
          );
        }

        let areBothHalfsSortedAndMerged =
          stepData.historyStack[stepData.historyStack.length - 1].queue
            .length === 2 &&
          stepData.historyStack[stepData.historyStack.length - 1].queue[0]
            .sorted &&
          stepData.historyStack[stepData.historyStack.length - 1].queue[1]
            .sorted;

        let mergedAndSorted;
        if (areBothHalfsSortedAndMerged) {
          alert('FINALLY');

          return {}; //Ordenar las mitades ya ordenadas

          // stepData.historyStack.pop(); //Quita el nivel de las 2 mitades ordenadas
          // stepData.historyStack.pop(); //Quita el nivel del array original

          // const lastUnsortedArrayOnTheQueue = !stepData.historyStack[
          //   stepData.historyStack.length - 1
          // ].queue[0].sorted
          //   ? 0
          //   : 1;

          // if (lastUnsortedArrayOnTheQueue === 0) {
          //   stepData.historyStack[
          //     stepData.historyStack.length - 1
          //   ].queue.unshift({
          //     half: 0,
          //     array: mergedAndSorted,
          //     sorted: true,
          //   });

          // } else {
          //   stepData.historyStack[stepData.historyStack.length - 1].queue.pop();

          //   stepData.historyStack[stepData.historyStack.length - 1].queue.push({
          //     half: 1,
          //     array: mergedAndSorted,
          //     sorted: true,
          //   });

          //   mergedAndSorted = stepData.historyStack[
          //     stepData.historyStack.length - 1
          //   ].queue[0].concat(
          //     stepData.historyStack[stepData.historyStack.length - 1].queue[1]
          //   );
          // }
        }

        return {
          transformedDataStructure: areBothHalfsSortedAndMerged
            ? mergedAndSorted
            : itemsToMerge === 0
            ? stepData.historyStack[stepData.historyStack.length - 1].queue[1]
                .array
            : arr,
          special: {
            ...stepData,
            newArray: itemsToMerge === 0 ? [] : newArray,
            firstHalfIndex: itemsToMerge === 0 ? 0 : i,
            secondHalfIndex: itemsToMerge === 0 ? 0 : j,
            mode: itemsToMerge !== 0 ? 'mergeAndSort' : 'split',
            itemsToMerge,
            markers,
            currentHalf: itemsToMerge === 0 ? 1 : stepData.currentHalf,
          },
        };
      };

      const splitArray = (arr, stepData) => {
        const middle = arr.length / 2;
        let firstHalf = arr.slice(0, middle);
        let secondHalf = arr.slice(middle);

        const currentState = {
          original: arr,
          sorted: false,
          queue: [
            {
              half: 0,
              array: firstHalf,
              sorted: firstHalf.length === 1,
            },
            {
              half: 1,
              array: secondHalf,
              sorted: secondHalf.length === 1,
            },
          ],
        };

        let nextArray;

        nextArray = currentState.queue.shift();

        stepData.historyStack.push(currentState);

        if (nextArray.sorted && currentState.queue[0].sorted) {
          return {
            transformedDataStructure: nextArray.array,
            special: {
              ...stepData,
              sorted: false,
              currentHalf: nextArray.half,
              mode: 'mergeAndSort',
              firstHalfIndex: 0,
              secondHalfIndex: 0,
              newArray: [],
              itemsToMerge: 0,
            },
          };
        }

        return {
          transformedDataStructure: nextArray.array,
          special: {
            ...stepData,
            sorted: false,
            currentHalf: nextArray.half,
            queue: [],
            mode: 'split',
          },
        };
      };

      if (stepData.mode === 'mergeAndSort') {
        return mergeAndSort(arr, stepData);
      }

      if (!stepData.sorted && stepData.mode === 'split') {
        return splitArray(arr, stepData);
      }
    },
    keyframe: (svg, data, special) => {},
    transition: (svg, mode, data, special) => {},
    code: '/algorithms/mergeSort.js',
  },
  linearSearch: {
    algorithm: (
      dataStructure,
      stepData,
      externalInputs,
      arr = [...dataStructure]
    ) => {
      let currentItem;
      const markers = stepData.markers;

      currentItem = arr[stepData.iteration];

      markers.pop();

      if (currentItem === stepData.target) {
        markers.push({
          startRow: 11,
          startCol: 27,
          endRow: 13,
          endCol: 4,
          className: 'codeEditor',
          type: 'background',
        });

        return {
          transformedDataStructure: arr,
          special: {
            ...stepData,
            finished: true,
            found: true,
          },
        };
      } else {
        markers.push({
          startRow: 8,
          startCol: 26,
          endRow: 14,
          endCol: 2,
          className: 'codeEditor',
          type: 'background',
        });
      }

      //en el peor de los casos la complejidad temporal es O(n)
      return {
        transformedDataStructure: arr,
        special: {
          ...stepData,
          iteration: stepData.iteration + 1,
          finished: stepData.iteration === arr.length - 1 ? true : false,
          found: false,
        },
      };
    },
    keyframe: (svg, data, special) => {
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i + 1) * 50)
        .attr('y', 200)
        .attr('class', (d, index) => {
          if (index === special.iteration)
            return 'array-item busqueda-lineal-item';
          else return 'array-item';
        });

      svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => (i + 1) * 50)
        .attr('y', 200)
        .call(centerTextInsideContainer, 40)
        .attr('fill', (d, index) => {
          if (index === special.iteration) return 'white';
          else return 'black';
        })
        .text((d) => d);

      svg
        .append('text')
        .attr('x', 50)
        .attr('y', 270)
        .attr('fill', 'black')
        .text('O(1)');

      svg
        .append('text')
        .attr('x', data.length * 50)
        .attr('y', 270)
        .attr('fill', 'black')
        .text('O(n)');

      if (special.finished) {
        svg
          .append('text')
          .attr('x', 100)
          .attr('y', 100)
          .attr('fill', special.found ? 'green' : 'red')
          .text(() => {
            if (special.found === true)
              return 'Elemento encontrado en la posicion ' + special.iteration;

            return 'Elemento no encontrado en el array';
          });
      }

      if (special.iteration < data.length && special.iteration >= 0) {
        svg
          .append('text')
          .attr('xlink:href', () =>
            data[special.iteration] === special.target ? TickIcon : ErrorIcon
          )
          .attr('x', (special.iteration + 1) * 50)
          .attr('y', 170)
          .attr('fill', 'black')
          .call(centerTextInsideContainer, 40)
          .text(`i: ${special.iteration}`);

        svg
          .append('image')
          .attr('xlink:href', () =>
            data[special.iteration] === special.target ? TickIcon : ErrorIcon
          )
          .attr('width', 20)
          .attr('height', 20)
          .attr('x', (special.iteration + 1) * 50)
          .attr('y', 140)
          .call(centerTextInsideContainer, 20);
      }
    },
    transition: (svg, mode) => {},
    code: '/algorithms/linearSearch.js',
  },
  binarySearch: {
    algorithm: (
      dataStructure,
      stepData,
      externalInputs,
      arr = [...dataStructure]
    ) => {
      const halfIndex = Math.floor(arr.length / 2);
      const markers = stepData.markers;

      if (!stepData.started) {
        return {
          transformedDataStructure: arr,
          special: {
            ...stepData,
            started: true,
            halfIndex,
            fullLength: arr.length,
            timesCalled: 0,
          },
        };
      }

      const firstHalf = arr.slice(0, halfIndex);
      const secondHalf = arr.slice(halfIndex);

      markers.pop();

      if (arr.length === 1 && arr[0] !== stepData.target) {
        alert('NOT FUND');

        markers.push({
          startRow: 5,
          startCol: 0,
          endRow: 5,
          endCol: 40,
          className: 'codeEditor',
          type: 'background',
        });

        return {
          transformedDataStructure: arr,
          special: { ...stepData, finished: true },
        };
      }

      if (arr[halfIndex] > stepData.target) {
        markers.push({
          startRow: 9,
          startCol: 28,
          endRow: 11,
          endCol: 2,
          className: 'codeEditor',
          type: 'background',
        });

        return {
          transformedDataStructure: firstHalf,
          special: {
            ...stepData,
            halfIndex: Math.floor(firstHalf.length / 2),
            startIndex: stepData.startIndex,
            timesCalled: stepData.timesCalled + 1,
          },
        };
      } else if (arr[halfIndex] < stepData.target) {
        markers.push({
          startRow: 11,
          startCol: 28,
          endRow: 13,
          endCol: 2,
          className: 'codeEditor',
          type: 'background',
        });

        return {
          transformedDataStructure: secondHalf,
          special: {
            ...stepData,
            halfIndex: Math.floor(secondHalf.length / 2),
            startIndex: stepData.startIndex + firstHalf.length,
            timesCalled: stepData.timesCalled + 1,
          },
        };
      } else {
        markers.push({
          startRow: 7,
          startCol: 26,
          endRow: 9,
          endCol: 2,
          className: 'codeEditor',
          type: 'background',
        });

        return {
          transformedDataStructure: arr,
          special: {
            ...stepData,
            finished: true,
            found: true,
            timesCalled: stepData.timesCalled + 1,
          },
        };
      }
    },
    keyframe: (svg, data, special) => {
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i + special.startIndex + 1) * 50)
        .attr('y', 200)
        .attr('class', (d, index) => {
          if (index === special.halfIndex)
            return 'array-item busqueda-binaria-item';
          else return 'array-item';
        });

      svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => (i + special.startIndex + 1) * 50)
        .attr('y', 200)
        .call(centerTextInsideContainer, 40)
        .attr('font-family', 'Arial')
        .attr('fill', (d, index) => {
          if (index === special.halfIndex) return 'white';
          else return 'black';
        })
        .text((d) => d);

      svg
        .append('text')
        .attr('x', 50)
        .attr('y', 300)
        .attr('fill', '#0D3F77')
        .attr('font-family', 'Arial')
        .text('Objetivo: ' + special.target);

      svg
        .append('text')
        .attr('x', 50)
        .attr('y', 330)
        .attr('fill', '#0D3F77')
        .text(() => {
          return special.started
            ? 'Nro de items: ' + special.fullLength
            : 'Nro de items: ' + data.length;
        });

      if (special.finished) {
        svg
          .append('text')
          .attr('x', 100)
          .attr('y', 120)
          .attr('font-family', 'Arial')
          .attr('fill', special.found ? 'green' : 'red')
          .text(() => {
            if (special.found === true)
              return (
                'Elemento encontrado en ' +
                special.timesCalled +
                ' llamadas a busquedaBinaria()'
              );

            return 'Elemento no encontrado en el array';
          });
      }
    },
    transition: (svg, mode, data, special) => {},
    code: '/algorithms/binarySearch.js',
  },
  stack: {
    algorithm: (
      dataStructure,
      stepData,
      externalInputs,
      arr = [...dataStructure]
    ) => {
      const markers = [];
      if (externalInputs.action === 'push') {
        arr.push(externalInputs.value);
        markers.push({
          startRow: 9,
          startCol: 10,
          endRow: 16,
          endCol: 1,
          className: 'codeEditor',
          type: 'background',
        });
      } else if (externalInputs.action === 'pop') {
        arr.pop();
        markers.push({
          startRow: 18,
          startCol: 5,
          endRow: 21,
          endCol: 1,
          className: 'codeEditor',
          type: 'background',
        });
      }

      return {
        transformedDataStructure: arr,
        special: {
          ...stepData,
          action: externalInputs.action,
          headIndex: arr.length - 1,
          markers,
        },
      };
    },
    keyframe: (svg, data, special) => {
      const bottomY = 420;
      const topY = 400 - (data.length - 1) * 50;

      svg
        .append('path')
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('d', 'M150 180 v240 q0 10, 10 10  h180 q10 0 10 -10 v-240');

      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 160)
        .attr('y', (d, i) => bottomY - (i + 1) * 40 - 10 * i)
        .attr('rx', 5)
        .attr('width', 180)
        .attr('height', 40)
        .attr('fill', '#0C396B')
        .attr('class', (d, i) => {
          if (i === data.length - 1) return 'top-rect';
        });

      svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('font-family', 'Arial')
        .attr('fill', 'white')
        .attr('x', 160 + 180 / 2)
        .attr('y', (d, i) => bottomY - (i + 1) * 40 - 10 * i + 20)
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .attr('font-size', '20px')
        .text((d) => d)
        .attr('class', (d, i) => {
          if (i === data.length - 1) return 'top-rect-text';
        });

      if (data.length > 0) {
        svg
          .append('path')
          .attr('class', 'top-arrow')
          .attr('stroke', 'black')
          .attr('fill', 'black')
          .attr('d', `M420 ${topY} h-50 v-10 l-10 10 l10 10 v-10`);

        svg
          .append('text')
          .attr('class', 'top-text')
          .attr('fill', 'black')
          .attr('x', 430)
          .attr('y', topY)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'start')
          .attr('font-family', 'Arial')
          .text('Top');
      }
    },
    transition: (svg, mode, data, special) => {
      const bottomY = 420;
      const topY = 400 - (data.length - 1) * 50;

      if (special.action === 'push') {
        svg
          .append('path')
          .attr('stroke', 'black')
          .attr('fill', 'none')
          .attr('d', 'M150 180 v240 q0 10, 10 10  h180 q10 0 10 -10 v-240');

        svg
          .append('rect')
          .attr('x', 1000)
          .attr('y', 120)
          .attr('rx', 5)
          .attr('width', 180)
          .attr('height', 40)
          .attr('fill', '#0C396B')
          .transition()
          .duration(250)
          .attr('x', 160)
          .transition()
          .duration(250)
          .attr(
            'y',
            bottomY - (data.length - 1 + 1) * 40 - 10 * data.length - 1
          );

        svg
          .append('text')
          .attr('font-family', 'Arial')
          .attr('fill', 'white')
          .attr('x', 1000)
          .attr('y', 140)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .attr('font-size', '20px')
          .text(data[data.length - 1])
          .transition()
          .duration(250)
          .attr('x', 160 + 180 / 2)
          .transition()
          .duration(250)
          .attr('y', bottomY - data.length * 40 - 10 * (data.length - 1) + 20);

        if (data.length > 1) {
          svg
            .select('.top-arrow')
            .attr('stroke', 'black')
            .attr('fill', 'black')
            .attr('d', `M420 ${topY + 50} h-50 v-10 l-10 10 l10 10 v-10`)
            .transition()
            .duration(500)
            .attr('d', `M420 ${topY} h -50 v-10 l-10 10 l10 10 v-10`);

          svg
            .select('.top-text')
            .attr('fill', 'black')
            .attr('x', 430)
            .attr('y', topY + 50)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'start')
            .attr('font-family', 'Arial')
            .text('Top')
            .transition()
            .duration(500)
            .attr('y', topY);
        }
      } else if (special.action === 'pop') {
        svg
          .select('.top-rect')
          .transition()
          .duration(250)
          .attr('y', '140')
          .transition()
          .duration(250)
          .attr('x', 1000);

        svg
          .select('.top-rect-text')
          .transition()
          .duration(250)
          .attr('y', '160')
          .transition()
          .duration(250)
          .attr('x', 1000);
      }
    },
    code: '/dataStructures/stack.js',
  },
  queue: {
    algorithm: (dataStructure, stepData, externalInputs) => {
      const queue = dataStructure;
      const markers = [];

      if (externalInputs.action === 'enqueue') {
        queue.enqueue(externalInputs.value);

        markers.push({
          startRow: 18,
          startCol: 12,
          endRow: 33,
          endCol: 1,
          className: 'codeEditor',
          type: 'background',
        });
      } else if (externalInputs.action === 'dequeue') {
        queue.dequeue();

        markers.push({
          startRow: 35,
          startCol: 9,
          endRow: 49,
          endCol: 1,
          className: 'codeEditor',
          type: 'background',
        });
      }

      return {
        transformedDataStructure: queue,
        special: {
          ...stepData,
          action: externalInputs.action,
          markers,
        },
      };
    },
    keyframe: (svg, data, special) => {
      svg
        .append('path')
        .attr('stroke', 'black')
        .attr('stroke-width', '6px')
        .attr('stroke-linecap', 'round')
        .attr('d', 'M100 150 h300');

      svg
        .append('path')
        .attr('stroke', 'black')
        .attr('stroke-width', '6px')
        .attr('stroke-linecap', 'round')
        .attr('d', 'M100 300 h300');

      if (data.first) {
        let currentNode = data.first;
        let remaining = data.length;
        let i = 1;
        while (true) {
          const xCoordinate = 400 - 45 - 50 * (6 - remaining);
          const yCoordinate = 160;
          const itemBoxHeight = 130;
          const itemBoxWidth = 40;

          if (currentNode === data.first || currentNode === data.last) {
            svg
              .append('path')
              .attr('stroke', () => {
                if (currentNode === data.first) return '#0466C8';

                return '#800020';
              })
              .attr('stroke-width', '4px')
              .attr('fill', () => {
                if (currentNode === data.first) return '#0466C8';

                return '#800020';
              })
              .attr('stroke-linecap', 'round')
              .attr(
                'd',
                `M${xCoordinate + itemBoxWidth / 2} 400 v-80 h-5 l5 -5 l5 5 h-5`
              )
              .attr('id', () => {
                if (data.first === currentNode) return 'arrow-front';

                return 'arrow-back';
              });

            svg
              .append('text')
              .attr('font-family', 'Arial')
              .attr('fill', 'black')
              .attr('x', xCoordinate + itemBoxWidth / 2)
              .attr('y', 420)
              .attr('alignment-baseline', 'middle')
              .attr('text-anchor', 'middle')
              .text(() => {
                if (data.first === currentNode) return 'Frente';

                return 'Fondo';
              })
              .attr('id', () => {
                if (data.first === currentNode) return 'text-arrow-front';

                return 'text-arrow-back';
              });
          }

          svg
            .append('rect')
            .attr('x', `${xCoordinate}px`)
            .attr('y', `${yCoordinate}px`)
            .attr('rx', '5px')
            .attr('id', `item-${i}`)
            .attr('height', `${itemBoxHeight}px`)
            .attr('width', `${itemBoxWidth}px`)
            .attr('fill', '#0466C8');

          svg
            .append('text')
            .attr('font-family', 'Arial')
            .attr('fill', 'white')
            .attr('id', `text-item-${i}`)
            .attr('x', xCoordinate + itemBoxWidth / 2)
            .attr('y', yCoordinate + itemBoxHeight / 2)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .text(currentNode.value);

          if (currentNode.next) {
            remaining--;
            i++;
            currentNode = currentNode.next;
          } else {
            break;
          }
        }
      }
    },
    transition: (svg, mode, data, special) => {
      if (data.first) {
        let currentNode = data.first;
        let remaining = data.length;
        let i = 1;
        while (true) {
          const xCoordinate = 400 - 45 - 50 * (6 - remaining);
          const yCoordinate = 160;
          const itemBoxHeight = 130;
          const itemBoxWidth = 40;

          if (currentNode === data.last && special.action === 'enqueue') {
            svg
              .append('rect')
              .attr('x', `50px`)
              .attr('y', `0px`)
              .attr('rx', '5px')
              .attr('height', `${itemBoxHeight}px`)
              .attr('width', `${itemBoxWidth}px`)
              .attr('fill', '#0466C8')
              .transition()
              .duration(250)
              .attr('y', `${yCoordinate}px`)
              .transition()
              .duration(250)
              .attr('x', `${xCoordinate}px`);

            svg
              .append('text')
              .attr('font-family', 'Arial')
              .attr('fill', 'white')
              .attr('x', 70)
              .attr('y', 0)
              .attr('alignment-baseline', 'middle')
              .attr('text-anchor', 'middle')
              .text(currentNode.value)
              .transition()
              .duration(250)
              .attr('y', `${yCoordinate + itemBoxHeight / 2}px`)
              .transition()
              .duration(250)
              .attr('x', `${xCoordinate + itemBoxWidth / 2}px`);
          }

          if (special.action === 'enqueue') {
            svg
              .select(`#item-${i}`)
              .transition(500)
              .attr('x', `${xCoordinate}px`);

            svg
              .select(`#text-item-${i}`)
              .transition(500)
              .attr('x', `${xCoordinate + itemBoxWidth / 2}px`);
          }

          if (currentNode.next) {
            i++;
            remaining--;
            currentNode = currentNode.next;
          } else {
            break;
          }
        }
      }

      if (special.action === 'dequeue') {
        svg
          .select('#item-1')
          .transition()
          .duration(350)
          .attr('x', '500px')
          .transition()
          .duration(150)
          .attr('y', '2000px');

        svg
          .select('#text-item-1')
          .transition()
          .duration(350)
          .attr('x', '520px')
          .transition()
          .duration(150)
          .attr('y', '2000px');
      }

      /*
    svg
      .append('rect')
      .attr('x', '50px')
      .attr('y', '0px')
      .attr('rx', '5px')
      .attr('height', '80px')
      .attr('width', '40px')
      .attr('fill', '#0466C8')
      .transition()
      .duration(250)
      .attr('y', '60px')
      .transition()
      .duration(250)
      .attr('x', '105px')
      .transition()
      .duration(250)
      .attr('x', '155px')
      .transition()
      .duration(250)
      .attr('x', '205px')
      .transition()
      .duration(250)
      .attr('x', '255px')
      .transition()
      .duration(250)
      .attr('x', '305px')*/
    },
    code: '/dataStructures/queue.js',
  },
  linkedList: {
    algorithm: {},
    keyframe: (svg, data, special) => {
      // svg
      //   .append('circle')
      //   .attr('fill', 'skyblue')
      //   .attr('r', 20)
      //   .attr('cx', 200)
      //   .attr('cy', 70)
      //   .attr('stroke-width', '2px')
      //   .attr('stroke', 'black');
      // svg
      //   .append('text')
      //   .attr('color', 'black')
      //   .attr('font-family', 'Arial')
      //   .attr('fill', 'black')
      //   .attr('x', 200)
      //   .attr('y', 70)
      //   .attr('text-anchor', 'middle')
      //   .attr('alignment-baseline', 'central')
      //   .text(4);
      // svg
      //   .append('path')
      //   .attr('d', 'M200 90 v50 h-5 l5 5 l5 -5 h-5')
      //   .attr('stroke', 'black')
      //   .attr('fill', 'black');
      // svg
      //   .append('circle')
      //   .attr('fill', 'skyblue')
      //   .attr('r', 20)
      //   .attr('cx', 200)
      //   .attr('cy', 167)
      //   .attr('stroke-width', '2px')
      //   .attr('stroke', 'black');
      // svg
      //   .append('text')
      //   .attr('color', 'black')
      //   .attr('font-family', 'Arial')
      //   .attr('fill', 'black')
      //   .attr('x', 200)
      //   .attr('y', 167)
      //   .attr('text-anchor', 'middle')
      //   .attr('alignment-baseline', 'central')
      //   .text(4);
    },
    transition: (svg, mode, data, special) => {},
    code: {},
  },
  binarySearchTree: {
    algorithm: {},
    keyframe: (svg, data, special) => {
      // svg
      //   .append('circle')
      //   .attr('fill', 'skyblue')
      //   .attr('r', 30)
      //   .attr('cx', 200)
      //   .attr('cy', 70)
      //   .attr('stroke-width', '1px')
      //   .attr('stroke', 'black');
      // svg
      //   .append('text')
      //   .attr('color', 'black')
      //   .attr('font-family', 'Arial')
      //   .attr('fill', 'black')
      //   .attr('x', 200)
      //   .attr('y', 70)
      //   .attr('text-anchor', 'middle')
      //   .attr('alignment-baseline', 'central')
      //   .text(4);
      // svg
      //   .append('path')
      //   .attr('d', 'M200 100 v100')
      //   .attr('stroke', 'black')
      //   .attr('fill', 'black')
      //   .attr('transform', 'rotate(45,200,100)');
      // svg
      //   .append('path')
      //   .attr('d', 'M200 100 v100')
      //   .attr('stroke', 'black')
      //   .attr('fill', 'black')
      //   .attr('transform', 'rotate(-45,200,100)');
      // svg
      //   .append('circle')
      //   .attr('fill', 'skyblue')
      //   .attr('r', 30)
      //   .attr('cx', 270)
      //   .attr('cy', 171.421356237 + 30)
      //   .attr('stroke-width', '1px')
      //   .attr('stroke', 'black');
      // svg
      //   .append('text')
      //   .attr('color', 'black')
      //   .attr('font-family', 'Arial')
      //   .attr('fill', 'black')
      //   .attr('x', 270)
      //   .attr('y', 171.421356237 + 30)
      //   .attr('text-anchor', 'middle')
      //   .attr('alignment-baseline', 'central')
      //   .text(20);
      // svg
      //   .append('circle')
      //   .attr('fill', 'skyblue')
      //   .attr('r', 30)
      //   .attr('cx', 130)
      //   .attr('cy', 171.421356237 + 30)
      //   .attr('stroke-width', '1px')
      //   .attr('stroke', 'black');
      // svg
      //   .append('text')
      //   .attr('color', 'black')
      //   .attr('font-family', 'Arial')
      //   .attr('fill', 'black')
      //   .attr('x', 130)
      //   .attr('y', 171.421356237 + 30)
      //   .attr('text-anchor', 'middle')
      //   .attr('alignment-baseline', 'central')
      //   .text(10);
    },
    transition: (svg, mode, data, special) => {},
    code: {},
  },
};

export default visualizations;
