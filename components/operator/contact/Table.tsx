import * as ui from 'consta'
import * as store from 'stores'
import * as icon from 'icons'

import * as comp from 'components'
import * as el from 'elements'

import {UniModal} from '.'

import {ModalType} from './UniModal'

import sty from 'styles/table.module.sass'


const columns: ui.TableColumn<Contact<string>>[] = [
    {
        title: 'ФИО',
        accessor: 'name',
        renderCell: row => <ui.User
            view='clear' size='s'
            name={row.name}
            withArrow={false} onlyAvatar={false}
        />
    },
    {
        title: 'Роль',
        accessor: 'roleId',
        renderCell: row => store.contact.handbook.map.roles[row.roleId]
    },
    {
        title: 'Должность',
        accessor: 'positionId',
        renderCell: row =>
            store.contact.handbook.map.positions[row.positionId]
    },
    {
        title: 'Email',
        accessor: 'email',
    },
    {
        title: 'Телефон',
        accessor: 'phone',
    },
    {
        title: '',
        accessor: 'id',
        width: 40,
        renderCell: (row) =>
            <el.button.Pen
                onClick={ _ => {
                    store.contact.details.set(row as unknown as Contact)
                    store.modal.edit<ModalType>('contact')
                }}
            />
    }
]

const Table = () => {

    const model = store.contact.list

    return <ui.Grid cols='1' rowGap='m'>
        <comp.Table
            className={sty.lastColumn}
            columns={columns}
            store={model}
        />
        <UniModal />
    </ui.Grid>
}

export default Table