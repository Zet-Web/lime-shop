module req {
    interface Paging {
        pageNum: number
        pageSize: number
    }



    interface Company {
        searchText?: string
        isActive?: boolean
    }

    interface Contract {
        companyId?: number
    }

    interface Contact {
        companyId?: number
    }

    interface Employee {
        jobId: number
    }

    module employee {
        interface Job {
            employeeId: number
        }

        interface Barrier {
            employeeId: number
        }
    }

    interface Operator {
        companyId?: number
    }
}