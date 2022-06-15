import {roles, positions, fio} from './handbook'
import {rand, rnd} from 'lib/utils'
import {company} from 'data'


const create = (id): Contact => ({
    id,
    name: rand(fio),
    email: rnd() + '@mail.ru',
    phone: ''+rnd()%79999999,
    roleId: rand(roles).id,
    positionId: rand(positions).id,
})


export module contact {

    export const byCompany: Record<number, Contact[]> = company.list.reduce((a, c) => {
        a[c.id] = Array.from({length: 100}, (_, i) => create(i))
        return a
    }, {} as Record<number, Contact[]>)

    export const handbook: ContactHandbook = {
        roles,
        positions
    }
}
