import {createState, useState} from '@hookstate/core'

import {local} from 'lib/api'
import {associate} from 'lib/utils'
import TableStore from './TableStore'
import DetailsStore from './DetailsStore'



class ContractHandbookStore {
    private _data = createState<ContractHandbook<number>>({
        jobs: []
    })

    private _map = {
        jobs: {}
    }

    fetch = () =>
        local.contracts.handbook().then(h => {
            if (!('status' in h)) {
                this._map.jobs = associate(h.jobs)

                this._data.set({
                    jobs: h.jobs.map(x => x.id)
                })

                console.log(this._data.get(), this._map)
            }
        })

    get map () {
        return this._map
    }

    use = () => useState(this._data).get()
    get = (field: keyof ContractHandbook) => this._data.get()[field]

    get jobs() {
        return this.get('jobs')
    }

    static instance = new ContractHandbookStore()
}



class ContractDetailsStore extends DetailsStore<Contract> {

    private constructor() {
        super({
            jobIds: []
        })
    }

    static instance = new ContractDetailsStore()

    fetch(id: number) {
    }
}


class ContractTableStore extends TableStore<req.Contract, Contract> {

    private constructor(api) {
        super(api)
    }

    async save() {
        //await local.contracts.save(this._curr.get())
    }

    static list = new ContractTableStore(local.contracts.list)
}


class ContractStore {
    static handbook = ContractHandbookStore.instance
    static list = ContractTableStore.list
    static details = ContractDetailsStore.instance
}

export default ContractStore

