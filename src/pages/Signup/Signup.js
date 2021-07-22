import { useHistory } from "react-router-dom";
import { useContext } from "react";
import Layout from "layouts/RegularLayout";
import ParticlesBackground from "components/ParticlesBackground/ParticlesBackground";
import classes from "./Signup.module.scss";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";

import { SERVER_URL } from "../../constants";
import { AuthContext } from "context/AuthContext";

const handleSubmit = async ({
  fullName,
  email,
  password,
  dispatchUser,
  history,
}) => {
  try {
    const body = JSON.stringify({ name: fullName, email, password });

    const response = await fetch(`${SERVER_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();

    if (data.ok) {
      await Swal.fire(
        "¡Muy bien!",
        "El usuario ha sido registrado exitosamente",
        "success"
      );

      history.push("/login");
    }
  } catch (error) {
    await Swal.fire({
      title: "Error",
      text: "Ha ocurrido un error con el servidor",
      icon: "error",
    });
  }
};

function Signup() {
  const { dispatchUser } = useContext(AuthContext);
  const history = useHistory();

  return (
    <Layout>
      <div className={classes.wrapper}>
        <ParticlesBackground />
        <div className={classes.signUpFormWrapper}>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
            }}
            onSubmit={({ fullName, email, password }) => {
              handleSubmit({
                fullName,
                email,
                password,
                dispatchUser,
                history,
              });
            }}
          >
            {({ handleChange, isSubmitting }) => (
              <Form className={classes.signUpForm}>
                <h1 className={classes.header}>Registrarse</h1>
                <div className={classes.innerWrapper}>
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    placeholder="Nombre completo"
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Contraseña"
                  />
                  <input type="submit" value="Enviar" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
