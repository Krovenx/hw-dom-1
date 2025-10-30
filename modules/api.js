import { formatDate } from './function.js'

const host = 'https://wedev-api.sky.pro/api/v1/witalii-barabanov'
export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
        })
        .then((ResponseData) => {
            const appComments = ResponseData.comments.map((comment) => {
                return {
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
        return fetchComments()
    })
}
