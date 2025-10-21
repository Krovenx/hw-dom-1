// import { commentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'
// import { formatDate } from './function.js'
import { updateCommentsData } from './commentsData.js'
import { host } from './addListener.js'
const nameInputEl = document.getElementById('textarea')
const commentInputEl = document.getElementById('comments')
const addButtonEl = document.getElementById('button')

// Обработчик добавления комментария
addButtonEl.addEventListener('click', () => {
    const name = nameInputEl.value.trim()
    const text = commentInputEl.value.trim()

    if (name && text) {
        // Добавляем новый комментари
        // commentsData.push({
        //     name: name,
        //     date: formatDate(new Date()),
        //     text: text,
        //     likes: 0,
        //     isLiked: false,
        // })
        const newComment = {
            name: name,
            text: text,
        }

        fetch(`${host}`, {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                updateCommentsData(data.comments)
                renderComments()
            })

        // Очищаем поля ввода
        nameInputEl.value = ''
        commentInputEl.value = ''

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
