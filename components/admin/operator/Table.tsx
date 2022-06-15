import * as ui from 'consta'
import * as store from 'stores'
import * as icon from 'icons'

import * as el from 'elements'
import * as comp from 'components'

import * as status from 'status'

import {UniModal, StatusBadge} from '.'


import sty from 'styles/table.module.sass'



const columns: ui.TableColumn<Operator<string>>[] = [
    {
        title: 'ФИО',
        accessor: 'name',
        renderCell: row =>
            <ui.User
                view='clear' size='s'
                name={row.name}
                withArrow={false} onlyAvatar={false}
            />
    },
    {
        title: 'Подрядная организация',
        accessor: 'orgs',
        renderCell: row =>
            row.orgs?.map(id => <>
                <ui.Tag key={id} mode='info' label={store.company.all.map[id].name} />&nbsp;&nbsp;
            </>)
    },
    {
        title: 'Статус',
        accessor: 'isActive',
        sortable: true,
        renderCell: row => <StatusBadge isActive={row.isActive} />,
    },
    {
        title: '',
        accessor: 'id',
        width: 40,
        renderCell: row =>
            <el.button.Pen
                onClick={_ => {
                    store.operator.details.set(row as unknown as Operator)
                    store.modal.edit()
                }}
            />
    }
]


const filters: ui.TableFilters<Operator<string>> = [
    {
        id: 'status',
        name: 'Статус: ',
        field: 'isActive',
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





const Table = () => {

    return <ui.Card horizontalSpace='xl' verticalSpace='xl'>
        <ui.Grid cols='1' rowGap='m'>
            <comp.SearchToolbar placeholder='ФИО' store={store.operator.list} />
            <comp.Table
                className={sty.lastColumn}
                filters={filters} columns={columns}
                store={store.operator.list}
            />
        </ui.Grid>

        <UniModal />
    </ui.Card>
}

export default Table