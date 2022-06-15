module resp {

    type Status = 'ok' | 'denied' | 'error'

    interface Result {
        status: Status
    }

    interface PagedList<T> {
        total: number
        data: T[]
    }

    interface EmployeeHandbook {
        regions: IdName[]
        positions: IdName[]
        departments: IdName[]
        jobs: IdName[]
    }
}