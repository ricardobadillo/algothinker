import React from "react";
import ParticlesBackground from "components/ParticlesBackground/ParticlesBackground";
import classes from "../../Home.module.scss";


const HeroSection = () => {
  return (
    <div className={classes.hero}>
      <ParticlesBackground />
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          <h1> Bienvenido a AlgoThinker</h1>
          <h2>Aprende Estructuras de Datos y Algoritmos</h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
