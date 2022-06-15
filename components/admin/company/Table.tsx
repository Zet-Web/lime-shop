import { useRouter } from 'next/router'

import * as comp from 'components'
import * as ui from 'consta'
import * as store from 'stores'

import * as status from 'status'


import {AddModal} from '.'



const columns: ui.TableColumn<Company<string>>[] = [
    {
        title: 'ИНН',
        accessor: 'inn',
    },
    {
        title: 'Наименование',
        accessor: 'name',
    },
    {
        title: 'Статус',
        accessor: 'isActive',
        sortable: true,
        renderCell: row =>
            <comp.common.StatusBadge isActive={row.isActive} />,
    },
]


const filters: ui.TableFilters<Company> = [
    {
        id: 'isActive',
        name: 'Статус: ',
        field: 'isActive',
        filterer: () => true,
        component: {
            name: ui.TableTextFilter,
            props: {
                items: status.list,
              },
        },
    },
]





const Table = () => {

    const router = useRouter()

    const model = store.company.list

    return <ui.Card horizontalSpace='xl' verticalSpace='xl'>
        <ui.Grid cols='1' rowGap='m'>
            <comp.SearchToolbar placeholder='ИНН или наименование' store={store.company.list} />
            <ui.Table
                borderBetweenRows
                columns={columns}
                rows={model.useData()}
                filters={filters}
                size='l'
                onRowClick={x => router.push(`/${router.route}/company/${x.id}`)}
                onFiltersUpdated={f => {
                    model.filter(f.isActive?.value?.map(x => x.value))
                }}
            />
            <ui.Pagination
                currentPage={model.usePage()}
                totalPages={model.total}
                onChange={v => model.page = v}
                size='s'
                position='left'
            />
            <AddModal />
        </ui.Grid>
    </ui.Card>
}

export default Table