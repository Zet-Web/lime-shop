import {company, employee} from '.'
import {rand, unique} from 'lib/utils'
import {departments, jobs, positions, regions} from './handbook'

const jobAccesses: JobAccess[] = ['accepted', 'waitlisted', 'rejected']

export module job {

    const create = (id: number, companyId: number) => ({
        id: id,
        number: '11' + id,
        name: jobs[id-1].name,
        companyId,
        access: rand(jobAccesses),
        contractNumber: '88811' + id
    }) as Job

    export const byCompany: Record<number, Job[]> =
        company.list.reduce((res, c) => {
            //console.log('employee', JSON.stringify(employee.byCompany))

            res[c.id] = Array.from({length: jobs.length}, (_, id) => create(id+1, c.id))

            employee.byCompany[c.id].forEach(e => {
                const ids = jobs.map(_ => rand(res[c.id]).id)
                e.jobIds = unique (ids)
                console.log('ids', ids)

                e.jobAccess = e.jobIds
                    .map(id => ({id, access: rand(jobAccesses)}))
            })

            return res
        }, {} as Record<number, Job[]>
    )


    export const handbook: EmployeeHandbook = {
        regions,
        positions,
        departments,
        jobs
    }
}
