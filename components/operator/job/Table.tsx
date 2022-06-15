import { useRouter } from 'next/router'

import * as ui from 'consta'
import * as store from 'stores'

import * as comp from 'components/index'

import * as access from '../access'



const columns: ui.TableColumn<Job<string>>[] = [
    {
        title: '№ группы барьеров',
        accessor: 'number',
        width: 200,
    },
    {
        title: 'Наименование',
        accessor: 'name',

    },
    {
        title: 'Состояние',
        accessor: 'access',
        renderCell: row => <access.Badge access={row.access} />
    },
    {
        title: 'Дочерняя организация',
        accessor: 'companyId',
        renderCell: row => store.company.all.map[row.companyId]?.name ?? ''
    },
    {
        title: '№ договора',
        accessor: 'contractNumber',
    },
]

/*
const filters: ui.TableFilters<store.ServiceRow> = [
    {
        id: 'status',
        name: 'Статус: ',
        field: 'status',
        filterer: () => true,
        component: {
            name: ui.TableTextFilter,
            props: {
                withSearch: true,
                items: status.list,
              },
        },
    },
]

*/



const Table = () => {

    const router = useRouter()

    return <ui.Card horizontalSpace='xl' verticalSpace='xl'>
        <ui.Grid cols='1' rowGap='m'>
            <comp.SearchToolbar placeholder='Наименование' store={store.job.list} />
            <comp.Table
                columns={columns}
                store={store.job.list}
                onRowClick={id => router.push(`${router.route}/job/${id}`)}
            />
        </ui.Grid>
    </ui.Card>
}

export default Table