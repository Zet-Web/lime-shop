import {createState, State, useState} from '@hookstate/core'
import {DefaultValues} from 'react-hook-form/dist/types/form'


abstract class DetailsStore<T extends Id> implements Store {

    private readonly _def: DefaultValues<T>
    private readonly _curr: State<DefaultValues<T>>

    protected constructor(def: DefaultValues<T>) {
        this._curr = createState(def)
        this._def = def
    }

    use = () => useState(this._curr).get()

    get() {
        return this._curr.get()
    }

    set(v: DefaultValues<T>) {
        this._curr.set(v)
    }

    reset() {
        this.set(this._def)
    }

    abstract fetch(id: number)

    reload() {
        this.fetch(this.get().id!!)
    }
}

export default DetailsStore