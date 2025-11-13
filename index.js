import { addCommentListener } from './modules/addListener.js'
import { fetchComments } from './modules/api.js'
import { updateCommentsData } from './modules/commentsData.js'
import { renderComments } from './modules/renderComments.js'
import { renderLogin } from './modules/renderLogin.js'
addCommentListener()
renderLogin()

fetchComments().then((data) => {
    updateCommentsData(data)
    renderComments()
})
