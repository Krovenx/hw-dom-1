import { postLogin, updateToken } from './api.js'
import { fetchComments } from './api.js'
import { addCommentListener } from './addListener.js'

export const renderLogin = () => {
    const loginFormEl = document.getElementById('add-form')
    loginFormEl.innerHTML = `
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
        postLogin(loginEl.value, passwordEl.value)
            .then((responseData) => {
                updateToken(responseData.user.token)
                return fetchComments()
            })
            .then(() => {
                const formEl = document.getElementById('add-form')
                formEl.innerHTML = `
            <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="textarea" />
            <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4" id="comments"></textarea>
            <div class="add-form-row">
                <button class="add-form-button" id="button">Написать</button>
            </div>`
                addCommentListener()
            })
    })
}
