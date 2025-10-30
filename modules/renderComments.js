import { commentsData } from './commentsData.js'
import { escapeHtml } from './function.js'

const commentsListEl = document.querySelector('.comments')
const commentInputEl = document.getElementById('comments')
export function renderComments() {
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
        </li>
      `
        })
        .join('')
    commentsListEl.innerHTML = commentsHTML

    // Обработчик лайка, чтобы не срабатывал ответ на комментарий
    document.querySelectorAll('.like-button').forEach((button) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation()
            const index = e.target.getAttribute('data-index')
            commentsData[index].isLiked = !commentsData[index].isLiked
            commentsData[index].likes += commentsData[index].isLiked ? 1 : -1
            renderComments()
        })
    })
}

// Когда кликаем на текст комментария, добавляем его в поле ввода для ответа
commentsListEl.addEventListener('click', (event) => {
    // Проверяем, что клик был по тексту комментария, а не по лайку
    if (event.target.classList.contains('comment-text')) {
        const commentEl = event.target.closest('.comment')
        const author = commentEl.querySelector(
            '.comment-header div',
        ).textContent
        const commentText = event.target.textContent
        commentInputEl.value = `> ${author}: ${commentText}\n`
        commentInputEl.focus()
    }
})
