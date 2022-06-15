import {ReactNode} from 'react'
import * as comp from 'components/index'

import * as ui from 'consta'
import * as store from 'stores'
import * as icon from 'icons'


import {Button, Text} from 'consta'

import sty from 'styles/table.module.sass'
import jobSty from 'styles/operator/job.module.sass'


const model = store.job.employees


const SelectedToolbar = () => {
    const countSelected = model.useCountSelected()

    return <div className={jobSty.selectedToolbar}>
        <Text size='s' view='secondary'>Выбрано {countSelected}</Text>
        <div>
            <Button
                view='secondary' size='s' iconLeft={icon.Remove}
                disabled={countSelected == 0}
                label='Отменить подписку'
            />&nbsp;&nbsp;
            <Button
                view='secondary' size='s' iconLeft={icon.Check}
                disabled={countSelected == 0}
                label='Подписать'
            />
        </div>
    </div>
}


const accessIcon: Record<EmployeeAccess, ReactNode> = {
    allowed: <icon.Check size='s' view='success' />,
    restricted: <icon.Warning size='s' view='warning' />,
    denied: <icon.Close size='s' view='alert' />,
}



const TitleCheckbox = () => {
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
        checked={model.useSelectedById(p.id)}
        onChange={_ => model.invertSelect(p.id)}
    />


const columns: ui.TableColumn<Employee<string>>[] = [
    {
        title: <TitleCheckbox/>,
        accessor: 'id',
        width: 40,
        renderCell: e => <RowCheckbox id={e.id as unknown as number}/>,
    },
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
        title: 'Подразделение',
        accessor: 'departmentId',
        width: 300,
        renderCell: row =>
            store.job.handbook.map.departments[row.departmentId]
    },
    {
        title: 'Должность',
        accessor: 'positionId',
        width: 300,
        renderCell: row =>
            store.job.handbook.map.positions[row.positionId]
    },
    {
        title: 'Подписка',
        accessor: 'subscribed',
        width: 100,
        renderCell: (row) => row.subscribed ? 'да' : 'нет'
    },
    {
        title: 'Допуск',
        accessor: 'access',
        align: 'right',
        width: 100,
        renderCell: (row) => accessIcon[row.access]
    }
]



const Table = () => {
    return <>
        <SelectedToolbar />
        <comp.Table
            className={sty.lastColumn}
            columns={columns}
            store={model}
        />
    </>
}

export default Table