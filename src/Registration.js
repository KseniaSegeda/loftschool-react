import React, {useState} from "react";
import "./Login.css";


function Login({onPageChange}) {
    const [formFields, setFormField] = useState({
        email: "",
        name: "",
        lastName: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        setFormField({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="login">
            <div className="loginForm">
                <form className="form">
                    <div className="title">
                        <h3>Регистрация</h3>
                        <div>
                            <span>Уже зарегистрирован?&nbsp;
                                <a href='#' onClick={onPageChange} name="login">Войти</a>
                            </span>
                        </div>
                    </div>
                    <div className="formContainer">
                        <div className="field field--full">
                            <label htmlFor="email" className="fieldLabel">
                                Адрес электронной почты
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="fieldInput"
                                name="email"
                                value={formFields.email}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="name" className="fieldLabel">
                                Имя
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="fieldInput"
                                name="name"
                                value={formFields.name}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="last-name" className="fieldLabel">
                                Фамилия
                            </label>
                            <input
                                id="last-name"
                                type="text"
                                className="fieldInput"
                                name="lastName"
                                value={formFields.lastName}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password" className="fieldLabel">
                                Пароль
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="fieldInput"
                                name="password"
                                value={formFields.password}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="actions">
                            <button
                                className="actionsButton"
                                name="map"
                                onClick={onPageChange}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
