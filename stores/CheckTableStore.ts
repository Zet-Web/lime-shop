import { createState, useState } from '@hookstate/core'
import TableStore from './TableStore'
import {array} from '../lib/utils'

type R = Rec<any>

type Api<REQ extends R, RESP> = (req: REQ & req.Paging) => Promise<resp.Result | resp.PagedList<RESP> | RESP[]>




abstract class CheckTableStore<REQ extends R, RESP extends Id<ID>, ID = number> extends TableStore<REQ, RESP, ID> {
    private _selected = createState<boolean[]>([false])

    protected constructor(api) {
        super(api)
    }

    useSelected = () => useState(this._selected).get()

    useCountSelected = () => this.useSelected().reduce((sum, b) => b ? sum + 1 : sum, 0)

    useSelectedType = (): 'all' | 'any' | undefined => {
        const selected = this.useSelected()
        return selected.length > 0
            ? selected.every(x => x)
                ? 'all'
                : selected.some(x => x) ? 'any' : undefined
            : undefined
    }

    private findSelected = (id: number) =>
        this._selected[this._data.get().findIndex(x => x.id as unknown as number == id)]

    useSelectedById = (id: number) =>
        useState(this.findSelected(id))?.get() || false

    invertSelect (id: number) {
        this.findSelected(id).set(x => !x)
    }

    get isAllSelected () {
        return this._selected.get().every(x => x)
    }

    set isAllSelected(v) {
        this._selected.set(array(this._data.get().length, v))
    }
}


export default CheckTableStore


