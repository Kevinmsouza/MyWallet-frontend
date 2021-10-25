import axios from "axios";

const BASE_URL = "http://localhost:4000"

function sendLoginRequest (body){
    return axios.post(`${BASE_URL}/sign-in`, body)
}

function sendSignUpRequest (body){
    return axios.post(`${BASE_URL}/sign-up`, body)
}

export {
    sendLoginRequest,
    sendSignUpRequest
}