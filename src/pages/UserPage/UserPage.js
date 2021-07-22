import React, { useContext } from 'react';
import AppLayout from 'layouts/AppLayout';
import { AuthContext } from 'context/AuthContext';
import './UserPage.scss';

const UserPage = () => {

    const { user } = useContext(AuthContext);

    return (
        <AppLayout>
            <div className = "contenedor_usuario">
                <div className = "usuario_left">
                    <div className = "usuario_img">
                        <div>
                            <img src = "./assets/img/usuario.jpg" className = "usuario" alt = "Usuario"/> 
                        </div>
                        <div>
                            <h2>¡Hola {user.fullname}!</h2>
                        </div>
                    </div>
                    <div className = "usuario_info">
                        <h2>Información general</h2>
                        <p>Nombre: {user.fullname}</p>
                        <p>Correo: {user.email}</p>
                    </div>
                </div>
                <div className = "usuario_right">
                    <h2>Nombre de usuario</h2>
                    <input className = "input"  placeholder = "Nombre de usurio"/>
                    <h2>Contraseña</h2>
                    <input className = "input"  placeholder = "Contraseña: "/>
                    <button className = "button">Cambiar datos</button>
                </div>
            </div>
        </AppLayout>
    )
}

export default UserPage;