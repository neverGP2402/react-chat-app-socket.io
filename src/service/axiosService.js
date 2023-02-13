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

// friend
const findUsersService = async(data) => {
    return await axios.post(`/auth/api/get-friend/`,data)
}

const addFriendService = (data) => {
    return axios.post(`/auth/api/add-friend`, data)
}
// message
const sendMessageService = async (data) => {
    return axios.post(`/message/api/send-messages`,data)
}

const getMessageService = async (from,to) => {
    return axios.get(`/message/api/messages/${from}-${to}`)
}

const getUsersChatService = async (id) => {
    return await axios.get(`/message/api/users-chat/${id}`)
}

// handle friends

const getFollowersService = async (id) => {
    return await axios.get(`/auth/api/followers/${id}`)
}

const getFollowingService = async (id) => {
    return await axios.get(`/auth/api/following/${id}`)
}

const agreeAddFriendService = async (data) => {
    return await axios.put(`/auth/api/agree-add-friend`,data)
}

const getAllFriendService = async (id) => {
    return await axios.get(`/auth/api/list-friend/${id}`)
}

const sendRequestService = async (data) => {
    return await axios.post(`/auth/api/send-request-add-friend`,data)
}

const deleteRequestService = async (data) => {
    return await axios.delete(`/auth/api/delete-request`, {data})
}

const updateInfoService = async (data) => {
    return await axios.put(`/auth/api/update-info`,data)
}

export {
    loginService,
    registerService,
    setAvatarService,
    getAllUsersService,
    updateInfoService,
    // messageService
    sendMessageService,
    getMessageService,
    getUsersChatService,
    // friendService
    findUsersService,
    getAllFriendService,
    addFriendService,
    getFollowingService,
    getFollowersService,
    sendRequestService,
    agreeAddFriendService, 
    deleteRequestService
}