import { fetchComments } from './modules/api.js'
import { updateCommentsData } from './modules/commentsData.js'
import { renderComments } from './modules/renderComments.js'

fetchComments().then((data) => {
    updateCommentsData(data)
    renderComments()
})
