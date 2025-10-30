import { postComment } from './api.js'
import { updateCommentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'

// Обработчик добавления комментария
export const addCommentListener = () => {
    const nameInputEl = document.getElementById('textarea')
    const commentInputEl = document.getElementById('comments')
    const addButtonEl = document.getElementById('button')
    addButtonEl.addEventListener('click', () => {
        const name = nameInputEl.value.trim()
        const text = commentInputEl.value.trim()
        if (name && text) {
            postComment(name, text).then((data) => {
                updateCommentsData(data)
                renderComments()
                // Очищаем поля ввода
                nameInputEl.value = ''
                commentInputEl.value = ''
            })

            // Удаляем сообщение об ошибке, если было
            const errorElement = document.querySelector('.error-message')
            if (errorElement) errorElement.remove()

            // Перерисовываем комментарии
        } else {
            // стиль всплывающего текста при ошибке
            const errorElement = document.querySelector('.error-message')
            if (!errorElement) {
                const errorMessage = document.createElement('div')
                errorMessage.className = 'error-message'
                errorMessage.textContent = 'Пожалуйста, заполните все поля!'
                errorMessage.style.color = 'red'
                errorMessage.style.marginTop = '10px'
                // для появление ошибки под формой
                document.querySelector('.add-form').appendChild(errorMessage)
            }
        }
    })
}
