import { fetchAndRenderComments } from './fetchAndRenderComments.js'

export const host = 'https://wedev-api.sky.pro/api/v1/witalii-barabanov'
const authToken = 'https://wedev-api.sky.pro/api/user'
export let token = ''
export const updateToken = (newToken) => {
    token = newToken
}

export const fetchComments = () => {
    return fetch(host + '/comments', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(() => {
        return fetchAndRenderComments()
    })
}
// обновленный список после добавления нового комментария
export const postComment = (name, text) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
            name,
        }),
    })
        .then((errorStatus) => {
            if (errorStatus.status === 201) {
                return errorStatus.json()
            } else {
                if (errorStatus.status === 400) {
                    throw new Error(
                        'Имя и комментарий должны быть не короче 3 символов',
                    )
                }
                if (errorStatus.status === 500) {
                    throw new Error('Сервер упал')
                }

                throw new Error('Что то пошло не так')
            }
        })
        .then(() => {
            return fetchAndRenderComments() // возвращаем обновленный список
        })
        .catch((error) => {
            if (
                error.message ===
                'Имя и комментарий должны быть не короче 3 символов'
            ) {
                alert(error.message)
            } else {
                alert('Нет подключение к сети')
            }
        })
}

export const deleteComment = (commentId) => {
    return fetch(host + `/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(() => {
        return fetchAndRenderComments()
    })
}

export const postLogin = (login, password) => {
    return fetch(`${authToken}/login`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                if (response.status === 400) {
                    throw new Error(
                        'Имя и комментарий должны быть не короче 3 символов',
                    )
                }
                if (response.status === 500) {
                    throw new Error('Сервер упал')
                }

                throw new Error('Что то пошло не так')
            }
        })
        .catch((error) => {
            if (
                error.message ===
                'Имя и комментарий должны быть не короче 3 символов'
            ) {
                alert(error.message)
            } else {
                alert('Нет подключение к сети')
            }
        })
}
