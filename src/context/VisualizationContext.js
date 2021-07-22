import React, { createContext, useReducer, useEffect } from 'react';

export const VisualizationContext = createContext();

const visualizationReducer = (state, action) => {
  const { algorithmFunction, current, stateHistory } = state;

  switch (action.type) {
    case 'SET_VISUALIZATION':
      const {
        algorithm,
        visualization,
        lesson,
        updateVisualization,
        code,
        currentState,
        specialData,
      } = action;

      //inicializaciones dinamicas
      switch (lesson) {
        case 'bubble':
        case 'insertion':
        case 'selection':
          specialData.remaining = currentState.length - 1;
          break;
        default:
      }

      // specialData.restante = currentState.length - 1;

      if (stateHistory.length) {
        stateHistory.splice(0);
      }
      stateHistory.push({
        data: currentState,
        special: specialData,
      });

      return {
        ...state,
        algorithmFunction: algorithm,
        visualization,
        updateVisualization,
        code,
        current: currentState,
        stateHistory,
        specialData,
      };
    case 'SET_SPECIAL': {
      const { specialData } = state;
      const { newData } = action;
      const newSpecialData = { ...specialData, ...newData };

      return {
        ...state,
        specialData: newSpecialData,
      };
    }
    case 'EXECUTE_FULLY': {
      return {
        ...state,
        fullExecution: !state.fullExecution,
        mode: 'forward',
      };
    }
    case 'RESET_VISUALIZATION': {
      const resetted = stateHistory[0];

      stateHistory.splice(0);

      stateHistory.push(resetted);

      return {
        ...state,
        fullExecution: false,
        current: resetted.data,
        specialData: resetted.special,
        mode: 'reset',
      };
    }
    case 'EXECUTE_STEP': {
      const { mode, inputs } = action;
      const { specialData } = state;

      if (mode === 'forward') {
        const { transformedDataStructure, special } = algorithmFunction(
          current,
          specialData,
          inputs
        );

        stateHistory.push({
          data: transformedDataStructure,
          special,
        });

        return {
          ...state,
          stateHistory,
          current: transformedDataStructure,
          specialData: special,
          mode,
        };
      } else if (mode === 'backwards') {
        stateHistory.pop();
        let { data, special } = stateHistory[stateHistory.length - 1];

        return {
          ...state,
          stateHistory,
          current: data,
          specialData: special,
          mode,
          fullExecution: false,
        };
      }
    }
    default:
      return state;
  }
};

const VisualizationContextProvider = React.memo(({ children }) => {
  const [visualizationState, dispatchVisualization] = useReducer(
    visualizationReducer,
    {
      stateHistory: [],
      current: null,
      algorithmFunction: null,
      specialData: null,
      fullExecution: false,
      mode: null,
    }
  );

  return (
    <VisualizationContext.Provider
      value={{ visualizationState, dispatchVisualization }}
    >
      {children}
    </VisualizationContext.Provider>
  );
});

export default VisualizationContextProvider;
