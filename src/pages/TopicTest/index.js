import React, { useState, useEffect } from 'react';
import AppLayout from 'layouts/AppLayout';
import { useParams } from 'react-router-dom';
import AceEditor from 'react-ace';
import { SERVER_URL } from '../../constants';
import Button from '../../components/Commons/styled/Button';
import Select from '../../components/Commons/Select/Select';
import { FiPlay } from 'react-icons/fi';
import styled from 'styled-components';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';
import './index.scss';

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Presentation = styled.div`
  flex: 1 1 40%;
  height: calc(100vh - 80px);
  overflow: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media (max-width: 768px) {
    flex-basis: 80vh;
    height: 100vh;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  padding-top: 0.75rem;
  background-color: #dbdfef;
  padding: 1rem;
  position: sticky;
  top: 0px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  flex-basis: 70%;
  justify-content: center;
`;

const Difficulty = styled.div`
  flex-basis: 30%;
  justify-content: center;
  color: white;

  h4 {
    background-color: ${({ level }) =>
      level === 'easy' ? '#0466c8' : level === 'medium' ? 'lime' : '#800020'};
    border-radius: 5px;
    padding: 0rem 1rem;
    width: min-content;
  }
`;

const HeadingWrapper = styled.div`
  font-size: 0.9rem;
  margin: 1rem;
  padding: 1rem;
  text-align: justify;
`;

const CodeSectionWrapper = styled.form`
  flex: 1 1 70%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-basis: 100vh;
    height: 100vh;
  }
`;

const Code = styled.div`
  display: flex;
  width: 100%;
  height: 65%;
`;

const TestsResults = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
`;

const Results = styled.div`
  padding-left: 1rem;
  padding-top: 1rem;
  overflow: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const TestActions = styled.div`
  color: white;
  background-color: #0466c8;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TestActionsLabel = styled.div`
  padding-left: 1rem;
`;

const TestActionsButtons = styled.div`
  justify-content: space-around;
`;

const TopicTest = () => {
  const params = useParams();
  const title = params.topic;
  const [challenges, setChallenges] = useState({
    loading: true,
    data: {},
  });
  const [challengesSelect, setChallengesSelect] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challengesSolved, setChallengesSolved] = useState(null);
  const [challengesSolvedIds, setChallengesSolvedIds] = useState(null);
  const [code, setCode] = useState('');
  const [item, setItem] = useState(null);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (challengesSolved) {
      const solvedChallenges = {};
      for (let i = 0; i < challengesSolved.length; i++) {
        solvedChallenges[challengesSolved[i].challenge_id] = true;
      }

      setChallengesSolvedIds(solvedChallenges);
    }
  }, [challengesSolved]);

  useEffect(async () => {
    let response = await fetch(`${SERVER_URL}/challenges/topic/${title}`);
    let data = await response.json();

    if (data.ok) {
      const token = localStorage.getItem('algothinker_token');

      setChallenges({
        loading: false,
        data: data.challenges,
      });

      const challengesSelect = data.challenges.map((challenge) => {
        return {
          label: challenge.title,
          value: challenge.id,
        };
      });

      setChallengesSelect(challengesSelect);
      setSelectedChallenge(0);

      response = await fetch(`${SERVER_URL}/challenges/user/topic/${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          token: token,
        },
      });

      data = await response.json();

      if (data.ok) {
        setChallengesSolved(data.challenges);
      }
    }
  }, [title]);

  useEffect(() => {
    if (typeof selectedChallenge === 'number') {
      setItem(challenges.data[selectedChallenge]);
    }
  }, [selectedChallenge]);

  const submitSolution = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('algothinker_token');

      const requestBody = {
        challengeId: item.id,
        userCode: code,
      };

      const promiseResponse = await fetch(`${SERVER_URL}/tests/challenge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          token: token,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await promiseResponse.json();

      if(data.err) throw Error(data.err);

      setResults({
        ok: data.ok,
        tests: data.results,
      });
    } catch (error) {
      setErrors(error.message);
    }
  };

  function onChange(newValue) {
    setCode(newValue);
  }
  

  return (
    <AppLayout>
      {challenges.loading || !item ? (
        <div>
          <h2>Cargando...</h2>
        </div>
      ) : (
        <Wrapper>
          <Content>
            <Presentation>
              <TitleWrapper>
                <Title>
                  <h2>{item.title}</h2>
                  {challengesSolvedIds &&
                    challengesSolvedIds[item.id] &&
                    '(Resuelto)'}
                </Title>
                <Difficulty level='easy'>
                  <h4>{item.difficulty_level}</h4>
                </Difficulty>
                {challengesSolvedIds && (
                  <Select
                    initialValue={{
                      value: item.id,
                      label: item.title,
                    }}
                    options={challengesSelect}
                    challengesSolvedIds={challengesSolvedIds}
                    setSelectedChallenge={setSelectedChallenge}
                  />
                )}
              </TitleWrapper>
              <HeadingWrapper>
                <p>{item.heading}</p>
              </HeadingWrapper>
            </Presentation>

            <CodeSectionWrapper onSubmit={submitSolution}>
              <Code>
                <AceEditor
                  mode='javascript'
                  width='100%'
                  height='100%'
                  theme='tomorrow'
                  fontSize={16}
                  placeholder='Escriba su codigo aqui...'
                  highlightActiveLine={false}
                  setOptions={{ useWorker: false }}
                  value={code}
                  onChange={onChange}
                />
              </Code>
              <TestsResults>
                <TestActions>
                  <TestActionsLabel>Resultados del reto</TestActionsLabel>
                  <TestActionsButtons>
                    <Button>
                      <FiPlay />
                    </Button>
                  </TestActionsButtons>
                </TestActions>
                <Results>
                  <h3>
                    {!results
                      ? 'Aqui apareceran los resultados del desafio'
                      : results.ok
                      ? 'Has aprobado!'
                      : !errors
                      ? 'Has fallado'
                      : 'Se encontraron los siguientes errores'}
                  </h3>

                  {results && !errors ? (
                    <ul>
                      {results.tests.map((testResult, index) => {
                        const status = testResult.split(' ')[0];
                        let style = status === 'EXITO' ? 'lime' : 'orangered';

                        testResult = testResult.slice(status.length);

                        return (
                          <li key={index}>
                            <span style={{ color: style }}>{status}</span>
                            {testResult}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    errors && (
                      <div style={{ color: 'red' }}>
                        {JSON.stringify(errors)}
                      </div>
                    )
                  )}
                </Results>
              </TestsResults>
            </CodeSectionWrapper>
          </Content>
        </Wrapper>
      )}
    </AppLayout>
  );
};

export default TopicTest;
