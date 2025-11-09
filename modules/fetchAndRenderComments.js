import { updateCommentsData } from './commentsData.js'
import { formatDate } from './function.js'
import { renderComments } from './renderComments.js'

export const host = 'https://wedev-api.sky.pro/api/v1/witalii-barabanov'
export const fetchComments = () => {
    return fetch(host + '/comments')
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
            updateCommentsData(data.comments)
            renderComments()
            return appComments
        })
}
