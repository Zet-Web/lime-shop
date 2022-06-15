import * as ui from 'consta'
import * as store from 'stores'
import * as barrier from '../../barrier'

import sty from 'styles/operator/employee.module.sass'




const columns: ui.TableColumn<employee.Barrier<string>>[] = [
    {
        title: '№ группы барьеров',
        accessor: 'number',
        width: 200
    },
    {
        title: 'Наименование',
        accessor: 'name',
    },
    {
        title: 'Статус',
        accessor: 'status',
        width: 150,
        renderCell: row => <barrier.Badge status={row.status} />
    },{
        title: 'Комментарий',
        accessor: 'comment',
    },
]



const BarrierTable = () => {

    const model = store.employee.barriers

    return <>
        <ui.Table
            borderBetweenRows
            className={sty.table}
            columns={columns}
            rows={model.useData() as (employee.Barrier & ui.TableRow)[]}
            size='l'
            stickyHeader
        />
    </>
}

export default BarrierTable