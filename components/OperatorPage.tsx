import {createState, State, useState} from '@hookstate/core'
import PrivatePage from './PrivatePage'
import {FC, useEffect} from 'react'
import * as store from '../stores'


type TabId = 'main' | 'services' | 'employees' | 'vehicles'
type Tab = TTab<TabId>


export const tabs: Tab[] = [
    { label: 'Главная', id: 'main' },
    { label: 'Виды работ', id: 'services' },
    { label: 'Сотрудники', id: 'employees' },
    { label: 'Транспортные средства', id: 'vehicles' }
]


const currTab = createState<Tab>(tabs[0])

export const useTab = (): State<Tab> => useState(currTab)


const OperatorPage: FC = p => {

    const tab = useTab()
    const t = tab.get()

    useEffect(() => {
        if (t.id == 'main')
            store.company.list.fetch()
    }, [t.id])

    return <PrivatePage>
        {p.children}
    </PrivatePage>
}

export default OperatorPage