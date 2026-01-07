import request from '../utils/request.js'

const { get } = request

export async function getUserList(queryParams){
    return await get("/users/list", { params: queryParams })
}