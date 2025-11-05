import { postComment } from './api.js'
import { updateCommentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'

// Обработчик добавления комментария
export const addCommentListener = () => {
    const nameInputEl = document.getElementById('textarea')
    const commentInputEl = document.getElementById('comments')
    const addButtonEl = document.getElementById('button')
    const addFormEl = document.querySelector('.add-form')

    // обработчик для ентера, переход на следующие поле ввода
    nameInputEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            commentInputEl.focus()
        }
    })

    // добавляем shift + enter
    commentInputEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            addButtonEl.click()
        }
    })

    addButtonEl.addEventListener('click', () => {
        const name = nameInputEl.value.trim()
        const text = commentInputEl.value.trim()
        addButtonEl.disabled = true
        addButtonEl.textContent = 'Комментарий добавляется'
        if (name && text) {
            // загрузка при отправке комментария
            addFormEl.style.display = 'none'
            const loadingText = document.createElement('h3')
            loadingText.textContent = 'Комментарий добавляется...'
            addFormEl.parentNode.appendChild(loadingText)

            postComment(name, text, addButtonEl).then((data) => {
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

            addButtonEl.disabled = false
            addButtonEl.textContent = 'Написать'
            // При ошибке возвращает
        }
    })
}
