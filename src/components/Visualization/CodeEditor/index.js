import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import visualizationsData from 'visualizations/visualizationsData';
import { VisualizationContext } from 'context/VisualizationContext';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';
import './codeEditor.css';

const Wrapper = styled.div`
  flex: 1 1 50%;

  @media (max-width: 768px) {
    display: ${({ selectedTab }) =>
      selectedTab === 'Visualización' ? 'none' : 'block'};
  }
`;

const CodeEditor = ({ fetchedData, selectedTab }) => {
  const { visualizationState } = useContext(VisualizationContext);
  const [code, setCode] = useState('');
  let [codePath, setCodePath] = useState(''); 

  const fetchCode = async () => {
    if (!fetchedData.loading && codePath !== '') {
      let response = await fetch(codePath);

      let data = await response.text();

      return data;
    }
  };;

  useEffect(() => {
    if (!fetchedData.loading) {
      fetchCode().then((text) => {
        setCode(() => text);
      });
    }
  }, [codePath, fetchedData]);

  useEffect(() => {
    if(!fetchedData.loading) {
      const visualizationData = fetchedData.data;
      setCodePath(visualizationsData[visualizationData.name].code);
    }
  }, [fetchedData])

  if(!fetchedData.loading) {
    const markers = [];
  
    if (visualizationState.specialData) {
      // alert(JSON.stringify(visualizationState.specialData))
      for (let marker of visualizationState.specialData.markers) {
        markers.push(marker);
      }
    }

    return (
      <>
        <Wrapper selectedTab={selectedTab}>
          <AceEditor
            mode='javascript'
            width='100%'
            height='100%'
            theme='tomorrow'
            fontSize={16}
            readOnly
            placeholder='Escriba su codigo aqui...'
            highlightActiveLine={false}
            setOptions={{ useWorker: false }}
            markers={markers}
            value={code}
          />
        </Wrapper>
      </>
    );
  } else {
    return (
      <>
        <Wrapper selectedTab={selectedTab}>
          <AceEditor
            mode='javascript'
            width='100%'
            height='100%'
            theme='tomorrow'
            fontSize={16}
            readOnly
            placeholder='Escriba su codigo aqui...'
            highlightActiveLine={false}
            setOptions={{ useWorker: false }}
          />
        </Wrapper>
      </>
    );
  }

}

export default CodeEditor;
