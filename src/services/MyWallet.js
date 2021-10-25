import axios from "axios";

const BASE_URL = "http://localhost:4000"

function createConfig (token){
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

function sendLoginRequest (body){
    return axios.post(`${BASE_URL}/sign-in`, body)
}

function sendSignUpRequest (body){
    return axios.post(`${BASE_URL}/sign-up`, body,)
}

function sendLogoutRequest (token){
    return axios.post(`${BASE_URL}/logout`, {}, createConfig(token))
}

function getOperationsRequest (token){
    return axios.get(`${BASE_URL}/operations`, createConfig(token))
}

export {
    sendLoginRequest,
    sendSignUpRequest,
    sendLogoutRequest,
    getOperationsRequest
}