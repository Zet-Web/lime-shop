import {UniModal} from '.'

import * as ui from 'consta'
import * as store from 'stores'


import * as comp from 'components'
import * as el from 'elements'

import {ModalType} from './UniModal'

import sty from 'styles/admin/contract.module.sass'





const columns: ui.TableColumn<Contract<string>>[] = [
    {
        title: '№',
        accessor: 'number',
        width: 80,
    },
    {
        title: 'Дата',
        accessor: 'date',
        width: 110,
    },
    {
        title: 'Наименование',
        accessor: 'name',
        width: 150,
    },
    {
        title: 'Дочерние организации',
        accessor: 'companyId',
        width: 150,
        renderCell: row =>
            store.company.all.map[row.companyId]?.name ?? ''
    },
    {
        title: 'Виды работ',
        accessor: 'jobIds',
        renderCell: row => <>
            {row.jobIds.map(id => <>
                <ui.Tag
                    key={id} mode='info' size='s'
                    label={store.contract.handbook.map.jobs[id]}
                />
                &nbsp;
            </>)}
        </>
    },
    {
        title: '',
        accessor: 'id',
        renderCell: (row) =>
            <el.button.Pen
                onClick={_ => {
                    store.contract.details.set(row as unknown as Contract)
                    store.modal.edit<ModalType>('contract')}
                }
            />
    }
]

const Table = () => {
    const model = store.contract.list
//console.log('data', store.contract.data)
    return <ui.Grid cols='1' rowGap='m'>
        <comp.Table
            className={sty.table}
            columns={columns} store={model}
        />
        <UniModal />
    </ui.Grid>
}

export default Table