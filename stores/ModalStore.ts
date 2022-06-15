import {createState, useState} from '@hookstate/core'



type ModalState = {
    mode?: ModalMode
    id?: string
}


class ModalStore {

    private readonly id: number

    private constructor(name?: string) {
        this.id = Math.trunc(Math.random() * 100000)
        console.log(`ModalStore: name = ${name}, id = ${this.id}`)
    }

    private _state = createState<ModalState>({

    })

    useState = () => useState(this._state).get()


    opened = <ID extends string = string>(id?: ID) =>
        this._state.get().id == id

    add <ID extends string = string>(id?: ID) {
        this._state.set({ mode: 'add', id })
    }

    edit <ID extends string = string>(id?: ID) {
        this._state.set({ mode: 'edit', id })
    }

    close() {
        this._state.set({})
    }

    static instance = new ModalStore()

    private static _changeStatusInstance?: ModalStore
    static changeStatusInstance(): ModalStore {
        if (!ModalStore._changeStatusInstance) {
            ModalStore._changeStatusInstance = new ModalStore('changeStatus')
        }
        return ModalStore._changeStatusInstance!!
    }
}

export const changeStatusModal = ModalStore.changeStatusInstance

export default ModalStore.instance