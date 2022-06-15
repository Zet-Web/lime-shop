import {get, post} from './fetch'


export module remote {
    const API = process.env.API

}

export module local {
    const API = path => (process.env.NEXTAUTH_URL ?? window.location.origin) + '/api/' + path

    const _get = async <R>(path, req = {}) =>
        await get<R>(API(path), {
            ...req
        })

    const _list = async <R>(path, req) =>
        await _get<resp.PagedList<R>>(path, req)

    const _post = async <R extends object | resp.Result = resp.Result>(path, req = {}) =>
        await post<R>(API(path), {
            ...req
        })

    export const login = async (role: Role) =>
        await _post('login', {role})

    export const logout = async () =>
        await _post('logout')

    export module company {
        export const all = async (req: req.Company) =>
            await _list<Company>('company/all', req)
        export const list = async (req: req.Company & req.Paging) =>
            await _list<Company>('company/list', req)
        export const details = async (id?: number) =>
            await _get<CompanyDetails>('company/details', { id })
        export const select = async (id?: number) =>
            await _post<CompanyDetails>('company/select', { id })

        export const save = async (req: CompanyDetails) =>
            await _post('company/save', req)
    }

    export module contracts {
        export const handbook = async () =>
            await _get<ContractHandbook>('contracts/handbook')
        export const list = async (req: req.Contract & req.Paging) =>
            await _list<Contract>('contracts/list', req)
        export const save = async (req: Contract) =>
            await _post<resp.Result>('contracts/save', req)
    }

    export module contacts {
        export const handbook = async () =>
            await _get<ContactHandbook>('contacts/handbook')

        export const list = async (req: req.Contact & req.Paging) =>
            await _list<Contact>('contacts/list', req)

        export const save = async (req: Contact) =>
            await _post('contacts/save', req)
    }

    export module operators {
        export const list = async (req: req.Operator & req.Paging) =>
            await _list<Operator>('operators/list', req)

        export const all = async (req: req.Operator) =>
            await _list<Operator>('operators/all', req)

        export const save = async (req: Operator) =>
            await _post('operators/save', req)
    }

    export module jobs {
        export const handbook = async () =>
            await _get<JobHandbook>('jobs/handbook')

        export const list = async (req: req.Paging) =>
            await _list<Job>('jobs/list', req)

        export const details = async (id?: number) =>
            await _get<Job>('jobs/details', { id })

        export const employees = async (req: req.Employee) =>
            await _get<job.Employee>('jobs/employees', req)
    }

    export module employees {
        export const handbook = async () =>
            await _get<EmployeeHandbook>('employees/handbook')

        export const list = async (req: req.Employee & req.Paging) =>
            await _list<EmployeeDetails>('employees/list', req)

        export const details = async (id?: number) =>
            await _get<EmployeeDetails>('employees/details', { id })

        export const jobs = async (req: req.employee.Job) =>
            await _get<employee.Job>('employees/jobs', req)

        export const barriers = async (req: req.employee.Barrier) =>
            await _get<employee.Barrier>('employees/barriers', req)

        export const save = async (req: EmployeeDetails) =>
            await _post('employees/save', req)
    }
}


export module remote {

    const API = path => `${process.env.API}/${path}`

    const _get = async <R>(path, req = {}) =>
        await get<R>(API(path), {
            ...req
        })

    const _list = async <R>(path, req) =>
        await _get<resp.PagedList<R>>(path, req)

    const _post = async <R extends object | resp.Result = resp.Result>(path, req = {}) =>
        await post<R>(API(path), {
            ...req
        })

    export module auth {
        export const status = async () =>
            await fetch(API('auth/status'), {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzN0Y2TVppLTgzZVpjRUhWWWg2cVpuZzZtSGFKY1NTbDNTR2dPVEhiOU5NIn0.eyJleHAiOjE2NDc3MjYxMDgsImlhdCI6MTY0NzcyNTgwOCwianRpIjoiYTRiM2E0OTItNmVlNy00Y2Q0LWEyNzgtNGFlYmEwNjExOWViIiwiaXNzIjoiaHR0cHM6Ly9zc28taXN1cGRycDIwLmFwcHMub2tkLWV4dC5kZXYubG9jYWwvYXV0aC9yZWFsbXMvaXN1cCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJjNGE0MWM3NC00MmQ1LTQyMzktOTIxZS1mMmY4MmEyNTU2YTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpc3VwLWZyb250Iiwic2Vzc2lvbl9zdGF0ZSI6IjVkZmRlNmYxLWRkNWItNDY3Ni04MjJkLTFkNDdkZmFhODlkMCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiY29vcmRpbmF0b3IiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.Yy5M5jz8siE2cMkXZHNG_jYY5JkItPfXyEQE4EcD_Spr1J26v3Vm6YxKN0vfYQJv0USgHzhsg9smY6Femysmi8Ye5X4fZIE6WPXpsZNLun-zftdh-f55It7lKA2RJeI3YpiIc-jLpVVMj1ecKSNIgyst59ABBgYcPkQ7vVa95geH6kgWdiYSe2b3Q_SQVgmjjTNbhmD62BQrDlmBn-5jfGOQL876YWVKF4dp-YAimg_u07sZVoOIZqMn5Zh64rNBySfBHH5IVGeyMuMfG_0BxPtqhu1BrzZVIsyPgZ7OyTryfr5fdS2u3mfO2DOQfBBTaNu0I3szI-bycWMKpIR-HA'
                },
                method: 'POST'
            })
    }
}