import { postRegistration, updateToken } from './api.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')
    container.innerHTML = `<h1>Страница входа</h1>
<div class="form">
    <h3 class="form-title">Форма входа</h3>
    <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин" />
        <input type="text" id="name-input" class="input" placeholder="Имя" />
        <input type="text" id="password-input" class="input" placeholder="Пароль" />
    </div>
    <br />
    <button class="button" id="reg-button">Зарегистрироваться</button>
</div>`
    const buttonRegEl = document.getElementById('reg-button')
    const loginEl = document.getElementById('login-input')
    const passwordEl = document.getElementById('password-input')
    const nameEl = document.getElementById('name-input')

    buttonRegEl.addEventListener('click', () => {
        postRegistration(loginEl.value, nameEl.value, passwordEl.value).then(
            (responseData) => {
                updateToken(responseData.user.token)
                return renderLogin()
            },
        )
    })
}
