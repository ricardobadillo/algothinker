import { useRef, useContext, useState, useEffect } from 'react';
import { VisualizationContext } from 'context/VisualizationContext';
import D3SVGCanvas from 'classes/D3SVGCanvas';
import './visualizations.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
    overflow: hidden;
  }
`;

//La caja negra entre react y d3... la division de sus mundos
//React suministra los datos a un contenedor del que tiene una
//referencia
const SVGCanvas = () => {
  let svgWrapper = useRef();
  const { visualizationState } = useContext(VisualizationContext);
  const {
    current: data,
    specialData: special,
    visualization,
    updateVisualization,
    mode,
  } = visualizationState;
  const [canvas, setCanvas] = useState(null);

  const createCanvas = () => {
    setCanvas(new D3SVGCanvas(svgWrapper, '100%', '100%'));
  };

  //Dibuja cosas en el lienzo SVG o refresca el canvas si
  //este ya tiene algo dentro
  const drawAndRedrawData = () => {
    if (data && canvas && !canvas.hasData) {
      canvas.draw(data, special, visualization);
    } else if (data && canvas && canvas.hasData) {
      canvas.update(data, special, mode, updateVisualization, visualization);
    }
  };

  useEffect(createCanvas, []);

  useEffect(drawAndRedrawData, [data, special, canvas]);

  return <Wrapper ref={svgWrapper} id='svg-canvas-wrapper'></Wrapper>;
};

export default SVGCanvas;
