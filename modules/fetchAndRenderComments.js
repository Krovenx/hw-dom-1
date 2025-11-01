import { renderComments } from './renderComments.js'
import { updateCommentsData } from './commentsData.js'
export const fetchAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/witalii-barabanov') // возвращаем обновленный список
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateCommentsData(data.comments)
            renderComments()
        })
}
