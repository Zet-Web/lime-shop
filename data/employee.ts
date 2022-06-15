import {regions, positions, departments, jobs, fio} from './handbook'
import {randomInt, randomUUID} from 'crypto'
import {rand, randBool, randomDate} from 'lib/utils'
import {company} from './company'

const emplAccesses: EmployeeAccess[] = ['allowed', 'denied', 'restricted']




export module employee {

    const create = (id): EmployeeDetails => ({
        id,
        name: rand(fio),
        birthDate: randomDate().toISOString(),
        positionId: rand(positions).id,
        departmentId: rand(departments).id,
        subscribed: randBool(),
        access: rand(emplAccesses),
        ueigd: randomUUID(),
        regionId: rand(regions).id,
        isActive: randBool(),
        used: randBool(),
        jobIds: [],
        jobAccess: []
    })

    export const byCompany: Record<number, EmployeeDetails[]> =
        company.list.reduce(
            (j, c, i) => ({
                ...j, [c.id]: Array.from({length: randomInt(5, 20)}, (_, id) => create(id+1))
            }),
            {} as Record<number, EmployeeDetails[]>
        )

    export const byCompanyAndJob: Rec<Rec<Employee[]>> = {
        '1': {
            '11': byCompany['1']
        }
    }


    export const handbook: EmployeeHandbook = {
        regions,
        positions,
        departments,
        jobs
    }

}
