const executeFully = (dispatchVisualization) => {
  dispatchVisualization({
    type: 'EXECUTE_FULLY',
  });
};

const resetVisualization = (dispatchVisualization) => {
  dispatchVisualization({
    type: 'RESET_VISUALIZATION',
  });
};

const executePartially = (mode, dispatchVisualization, inputs) => {
  dispatchVisualization({
    type: 'EXECUTE_STEP',
    mode,
    inputs
  });
};

export { executeFully, resetVisualization, executePartially };
