import React from 'react';
import {
  FcCancel,
  FcCheckmark,
  FcCommandLine,
  FcDislike,
  FcFile,
  FcFlashOff,
  FcFlashOn,
  FcHighPriority,
  FcIdea,
  FcInfo,
  FcLike,
  FcMediumPriority,
  FcNoIdea,
  FcOk,
  FcPlus,
  FcSearch,
  FcSurvey,
  FcTodoList,
  FcViewDetails
} from 'react-icons/fc';
import { CodeBlock, github } from "react-code-blocks";
import './LessonContent.scss';

const LessonData = ({data}) => {
  const language = 'javascript'
  const showLineNumbers = false;
  const startingLineNumber = 1;
  
  return (
    <>
      {'definition' in data && (
        <div className = 'contenedor_double_class'>
        <div className = 'contenedor_double_left'>
          <div className = 'contenedor_title'>
            <FcFile className = 'title_icon' />
            <h2>{data.definition.header}</h2>
          </div>
          <div className = 'contenedor_contenido'>
            <p className = 'contenedor_p'>{data.definition.text}</p>
          </div>
        </div>

        {'use_cases' in data && (
          <div className = 'contenedor_double_right'>
            <div className = 'contenedor_title'>
              <FcSearch className = 'title_icon' />
              <h2>{data.use_cases.header}</h2>
            </div>
            <div className = 'contenedor_contenido'>
              <p className = 'contenedor_p'>{data.use_cases.text}</p>
            </div>
          </div>
        )}
      </div>
      )}

      {/* ...INFORMACIÓN PREVIA... */}

      {'fundamentals' in data && (
        <div className = "contenedor_class_explication">
            <div className = "contenedor_title">
                <FcViewDetails className = "title_icon"/>
                <h2>{data.fundamentals.header}</h2>
            </div>
            <div className = "contenedor_50">
                <div className = "contenedor_50_left">
                    <div className = "contenedor_50_title">
                        <FcInfo className = "title_icon"/>
                        <h2>{data.fundamentals.subblocks[0].header}</h2>
                    </div>
                    <div>
                        <p className = "contenedor_p">{data.fundamentals.subblocks[0].text}</p>
                    </div>
                </div>
                <div className = "contenedor_50_right">
                    <div className = "contenedor_50_title">
                        <FcOk className = "title_icon"/>
                        <h2>{data.fundamentals.subblocks[1].header}</h2>
                    </div>
                    <div>
                        <p className = "contenedor_p">{data.fundamentals.subblocks[1].text}</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* ...EXPLICACIÓN... */}

      {'explanation' in data && 'subblocks' in data.explanation && (
        <div className = 'contenedor_class_explication'>
          <div className = 'contenedor_title'>
            <FcSurvey className = 'title_icon' />
            <h2>{data.explanation.subblocks[0].header}</h2>
          </div>
          <div className = 'contenedor_explication'>
            <div className = 'contenedor_explication_left'>
              <p className = 'contenedor_p'>
                {data.explanation.subblocks[0].text}
              </p>
            </div>
            <div className = 'contenedor_explication_right'>
              <img
                src={data.explanation.subblocks[1].image}
                className = 'img'
                alt = {data.explanation.subblocks[0].header}
              />
            </div>
          </div>
        </div>
      )}

      {/* CLASIFICACIÓN */}
      
      {'classification' in data && (
        <div className = 'contenedor_class_explication'>
          <div className = 'contenedor_title'>
            <FcTodoList className = 'title_icon' />
            <h2>{data.classification.header}</h2>
          </div>
          {'subblocks' in data.classification &&
            data.classification.subblocks.map((row, index) => (
              <div className = 'contenedor_contenido' key = {index}>
                <div className = 'contenido_left'>
                  <h4>{row.columns[0].header}</h4>
                  <p className = 'contenedor_p'>{row.columns[0].text}</p>
                </div>
                <div className = 'contenido_right'>
                  <img
                    src={row.columns[1].image}
                    className = 'explication_img'
                    alt = {row.columns[0].header}
                  />
                </div>
              </div>
            ))}
        </div>
      )}

      {/* EJEMPLOS */}
        

      {'examples' in data && (
        <div className = "contenedor_class_explication">
          <div className = "contenedor_title">
              <FcCommandLine className = "title_icon"/>
              <h2>{data.examples.subblocks[0].header}</h2>
          </div>

          {'subblocks' in data.examples &&
            data.examples.subblocks.map((row, index) => (
              <div className = 'contenedor_explication_code' key = {index}>
                <div className = 'contenedor_explication_left'>
                  <p className = 'contenedor_p'>{row.text}</p>
                </div>

                <div className = 'block_code'>
                  <CodeBlock
                      language = {language}
                      showLineNumbers = {showLineNumbers}
                      startingLineNumber = {startingLineNumber}
                      text = {row.code}
                      theme = {github}
                  />
                </div>
              </div>
          ))}
        </div>
      )}

      {/* ...PENDIENTE... */}

      {'attention' in data && 'subblocks' in data.attention && (
        <div className = 'contenedor_class_explication'>
          <div className = 'contenedor_title'>
            <FcMediumPriority className = 'title_icon' />
            <h2>{data.attention.subblocks[0].header}</h2>
          </div>
          <div className = 'contenedor_explication'>
            <div className = 'contenedor_explication_left'>
              <p className = 'contenedor_p'>
                {data.attention.subblocks[0].text}
              </p>
            </div>
            <div className = 'contenedor_explication_right'>
              <img
                src={data.attention.subblocks[1].image}
                className = 'img'
                alt = {data.attention.subblocks[0].header}
              />
            </div>
          </div>
        </div>
      )}

      {/* VENTAJAS Y DESVENTAJAS */}
      
      {'advantage' in data && (
        <div className='contenedor_double_class'>
          <div className='contenedor_double_left'>
            <div className='contenedor_title'>
              <FcCheckmark className='title_icon' />
              <h2>{data.advantage.header}</h2>
            </div>
            <div className='contenedor_contenido'>
              <ul className='contenido-lista'>
                <li>
                  <div className='contenido-lista-item'>
                    <FcIdea className='list-icon' />
                    <p>{data.advantage.subblocks[0].one}</p>
                  </div>
                </li>
                <li>
                  <div className='contenido-lista-item'>
                    <FcLike className='list-icon' />
                    <p>{data.advantage.subblocks[0].two}</p>
                  </div>
                </li>
                <li>
                  <div className='contenido-lista-item'>
                    <FcFlashOn className='list-icon' />
                    <p>{data.advantage.subblocks[0].three}</p>
                  </div>
                </li>
                <li>
                  <div className='contenido-lista-item'>
                    <FcInfo className='list-icon' />
                    <p>{data.advantage.subblocks[0].four}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {'disadvantage' in data && (
            <div className='contenedor_double_right'>
              <div className='contenedor_title'>
                <FcCancel className='title_icon' />
                <h2>{data.disadvantage.header}</h2>
              </div>
              <div className='contenedor_contenido'>
                <ul className='contenido-lista'>
                  <li>
                    <div className='contenido-lista-item'>
                      <FcNoIdea className='list-icon' />
                      <p>{data.disadvantage.subblocks[0].one}</p>
                    </div>
                  </li>
                  <li>
                    <div className='contenido-lista-item'>
                      <FcDislike className='list-icon' />
                      <p>{data.disadvantage.subblocks[0].two}</p>
                    </div>
                  </li>
                  <li>
                    <div className='contenido-lista-item'>
                      <FcFlashOff className='list-icon' />
                      <p>{data.disadvantage.subblocks[0].three}</p>
                    </div>
                  </li>
                  <li>
                    <div className='contenido-lista-item'>
                      <FcHighPriority className='list-icon' />
                      <p>{data.disadvantage.subblocks[0].four}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div> 
            )}
        </div>
      )}

      {/* BONUS */}

      {'bonus' in data && (
        <div className = "contenedor_class_explication">
          <div className = "contenedor_title">
              <FcPlus className = "title_icon"/>
              <h2>{data.bonus.header}</h2>
          </div>
          <div className = "contenedor_50">
              <div className = "contenedor_50_left">
                  <p className = "contenedor_p">{data.bonus.text_left}</p>
                  <ul>
                      {data.bonus.subblocks[0].columns.map((item, index) => 
                          <li className = "sub" key = {index}>{item}</li>
                      )}
                  </ul>
              </div>
              <div className = "contenedor_50_right">
                  <p className = "contenedor_p">{data.bonus.text_right}</p>
                  <ul>
                      {data.bonus.subblocks[1].columns.map((item, index) => 
                          <li className = "sub" key = {index}>{item}</li>
                      )}
                  </ul>
              </div>
          </div>
        </div>
      )}
    </>
)};

export const LessonContent = ({ title, data: response }) => {

  return (
    <div className = 'contenedor_class'>
      <h1 className = 'contenedor_class_title'>{title}</h1>

      {/* ...DEFINICIÓN Y USOS... */}

      {!response.loading ? <LessonData data={response.data}/> : (
        <div>
          <h2>Cargando</h2>
        </div>
      )}

    </div>
  );
};
