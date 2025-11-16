import { token } from './api.js'
import { host } from './api.js'
import { updateCommentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'

export const fetchAndRenderComments = () => {
    return fetch(host + '/comments', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('Нет авторизации')
        }
        return response.json()
    })
}
