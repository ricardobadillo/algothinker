import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.scss";

const NavigationBar = () => {
  const [navbarClass, setNavbarClass] = useState(classes.navbar);

  const changeNavbarStyle = () => {
    if (window.scrollY >= 350 && navbarClass === classes.navbar) {
      setNavbarClass(classes.navbarActive);
    } else if (window.scrollY < 350 && navbarClass === classes.navbarActive) {
      setNavbarClass(classes.navbar);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarStyle);

    return () => {
      return window.removeEventListener("scroll", changeNavbarStyle);
    };
  }, [navbarClass]);

  return (
    <div className={navbarClass}>
      <ul>
        <li>
          <Link to="/">AlgoThinker</Link>
        </li>
        <li>
          <Link to="/login">Iniciar sesión</Link>
        </li>
        <li>
          <Link to="/signup">Regístrate</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
