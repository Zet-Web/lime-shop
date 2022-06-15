import {jobs} from './handbook'

export module contract {
    export const byCompany: Contract[] = [
        {
            id: 111,
            date: '2023-02-22',
            number: '1112222',
            name: 'Консалт_111',
            jobIds: [1, 2],
            companyId: 1
        },
        {
            id: 112,
            date: '2023-02-22',
            number: '1122222',
            name: 'Консалт_112',
            jobIds: [1, 5],
            companyId: 2
        },
        {
            id: 113,
            date: '2023-02-22',
            number: '1132222',
            name: 'Консалт_113',
            jobIds: [2,5],
            companyId: 3
        },
        {
            id: 114,
            date: '2023-02-22',
            number: '1142222',
            name: 'Консалт_114',
            jobIds: [4],
            companyId: 4
        },
        {
            id: 115,
            date: '2023-02-22',
            number: '1142222',
            name: 'Консалт_115',
            jobIds: [2,3],
            companyId: 5
        },
        {
            id: 116,
            date: '2023-02-22',
            number: '1142222',
            name: 'Консалт_116',
            jobIds: [3,4],
            companyId: 6
        },
    ]

    export const list: Record<number, Contract[]> = {
        1: [
            byCompany[0], byCompany[1], byCompany[2], byCompany[3], byCompany[4], byCompany[5]
        ]
    }

    export const handbook: ContractHandbook = {
        jobs
    }
}
