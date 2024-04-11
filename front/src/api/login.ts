import request from '@/utils/request'
import { LoginResponse } from '@/type/request'

export function login(data: { username: string, password: string }): Promise<LoginResponse> {
    return request({
        url: '/login',
        // url: '/rest/v1/login',
        method: 'post',
        data: data
    })
}

export function logout() {
    return request({
        url: '/logout',
        // url: '/rest/v1/logout',
        method: 'delete',
    })
}