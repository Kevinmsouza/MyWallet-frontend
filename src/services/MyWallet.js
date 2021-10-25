import axios from "axios";

const BASE_URL = "http://localhost:4000"

function createHeaders(token){
    return {Authorization: `Bearer ${token}`}
}

function sendLoginRequest (body){
    return axios.post(`${BASE_URL}/sign-in`, body)
}

function sendSignUpRequest (body){
    return axios.post(`${BASE_URL}/sign-up`, body,)
}

function sendLogoutRequest (token){
    return axios.post(`${BASE_URL}/logout`, {}, createHeaders(token))
}

export {
    sendLoginRequest,
    sendSignUpRequest,
    sendLogoutRequest
}