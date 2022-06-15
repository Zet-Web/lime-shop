import {createState, useState} from '@hookstate/core'
import CheckTableStore from './CheckTableStore'
import TableStore from './TableStore'
import {local} from 'lib/api'
import {associate} from 'lib/utils'
import DetailsStore from './DetailsStore'


type Map = {
    regions: Rec
    positions: Rec
    departments: Rec
    jobs: Rec
}

class EmployeeHandbookStore {
    private _data = createState<EmployeeHandbook<number>>({
        regions: [],
        positions: [],
        departments: [],
        jobs: []
    })

    private _map: Map = {
        regions: {},
        positions: {},
        departments: {},
        jobs: {}
    }

    fetch = () =>
        local.employees.handbook().then(h => {
            if (!('status' in h)) {
                this._map.regions = associate(h.regions)
                this._map.positions = associate(h.positions)
                this._map.departments = associate(h.departments)
                this._map.jobs = associate(h.jobs)

                this._data.set({
                    regions: h.regions.map(x => x.id),
                    positions: h.positions.map(x => x.id),
                    departments: h.departments.map(x => x.id),
                    jobs: h.jobs.map(x => x.id)
                })

                console.log(this._data.get(), this._map)
            }
        })

    get map () {
        return this._map
    }

    use = () => useState(this._data).get()
    get = (field: keyof EmployeeHandbook) => this._data.get()[field]

    get regions() {
        return this.get('regions')
    }

    get departments() {
        return this.get('departments')
    }

    get positions() {
        return this.get('positions')
    }

    get jobs() {
        return this.get('jobs')
    }

    static instance = new EmployeeHandbookStore()
}



class EmployeeTableStore extends CheckTableStore<req.Employee, EmployeeDetails> implements SearchStore {

    private constructor(api) {
        super(api)
    }

    search (text: string) {

    }

    override async fetch(req?: req.Employee) {
        const data = await super.fetch(req)
        this.isAllSelected = false
        return data
    }

    /*fetch (serviceId: string) {
        local.employee.list(serviceId).then(data => {
            if (data) {
                this._selected.set(new Array(Math.min(PAGE_SIZE, data.length)).fill(false))
                this.data = data!!
            }
        })
    }*/

    static all = new EmployeeTableStore(local.employees.list)
    static list = new EmployeeTableStore(local.employees.list)
}



export class JobsTableStore extends CheckTableStore<req.employee.Job, employee.Job> {

    private constructor(api) {
        super(api)
    }


    override async fetch(req?: req.employee.Job) {
        const data = await super.fetch(req)
        this.isAllSelected = false
        return data
    }

    static instance = new JobsTableStore(local.employees.jobs)
}



export class BarrierTableStore extends TableStore<req.employee.Barrier, employee.Barrier> {

    private constructor(api) {
        super(api)
    }


    static instance = new BarrierTableStore(local.employees.barriers)
}



class EmployeeDetailsStore extends DetailsStore<EmployeeDetails> {

    private constructor() {
        super({})
    }

    fetch (id: number) {
        local.employees.details(id).then(x => {
            if (!('status' in x)) {
                this.set(x)
                EmployeeStore.jobs.reload()
            }
        })
    }

    static instance = new EmployeeDetailsStore()
}


class EmployeeStore {
    static details = EmployeeDetailsStore.instance
    static all = EmployeeTableStore.all
    static list = EmployeeTableStore.list
    static jobs = JobsTableStore.instance
    static barriers = BarrierTableStore.instance
    static handbook = EmployeeHandbookStore.instance
}

export default EmployeeStore



