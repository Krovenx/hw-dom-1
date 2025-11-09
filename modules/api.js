// import { renderComments } from './renderComments.js'
// import { updateCommentsData } from './commentsData.js'
// import { formatDate } from './function.js'
import { fetchComments } from './fetchAndRenderComments.js'
import { host } from './fetchAndRenderComments.js'

// обновленный список после добавления нового комментария
export const postComment = (name, text) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                if (response.status === 400) {
                    throw new Error(
                        'Имя и комментарий должны быть не короче 3 символов',
                    )
                }
                if (response.status === 500) {
                    throw new Error('Сервер упал')
                }

                throw new Error('Что то пошло не так')
            }
        })
        .then(() => {
            return fetchComments() // возвращаем обновленный список
        })
        .catch((error) => {
            if (
                error.message ===
                'Имя и комментарий должны быть не короче 3 символов'
            ) {
                alert(error.message)
            } else {
                alert('Нет подключение к сети')
            }
        })
}

export const deleteComment = (commentId) => {
    return fetch(host + `/comments/${commentId}`, {
        method: 'DELETE',
    }).then(() => {
        return fetchComments()
    })
}
