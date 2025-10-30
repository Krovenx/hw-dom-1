// import { renderComments } from './renderComments.js'

// Удаление комментария
export const deleteComments = () => {
    const deleteButtons = document.querySelectorAll('.delete-form-button')

    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            const commentElement = event.target.closest('li.comment')
            if (commentElement) {
                commentElement.remove()
            }
        })
    })
}
