import { createState, useState } from '@hookstate/core'

type R = Rec<any>

type Api<REQ extends R, RESP> = (req: REQ & req.Paging) => Promise<resp.Result | resp.PagedList<RESP> | RESP[]>


const PAGE_SIZE = 5

abstract class TableStore<REQ extends R, RESP extends Id<ID>, ID = number> {
    private readonly _api: Api<REQ, RESP>
    private _req?: REQ
    protected _loading = false
    private _success = true

    protected _data = createState<RESP[]>([])
    private _page = createState(0)
    private _total = 0

    protected constructor(api: Api<REQ, RESP>) {
        this._api = api
        this._loading = true
    }

    usePage = () => useState(this._page).get()

    protected clearPage () {
        this._page.set(0)
    }

    set page(v) {
        this._page.set(v)
        this.reload()
    }

    useData = () => useState(this._data).get()

    set data(v) {
        this._data.set(v)
    }

    get total() {
        return this._total
    }

    async fetch(req?: REQ) {
        this._req = req

        // сначала обновляются поля до data
        this._loading = true
        this._total = 0
        this._data.set([])

        const res = await this._api({
            ...(req ?? {} as REQ),
            pageNum: this._page.get(),
            pageSize: PAGE_SIZE
        })

        this._success = true
        this._loading = false
        this._total = 0

        let data: RESP[] = []

        if ('total' in res) {
            this._total = res.total
            //await this.postFetch(res.data)
            data = res.data
        }
        else if (Array.isArray(res)) {
            this._total = res.length
            //await this.postFetch(res)
            data = res
        }
        else if (res.status == 'denied') {
            this._success = false
        }
        else if (res.status == 'error') {
            this._success = false
        }

        this._data.set(data)

        return this._data.get()
    }

    async reload() {
        while (true) {
            await this.fetch(this._req)
            const page = this._page
            if (this._data.length == 0 && page.get() > 0)
                page.set(x => x-1)
            else break
        }
    }

}


export default TableStore


