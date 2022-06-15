import {rand, randBool, rnd} from 'lib/utils'
import {companies, fio, positions, roles} from './handbook'
import {company} from '.'


export module operator {

    export const list: Operator[] = Array.from({length: 100}, (_, id) => ({
        id,
        name: rand(fio),
        email: rnd() + '@mail.ru',
        isActive: randBool(),
        orgs: []
    }))

    company.list.forEach(c => {
        company.details[c.id].operators = Array.from(
            {length: Math.trunc(rnd() % 10) || 1},
            _ => {
                const o = rand(list)
                o.orgs.push(c.id)
                return o.id
            }
        )
    })

    list.forEach(o => {
        if (!o.orgs.length) {
            o.orgs = Array.from(
                {length: Math.trunc(rnd() % 20) || 1},
                _ => {
                    const c = rand(company.list)
                    company.details[c.id].operators.push(o.id)
                    return c.id
                }
            )
        }
    })

    company.list.forEach(c => {
        company.details[c.id].operators = company.details[c.id].operators.filter(
            (value, index, self) => self.indexOf(value) === index
        )
    })
}


