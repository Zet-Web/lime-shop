type ValueOf<T> = T[keyof T]
type Rec<R = string> = Record<string, R>


type JobAccess = 'accepted' | 'waitlisted' | 'rejected'
type BarrierStatus = 'ok'

interface SearchStore {
    search: (text: string) => void
}

interface Id<ID = number> {
    id: ID
}

interface IdName<ID = number> extends Id<ID> {
    name: string
}

interface Operator<ID = number> extends IdName<ID> {
    email: string
    isActive: boolean
    orgs: IdName[] | number[]
}

interface Contract<ID = number> extends IdName<ID> {
    number: string
    date: string
    companyId: number
    jobIds: number[]
}

interface ContractHandbook<T = IdName> {
    jobs: T[]
}

interface Contact<ID = number> extends IdName<ID> {
    roleId: number
    positionId: number
    email: string
    phone: string
}

interface ContactHandbook<T = IdName> {
    roles: T[]
    positions: T[]
}

interface Job<ID = number> extends IdName<ID> {
    number: string
    companyId: number
    access: JobAccess
    contractNumber: string
}

module job {
    interface Employee<ID = number> extends IdName<ID> {
        departmentId: number
        positionId: number
        subscribed: boolean
        access: EmployeeAccess
    }

}

module employee {
    interface Job<ID = number> extends Id<ID> {
        number: string
        access: JobAccess
    }

    interface Barrier<ID = number> extends IdName<ID> {
        number: string
        status: BarrierStatus
        comment: string
    }
}

interface Company<ID = number> extends IdName<T> {
    inn: string
    isActive: boolean
}


interface CompanyDetails extends Company {
    address: string
    // для создания/редактирования
    operators: number[]
}


type TTab<ID> = {
    id: ID
    label: string
}


type EmployeeAccess = 'allowed' | 'denied' | 'restricted'


interface Employee<ID = number> extends IdName<ID> {
    departmentId: number
    positionId: number
    subscribed: boolean
    access: EmployeeAccess
}



interface EmployeeDetails<ID = number> extends Employee<ID> {
    birthDate: string
    ueigd: string
    regionId: number
    isActive: boolean
    used: boolean
    jobIds: number[]
    jobAccess: {
        id: number
        access: JobAccess
    }[]
}

interface EmployeeHandbook<T = IdName> {
    regions: T[]
    positions: T[]
    departments: T[]
    jobs: T[]
}


interface JobHandbook<T = IdName> {
    positions: T[]
    departments: T[]
}



interface Store {
    reload()
}



type ModalMode = 'add' | 'edit'