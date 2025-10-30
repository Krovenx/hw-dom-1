import { addCommentListener } from './modules/addListener.js'
import { fetchComments } from './modules/api.js'
import { updateCommentsData } from './modules/commentsData.js'
import { renderComments } from './modules/renderComments.js'
addCommentListener(renderComments)

fetchComments().then((data) => {
    updateCommentsData(data)
    renderComments()
})
