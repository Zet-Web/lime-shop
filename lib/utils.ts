
export const paging = (q: Rec) =>
    [ parseInt(q.pageNum), parseInt(q.pageSize) ]

export const page = <T>(data: T[], num, size) => {
    const n = parseInt(num)
    const s = parseInt(size)
    const start = n * s
    return data.slice(start, start + s)
}

export const total = (size: number, pageSize: number) =>
    Math.trunc(size / pageSize) + (size % pageSize > 0 ? 1 : 0)



export const array = <V>(len: number, init: V) =>
    new Array(len).fill(init)


export const associate = <T extends IdName>(list: T[], field: (keyof T)|null = 'name'): Record<number, T | any> =>
    list.reduce((a, v) => ({ ...a, [v.id]: field ? v[field] : v}), {})

export const unique = <T,>(arr: T[]) => arr.filter(
    (value, index, arr: T[]) => arr.indexOf(value) === index
)



const MAX_POW = Math.pow(10, 15)

export const rnd = () => Math.round(Math.random() * MAX_POW)

export const randBool = () => Math.round(Math.random()) == 1

export const rand = <T = IdName>(arr: T[]): T => {
    const index = (rnd() % arr.length) ?? 0

    return arr[index]
}

export function randomDate () {
    const start = new Date(1960, 0, 1)
    const end = new Date()
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

