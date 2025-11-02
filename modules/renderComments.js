import { commentsData } from './commentsData.js'
import { escapeHtml, delay } from './function.js'
import { deleteComments } from './deleteComments.js'

export function renderComments() {
    const commentsListEl = document.querySelector('.comments')
    const commentInputEl = document.getElementById('comments')
    if (!commentsData) {
        return
    }
    commentsListEl.innerHTML = ''
    const commentsHTML = commentsData
        .map((comments, index) => {
            console.log(comments)
            const likeClass = comments.isLiked ? '-active-like' : ''
            return `        
        <li class="comment">
          <div class="comment-header">
            <div>${escapeHtml(comments.name)}</div>
            <div>${escapeHtml(comments.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${escapeHtml(comments.text)}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comments.likes}</span>
              <button class="like-button ${likeClass}" data-index="${index}"></button>
            </div>
          </div>
           <button class="delete-form-button" data-index="${index}"> Удалить </button>
        </li>
      `
        })
        .join('')
    commentsListEl.innerHTML = commentsHTML

    commentsListEl.addEventListener('click', (event) => {
        // Если кликнули на текст комментария
        if (event.target.classList.contains('comment-text')) {
            // находим поле ввода комментария
            const commentInputEl = document.getElementById('comments')
            // получаем автора комментария
            const comment = event.target.closest('.comments')
            const author = comment.querySelector(
                '.comment-header div',
            ).textContent
            //получаем текст комментария
            const text = event.target.textContent
            //Вставляем в форму "> Автор: текст комментария"
            commentInputEl.value = `${author}: ${text}\n`
            // Переводим курсор в поле ввода
            commentInputEl.focus()
        }
    })

    // Обработчик лайка, чтобы не срабатывал ответ на комментарий
    document.querySelectorAll('.like-button').forEach((button) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation()
            const index = e.target.getAttribute('data-index')
            const comment = commentsData[index]
            e.target.classList.add('-loading-like')
            delay(2000).then(() => {
                comment.likes = comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1
                comment.isLiked = !comment.isLiked
                comment.isLikeLoading = false
                renderComments()
            })
        })
    })
    deleteComments()
}
