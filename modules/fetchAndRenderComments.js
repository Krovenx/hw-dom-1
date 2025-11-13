import { updateCommentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'
import { token } from './api.js'
// import { fetchComments } from './api.js'
import { host } from './api.js'
import { formatDate } from './function.js'

export const fetchAndRenderComments = () => {
    return fetch(host + '/comments', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Нет авторизации')
            }
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
            updateCommentsData(appComments)
            renderComments()
            return appComments
        })
}
