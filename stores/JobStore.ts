import {createState, useState} from '@hookstate/core'

import TableStore from './TableStore'
import {local} from 'lib/api'
import DetailsStore from './DetailsStore'
import {associate} from 'lib/utils'
import Employees from '../pages/api/jobs/employees'
import CheckTableStore from './CheckTableStore'


class JobHandbookStore {
    private _data = createState<JobHandbook<number>>({
        positions: [],
        departments: [],
    })

    private _map = {
        positions: {},
        departments: {},
    }

    fetch = () =>
        local.jobs.handbook().then(h => {
            if (!('status' in h)) {
                this._map.positions = associate(h.positions)
                this._map.departments = associate(h.departments)

                this._data.set({
                    positions: h.positions.map(x => x.id),
                    departments: h.departments.map(x => x.id),
                })

                console.log(this._data.get(), this._map)
            }
        })

    get map () {
        return this._map
    }

    use = () => useState(this._data).get()
    get = (field: keyof EmployeeHandbook) => this._data.get()[field]


    get departments() {
        return this.get('departments')
    }

    get positions() {
        return this.get('positions')
    }


    static instance = new JobHandbookStore()
}


class JobDetailsStore extends DetailsStore<Job> {

    private constructor() {
        super({})
    }

    fetch (id: number) {
        local.jobs.details(id).then(x => {
            if (!('status' in x)) {
                this.set(x)
            }
        })
    }

    static instance = new JobDetailsStore()
}



class JobTableStore extends TableStore<{}, Job> implements SearchStore {

    private constructor() {
        super(local.jobs.list)
    }

    search (text: string) {

    }

    static instance = new JobTableStore()
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

    static instance = new EmployeeTableStore(local.jobs.employees)
}



class JobStore {
    static handbook = JobHandbookStore.instance
    static details = JobDetailsStore.instance
    static list = JobTableStore.instance
    static employees = EmployeeTableStore.instance
}

export default JobStore


//export const useOrganizations = (): State<OrganizationRow[]> => useState(state)


