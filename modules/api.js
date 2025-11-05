import { formatDate } from './function.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
export const host = 'https://wedev-api.sky.pro/api/v1/witalii-barabanov'
// обновленный список после добавления нового комментария
export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const appComments = data.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: formatDate(new Date(comment.date)),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return appComments
        })
}

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
        fetchAndRenderComments()
    })
}
