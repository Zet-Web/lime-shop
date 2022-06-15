import {local} from 'lib/api'
import {createState, useState} from '@hookstate/core'

const statusMessage: Record<resp.Status, string> = {
    ok: 'успешно',
    denied: 'отказано',
    error: 'ошибка'
}

class AuthStore {
    private _user = createState<User|null>(null)
    private _error = createState('')
    private _company = createState<Company|null>(null)

    private constructor() {
    }

    useError = () => useState(this._error).get()
    set error(v) {
        this._error.set(v)
    }

    useUser = () => useState(this._user).get()

    set user(v) {
        this._user.set(v)
    }

    useCompany = () => useState(this._company).get()

    set company (v: Company) {
        this._company.set(v)
    }

    selectCompany(id?: number) {
        local.company.select(id)
    }

    login (role: Role) {
        local.login(role).then(x => {
            /*const st = x?.status ?? 'error'
            if (st == 'ok')
                //window.location.href = '/'
                null
            else this.error = `Не удалось авторизоваться: ${statusMessage[st]}`*/
        })
    }

    logout () {
        local.logout().then(x => {
            /*const st = x?.status ?? 'error'
            if (st == 'ok')
                //window.location.href = '/login'
                null
            else this._error.set(`Не удалось выйти: ${statusMessage[st]}`)*/
        })
    }

    static instance = new AuthStore()
}


export default AuthStore.instance