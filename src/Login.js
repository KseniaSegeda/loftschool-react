import React, {useState} from "react";
import "./Login.css";


const Login = ({customNavigation}) => {
    const [formFields, setFormField] = useState({
        name: "",
        password: "",
    });

    const onChange = (e) => {
        setFormField({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = (e) =>{
        e.preventDefault();
        customNavigation('map');
    }

    return (
        <div className="login">
            <div className="loginForm">
                <form className="form" onSubmit={onSubmitForm} >
                    <div className="title">
                        <h3>Войти</h3>
                        <div>
                            <span>Новый пользователь?&nbsp;
                                <button onClick={() => customNavigation("registration")}>Зарегистрируйтесь</button>
                            </span>
                        </div>
                    </div>
                    <div className="formContainer">
                        <div className="field">
                            <label htmlFor="name" className="fieldLabel">Имя</label>
                            <input
                                id="name"
                                type="text"
                                className="fieldInput"
                                name="name"
                                value={formFields.name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password" className="fieldLabel">Пароль</label>
                            <input
                                id="password"
                                type="password"
                                className="fieldInput"
                                name="password"
                                value={formFields.password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="actions">
                            <button
                                type="submit"
                                className="actionsButton"
                            >Войти</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
