import { renderComments } from './modules/renderComments.js'
import { host } from './modules/addListener.js'
import { updateCommentsData } from './modules/commentsData.js'

export const host = 'https://wedev-api.sky.pro/api/v1/witalii-barabanov/comments'
fetch(`${host}`)
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then((data) => {
        console.log(data)
        updateCommentsData(data.comments)
        renderComments()
    })
