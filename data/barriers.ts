import {company} from './company'
import {departments, jobs, positions, regions} from './handbook'

export module barrier {

    export const byCompany: Record<number, employee.Barrier[]> = company.list.reduce((a, c) => {
        a[c.id] = Array.from({length: 100}, (_, id) => ({
            id,
            number: '11' + id,
            name: 'Диплом ' + id,
            status: 'ok',
            comment: 'no comment'
        }) as employee.Barrier)
        return a
    }, {} as Record<number, employee.Barrier[]>)


    export const handbook: EmployeeHandbook = {
        regions,
        positions,
        departments,
        jobs
    }
}
