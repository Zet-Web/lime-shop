import { createState, useState } from '@hookstate/core'
import {associate} from 'lib/utils'

type R = Rec<any>

type Api<REQ extends R, RESP> = (req: REQ) => Promise<resp.Result | RESP[]>



abstract class ListStore<REQ extends R, RESP extends IdName> {
    private readonly _api: Api<REQ, RESP>
    private _req?: REQ
    protected _loading = false
    private _success = true

    protected _ids = createState<number[]>([])
    private _map = {} as Record<number, RESP>

    protected constructor(api: Api<REQ, RESP>) {
        this._api = api
        this._loading = true
    }

    get map() {
        return this._map
    }

    useIds = () => useState(this._ids).get()

    set data(v) {
        this._ids.set(v)
    }

    async fetch(req?: REQ) {
        this._req = req

        // сначала обновляются поля до data
        this._loading = true
        this._ids.set([])

        const res = await this._api({
            ...(req ?? {} as REQ)
        })

        this._success = true
        this._loading = false

        let data: number[] = []

        if (Array.isArray(res)) {
            data = res.map(x => x.id)
            this._map = associate(res, null)
        }
        else if (res.status == 'denied') {
            this._success = false
        }
        else if (res.status == 'error') {
            this._success = false
        }

        this._ids.set(data)
    }

}


export default ListStore


