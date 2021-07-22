import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from 'layouts/RegularLayout';
import ParticlesBackground from 'components/ParticlesBackground/ParticlesBackground';
import classes from './Login.module.scss';
import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import { SERVER_URL } from '../../constants';
import { AuthContext } from 'context/AuthContext';

const handleSubmit = async ({ email, password, dispatchUser, setRedirect }) => {
  try {
    const body = JSON.stringify({ email, password });

    const response = await fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.json();

    if (data.ok) {
      const { email, name, profile_picture: profilePicture } = data.user;

      dispatchUser({
        type: 'LOG_IN',
        user: { email, fullname: name, profilePicture },
        token: data.token,
      });

      setRedirect(true);
    }
  } catch (error) {
    await Swal.fire({
      title: 'Error',
      text: 'Ha ocurrido un error con el servidor',
      icon: 'error',
    });
  }
};

function Login() {
  const { dispatchUser } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  if (redirect) {
    history.push('/intro');
  }

  return (
    <Layout>
      <div className={classes.wrapper}>
        <ParticlesBackground />
        <div className={classes.logInFormWrapper}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={({ email, password }) =>
              handleSubmit({ email, password, dispatchUser, setRedirect })
            }
          >
            {({ handleChange, isSubmitting }) => (
              <Form className={classes.logInForm}>
                <h1 className={classes.header}>Iniciar sesión</h1>
                <div className={classes.innerWrapper}>
                  <input
                    type='email'
                    name='email'
                    required
                    placeholder='Correo electrónico'
                    onChange={handleChange}
                  />
                  <input
                    type='password'
                    name='password'
                    required
                    placeholder='Contraseña'
                    onChange={handleChange}
                  />
                  <input type='submit' value='Entrar' />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
