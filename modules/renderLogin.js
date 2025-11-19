import { postLogin, updateToken } from './api.js'
import { renderRegistration } from './renderRegistration.js'
import { renderComments } from './renderComments.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')
    container.innerHTML = `
     <h1>Страница входа</h1>
    <form class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            <input type="text" id="login-input" class="input" placeholder="Логин" autocomplete="username" />
            <input type="password" id="password-input" class="input" placeholder="Пароль" autocomplete="current-password" />
            </div>
        <br />
        <button type="button" class="button" id="login-button">Войти</button>
        <button type="button" class="button" id="reg-button">Зарегистрироваться</button>
    </form>`

    const buttonEl = document.getElementById('login-button')
    const loginEl = document.getElementById('login-input')
    const passwordEl = document.getElementById('password-input')

    buttonEl.addEventListener('click', () => {
        postLogin(loginEl.value, passwordEl.value).then((responseData) => {
            updateToken(responseData.user.token)
            renderComments()
        })
    })
    const regButtonEl = document.getElementById('reg-button')
    regButtonEl.addEventListener('click', () => {
        renderRegistration()
    })
}
