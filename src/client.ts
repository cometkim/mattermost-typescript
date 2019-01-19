/// <reference path="../@types/user.d.ts"/>

import axios, { AxiosInstance } from 'axios'

export default class Client {
    public static ENDPOINT = '/api/v4'

    private instance: AxiosInstance
    private token: string

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        })
    }

    public async login(username: string, password: string) {
        try {
            const res = await this.instance.post('/users/login', { username, password })
            const { token } = res.headers
            this.token = token
            this.instance.defaults.headers.common.Authorization = token
        } catch (error) {
            this.onError(error)
        }
    }

    public setToken = (token: string) => {
        this.token = token
        this.instance.defaults.headers.common.Authorization = token
    }

    public async getMe() {
        return this.get<User>('/users/me')
    }

    private async get<T>(url: string) {
        return this.doFetch<T>('get', url)
    }

    private async post<T>(url: string, data: any) {
        return this.doFetch<T>('post', url, data)
    }

    private async put<T>(url: string, data: any) {
        return this.doFetch<T>('put', url, data)
    }

    private async delete<T>(url: string) {
        return this.doFetch<T>('delete', url)
    }

    private async doFetch<T>(method: 'get' | 'post' | 'put' | 'delete', url: string, input?: any): Promise<T | void> {
        try {
            const { data } = await this.instance.request<T>({ method, url, data: input })
            return data
        } catch (e) {
            this.onError(e)
        }
    }

    private onError(e: any) {
        console.error(e)
    }
}
