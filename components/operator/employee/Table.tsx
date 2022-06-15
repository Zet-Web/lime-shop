import {useRouter} from 'next/router'


import {UniModal} from '.'

import * as comp from 'components'
import * as ui from 'consta'
import * as store from 'stores'

import {yesNo} from 'lib/convert'


import * as access from '../access'



type Column = ui.TableColumn<EmployeeDetails<string>>

const columns: Column[] = [
    {
        title: 'ФИО',
        accessor: 'name',
        width: 200,
        renderCell: row => <ui.User
            view='clear' size='s'
            name={row.name}
            withArrow={false} onlyAvatar={false}
        />
    },
    {
        title: 'Подразделение',
        accessor: 'departmentId',
        renderCell: row =>
            store.employee.handbook.map.departments[row.departmentId]
    },
    {
        title: 'УЕИГД',
        accessor: 'ueigd',
    },
    {
        title: 'Регион',
        accessor: 'regionId',
        renderCell: row =>
            store.employee.handbook.map.regions[row.regionId]
    },
    {
        title: 'Участвует в работах ГПН',
        accessor: 'used',
        renderCell: row => yesNo(row.used)
    },
    {
        title: 'Активность',
        accessor: 'isActive',
        renderCell: row => yesNo(row.isActive)
    },
    {
        title: 'Должность',
        accessor: 'positionId',
        renderCell: row =>
            store.employee.handbook.map.positions[row.positionId]
    },
]



const Table = () => {

    const router = useRouter()
    const model = store.employee.list

    const cols = store.employee.handbook.use().jobs.map(id => ({
        title: store.employee.handbook.map.jobs[id],
        accessor: ''+id,
        renderCell: row => access.icon[row.jobAccess.find(x => x.id == id)?.access!!]
    } as Column))

    return <ui.Card horizontalSpace='xl' verticalSpace='xl'>
        <ui.Grid cols='1' rowGap='m'>
            <comp.SearchToolbar placeholder='ФИО' store={model} />
            <comp.Table
                columns={[...columns, ...cols]} store={model}
                stickyColumns={1}
                onRowClick={id => router.push(`${router.route}/employee/${id}`)}
            />
            <UniModal />
        </ui.Grid>
    </ui.Card>
}

export default Table