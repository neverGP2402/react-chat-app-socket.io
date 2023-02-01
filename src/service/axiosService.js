import axios from '../utils/axiosConfig'

const loginService = (data) => {
    return axios.post(`/auth/api/login`,data)
}

const registerService = (data) => {
    return axios.post(`/auth/api/register`,data)
}

const setAvatarService = (id, avatar) => {
    return axios.post(`/auth/api/set-avatar/${id}`,avatar)
}

const getAllUsersService = (type) => {
    return axios.get(`/auth/api/users/${type}`)
}

const sendMessageService = async (data) => {
    return axios.post(`/message/api/send-messages`,data)
}

const getMessageService = async (from,to) => {
    return axios.get(`/message/api/messages/${from}-${to}`)
}

export {
    loginService,
    registerService,
    setAvatarService,
    getAllUsersService,
    sendMessageService,
    getMessageService
}