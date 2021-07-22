import classes from "../../Home.module.scss";

const Descriptions = () => {
  return (
    <div className={classes.gridContainer}>
      <div className={classes.row}>
        <div className={classes.fullDesc}>
          <div className={classes.wrapper}>
            <h2>Multiplataforma</h2>
            <p>
              Ya sea en una computadora de escritorio o en tu dispositivo móvil,
              nuestra aplicación es compatible con amplitud de dispositivos
            </p>
          </div>
        </div>
        <img src = "./assets/img/firstimagen.jpg" alt = "Primera imagen"/>
      </div>
      <div className={classes.row}>
        <img src = "./assets/img/secondimagen.jpg" alt = "Segunda imagen" />
        <div className={classes.fullDesc}>
          <div className={classes.wrapper}>
            <h2>Pensado para estudiantes</h2>
            <p>
              La tecnología es una herramienta que puede cubrir multitud de
              necesidades. Con esta idea creamos una aplicación que apoye
              la enseñanza de temas que, con métodos de enseñanza tradicionales,
              no son tan bien entendidos
            </p>
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.fullDesc}>
          <div className={classes.wrapper}>
            <h2>Fácil de usar</h2>
            <p>
              Cuando buscamos aprender nuevas cosas o volver a ver temas,
              es mejor que estos sean entregados de una manera que, sin
              importar tu nivel de familiaridad con el tema, puedes entender al
              finalizar la lección
            </p>
          </div>
        </div>
        <img src="./assets/img/thirdimagen.jpg" alt="Tercera imagen" />
      </div>
    </div>
  );
};

export default Descriptions;
