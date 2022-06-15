
import {randBool, rnd} from 'lib/utils'
import {companies} from './handbook'


export module company {

    // для таблицы
    export const list: Company[] = companies.map(x => ({
        ...x,
        inn: ''+Math.trunc(rnd()),
        isActive: randBool()
    }))

    // для карточки
    export const details = list.reduce((a, i) => {
        const n: CompanyDetails = {
            ...i,
            address: '191100, Россия, г. Санкт-Петербург, Невский пр., 566/4, лит. А',
            operators: []
        }
        a[i.id] = n
        return a
    }, {} as Record<number, CompanyDetails>)
}




