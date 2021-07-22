import classes from "../../Home.module.scss";
import { BsWindow, BsLayers, BsTerminal } from "react-icons/bs";

const ShortDescriptions = () => {
  return (
    <div className={classes.shortDescriptions}>
      <div className={classes.description}>
        <BsWindow />
        <h2>Multiplataforma</h2>
        <p>
          Aprende sobre Estructura de Datos y Algoritmos en el momento y
          dispositivo que desees
        </p>
      </div>
      <div className={classes.description}>
        <BsLayers />
        <h2>Pensado para estudiantes</h2>
        <p>Utilizando métodos que hacen el aprendizaje cómodo</p>
      </div>
      <div className={classes.description}>
        <BsTerminal />
        <h2>Fácil de usar</h2>
        <p>
          Para aprender cosas nuevas o refrescarlas, lo principal es la
          accesibilidad
        </p>
      </div>
    </div>
  );
};

export default ShortDescriptions;
