import { commentsData } from './commentsData.js'
import { escapeHtml } from './function.js'
import { deleteComments } from './deleteComments.js'
const commentsListEl = document.querySelector('.comments')
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
           <button class="delete-form-button" data-index="${index}"> Удалить </button>
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
    deleteComments()
}
