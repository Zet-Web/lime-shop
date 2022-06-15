import {createElement, FC, ReactNode, useEffect} from 'react'

import {useState} from '@hookstate/core'

import { Tabs } from 'consta'

import sty from 'styles/privatepage.module.sass'



type Props<ID extends string> = {
    defaultTabId?: ID
    tabs?: TTab<ID>[]
    onTabChange?: (tabId: ID) => void
    items?: Record<ID, FC>
    children?: ReactNode
}


const PrivatePage = <ID extends string,>(p: Props<ID>) => {
    const isBrowser = typeof window != 'undefined'

    const tab = useState(
        p.tabs?.find(x => x.id == p.defaultTabId) ?? p.tabs?.[0]
    )

    const t = tab.get()

    useEffect(() => {
        t && p.onTabChange?.(t.id)
    }, [])

    return isBrowser
        ? <div className={sty.layout}>
            {p.tabs && <Tabs
                value={t}
                onChange={v => {
                    tab.set(v.value)
                    p.onTabChange?.(v.value.id)
                }}
                items={p.tabs}
                getLabel={item => item.label}
                view='clear'
                linePosition='left'
                className={sty.tab}
            />}
            <div className={sty.tabContent}>
                {p.items && t ? createElement(p.items[t.id]) : p.children}
            </div>
        </div>
        : <></>
}


export default PrivatePage