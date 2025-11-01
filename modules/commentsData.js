export const commentsData = []

export const updateCommentsData = (newComments) => {
    commentsData.length = 0
    commentsData.push(...newComments)
}
