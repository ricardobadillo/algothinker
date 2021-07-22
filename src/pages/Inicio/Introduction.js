import React from 'react';
import { Link } from 'react-router-dom';
import { FcBarChart, FcGenealogy, FcGraduationCap, FcKindle, FcMultipleDevices, FcTodoList, FcWorkflow } from 'react-icons/fc';
import { GiNinjaHeroicStance } from 'react-icons/gi';
import { ImCool, ImEye, ImHappy, ImSearch, ImStarEmpty } from 'react-icons/im';
import './Introduction.scss';
import AppLayout from 'layouts/AppLayout';

const Introduction = () => {
    return (
        <>
            <AppLayout>
                <div className = "contenedor">
                    <div className = "imagen">
                        <img src = "./assets/img/hero.jpg" className = "img" alt = "hero"/> 
                    </div>

                    <div className = "contenido">
                        <ul className = "contenido-lista">
                            <li>
                                <div className = "contenido-lista-item">
                                    <FcBarChart className = "contenido-icons"/>
                                    <p>Reconoce mejor el rendimiento de tu código implementando Big-O.</p>
                                </div>
                            </li>
                            <li>
                                <div className = "contenido-lista-item"> 
                                    <FcGenealogy className = "contenido-icons"/>
                                    <p>Conoce estructuras de datos para poder almacenar eficientemente datos en tus programas.</p>
                                </div>
                            </li>
                            <li>
                                <div className = "contenido-lista-item"> 
                                    <FcWorkflow className = "contenido-icons"/>
                                    <p>Aprende algunos algoritmos para mejorar el manejo de tus estructuras de datos.</p>
                                </div>
                            </li>
                            <li>
                                <div className = "contenido-lista-item"> 
                                    <FcTodoList className = "contenido-icons"/>
                                    <p>Logra mejorar tu codificación con AlgoThinker.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* */}

                <div className = "barra">
                    <div className = "barra_blanca">
                        <div className = "barra_blanca_div">
                            <p>¿Qué puedes aprender exactamente?</p>
                        </div>

                        <div className = "barra_blanca_div">
                            <FcMultipleDevices  className = "barra_icon"/>
                            <FcKindle className ="barra_icon"/>
                            <FcGraduationCap className ="barra_icon" />
                        </div>
                    </div>
                </div>

                {/* */}

                <div className = "contenedor-information">
                    <h1 className = "introduction_title">Empezando</h1>
                    <div className = "blocks">
                        <div className = "blocks_1">
                            <div className = "blocks-title"> 
                                <ImHappy className = "title-icons"/> 
                                <h2>¿Qué somos?</h2>
                            </div>
                            <p>
                                <span className = "special">AlgoThinker</span> es un proyecto en el cual se ha consultado 
                                múltiples metodologías y bibliografías relacionadas al Aprendizaje, las Estructuras de Datos y Algoritmos
                                para la elaboración de una aplicación web progresiva que permita una enseñanza más cómoda para los
                                estudiantes.
                            </p>
                        </div>

                        <div className = "blocks_2">
                            <div className = "blocks-title"> 
                                <ImStarEmpty className = "title-icons"/> 
                                <h2>Propósitos</h2>
                            </div>
                            
                            <div>
                                <ul className = "lista">
                                    <li>
                                        <div> 
                                            <ImEye className = "list-icons"/>
                                            <p>Ser un primer acercamiento a las Estructuras de Datos y Algoritmos.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div> 
                                            <ImSearch className = "list-icons"/>
                                            <p>Lograr un mejor análisis a las implicaciones de las decisiones.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div> 
                                            <ImCool className = "list-icons"/>
                                            <p>Alcanzar una visión más profesional de los trabajos que realizas.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div> 
                                            <GiNinjaHeroicStance className = "list-icons"/>
                                            <p>Convertirte un ninja en la codificación.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* */}

                    <div>
                        <h1 className = "introduction_title">Primeros pasos</h1>
                        <div className = "introduction_div">
                            <div className = "introduction_div_p">
                                <p> 
                                    Imagina las estructuras de datos como formas de almacenar nuestros datos, por su parte,
                                    los algoritmos vendría siendo funciones o formas de utilizar las estructuras de datos
                                    para escribir nuestros programas.
                                </p>
                                <p>
                                    A lo largo de esta aplicación podrás conocer múltiples estructuras de datos como los son: 
                                    los arreglos, tablas hash, listas enlazadas, pilas, colas, árboles y grafos. Te hablaremos de
                                    su clasificación, pros, contras, cuando suelen utilizarse y finalmente sus métodos.
                                </p>
                            </div>
                            <div className = "introduction_div_img">
                                <img src = "./assets/img/ninja.jpg"  className = "img" alt = "Ninja"/>
                                <p>Apenas se comienza el camino para convertirse en un ninja de la codificación.</p>
                            </div>
                        </div>

                        {/* */}

                        <div className = "introduction_div box">
                            <div className = "introduction_img_box">
                                <img src = "./assets/img/box.jpg"  className = "img" alt = "Ninja"/>
                            </div>
                            <div className = "introduction_p_box">
                                <p> 
                                    Una estructura de datos es una colección de valores. Intenta no tener favoristimos.
                                    Cada una es buena y está especializada para lo suyo. Se puede pensar en las estructuras de datos
                                    como cualquier tipo de compartimiento; una caja para guardar diferentes tipos de cosas.
                                </p>

                                <p>
                                    Hay cajas anchas, pequeñas, grandes, medianas, de todo tipo. Todas sirven para guardar algún tipo de cosa.
                                    Al igual que las cajas, cada estructura de datos es específica para cierto tipo de circunstancia.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* */}

                    <div className = "introduction_div_final">
                        <div>
                            <p> 
                                Ten en cuenta algo: Los grandes programadores eligen las estructuras de datos adecuadas
                                junto a los algoritmos adecuados para poder construir grandes programas.
                            </p>
                        </div>
                        <div>
                            <img src = "./assets/img/dsa.jpg"  className = "img" alt = "DSA"/>
                        </div>
                    </div>

                    <div className = "introduction_div box">
                        <div className = "introduction_img_box">
                            <img src = "./assets/img/pillars.jpg"  className = "img" alt = "Ninja"/>
                        </div>
                        <div className = "introduction_p_box">
                            <p> 
                                Los tres pilares de la programación son:
                                <br/>
                                <span className = "special">1. Legibilidad del código.</span>
                                <br />
                                <span className = "special">2. Memoria:</span> Aquí corresponde hablar de la complejidad del espacio.
                                <br />
                                <span className = "special"> 3. Velocidad:</span> ¿Qué tan rápido es el tiempo de ejecución en el código? ¿Cuánto tiempo se tarda?
                                ¿Cuántas operaciones cuesta?
                                <br/> <br/>
                                Cuando codificas, suele ser difícil decidirse si memoria o velocidad. Intente no tener favoritos tampoco.
                                En ocasiones, es mejor código el que optimiza la memoria, en otros momentos, es el que optimiza la velocidad. Por eso existen.
                            </p>
                        </div>
                    </div>
                    <div className = "introduction_div_final">
                        <div>
                            <p> 
                                Es importante destacar un detalle antes de empezar con las clases:
                                Los ejemplos que se verá a lo largo de las lecciones y visualizaciones 
                                están diseñados en JavaScript, por ser un lenguaje de fácil lectura,
                                facilitando de esta manera el entendimiento del estudiante.
                            </p>
                        </div>
                        <div>
                            <img src = "./assets/img/js.jpg"  className = "img" alt = "JavaScript"/>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}

export default Introduction;
