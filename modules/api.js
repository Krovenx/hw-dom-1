import { updateCommentsData } from './commentsData.js'
import { formatDate } from './function.js'
import { renderComments } from './renderComments.js'
const host = 'https://wedev-api.sky.pro/api/v1/witalii-barabanov'
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

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    }).then(() => {
        return fetchComments() // возвращаем обновленный список
    })
}

export const deleteComment = (commentId) => {
    return fetch(host + `/comments/${commentId}`, {
        method: 'DELETE',
    })
        .then(() => {
            return fetch('https://wedev-api.sky.pro/api/v1/witalii-barabanov') // возвращаем обновленный список
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateCommentsData(data.comments)
            renderComments()
        })
}
