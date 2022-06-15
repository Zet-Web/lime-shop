import {useRouter} from 'next/router'


import * as ui from 'consta'
import * as store from 'stores'

import * as access from '../../access'


import sty from 'styles/operator/employee.module.sass'



const TitleCheckbox = () => {
    const model = store.employee.jobs
    const sel = model.useSelectedType()

    return <ui.Checkbox
        size='m'
        checked={sel == 'all'}
        intermediate={sel == 'any'}
        onChange={_ => model.isAllSelected = !model.isAllSelected}
    />
}


const RowCheckbox = (p: {id: number}) =>
    <ui.Checkbox
        size='m'
        checked={store.employee.jobs.useSelectedById(p.id)}
        onChange={_ => store.employee.jobs.invertSelect(p.id)}
    />



const columns: ui.TableColumn<employee.Job<string>>[] = [
    {
        title: <TitleCheckbox/>,
        accessor: 'id',
        width: 40,
        renderCell: row => <RowCheckbox id={row.id as unknown as number}/>,
    },
    {
        title: 'Наименование вида работ',
        accessor: 'id',
        renderCell: row => store.employee.handbook.map.jobs[row.id]!!
    },
    {
        title: 'Допуск',
        accessor: 'access',
        renderCell: row => <access.Badge access={row.access} />
    },
    {
        title: '№ группы барьеров',
        accessor: 'number',
        width: 200
    }
]



const Table = () => {

    const router = useRouter()
    const model = store.employee.jobs

    return <>
        <ui.Table
            borderBetweenRows
            className={sty.table}
            columns={columns}
            rows={model.useData() as (Job & ui.TableRow)[]}
            size='l'
            stickyHeader
            lazyLoad={{
                maxVisibleRows: 5
            }}
            //onRowClick={e => p.onRowClick?.(e.id as unknown as number)}
        />
        {/*<AddModal />*/}
    </>
}

export default Table