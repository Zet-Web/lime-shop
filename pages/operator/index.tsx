import React, {FC} from 'react'
import type { NextPage } from 'next'

import { Grid, GridItem, Text } from 'consta'

import * as comp from 'components'
import * as operator from 'components/operator'
import * as common from 'components/common'
import * as el from 'elements'


import * as store from 'stores'
import * as icon from 'icons'
import * as ui from 'consta'

import {withSessionPrivateSsr} from 'lib/withSession'



type TabId = 'main' | 'jobs' | 'employees' | 'vehicles' | 'reports'
type Tab = TTab<TabId>


export const tabs: Tab[] = [
    { label: 'Главная', id: 'main' },
    { label: 'Виды работ', id: 'jobs' },
    { label: 'Сотрудники', id: 'employees' },
    { label: 'Транспортные средства', id: 'vehicles' },
    { label: 'Аналитические отчеты', id: 'reports' }
]


const Main = () =>
    <Grid cols='4' rowGap='xl' colGap='l'>
        <GridItem colStart='1' col='1'>
            <common.company.Card>
                <common.company.EditModal />
            </common.company.Card>
        </GridItem>

        <GridItem colStart='2' col='3'>
            <ui.Card horizontalSpace='xl' verticalSpace='xl'>
                <Grid cols='1' rowGap='l'>
                    <el.Flexbox justify='space-between' width='100%'>
                        <Text size='xl'>Основные контакты</Text>
                        <el.Flexbox>
                            <el.button.Add />&nbsp;&nbsp;
                            <el.button.Download onClick={_ => null} />
                        </el.Flexbox>
                    </el.Flexbox>
                    <operator.contact.Table />
                </Grid>
            </ui.Card>
        </GridItem>
    </Grid>


const Jobs = () =>
    <Grid cols='1' rowGap='xl'>
        <el.Flexbox justify='space-between'>
            <Text size='2xl'>Назначенные виды работ</Text>
            <el.button.Download onClick={_ => null} />
        </el.Flexbox>
        <operator.job.Table />
    </Grid>


const Employees = () =>
    <Grid cols='1' rowGap='xl'>
        <el.Flexbox justify='space-between'>
            <Text size='2xl'>Сотрудники</Text>
            <div>
                <el.button.Icon iconLeft={icon.Settings} onClick={_ => null} />&nbsp;&nbsp;
                <el.button.Download onClick={_ => null} />&nbsp;&nbsp;
                <el.button.Add />
            </div>
        </el.Flexbox>
        <operator.employee.Table />
    </Grid>


const tabContent: Record<TabId, FC> = {
    main: Main,
    jobs: Jobs,
    employees: Employees,
    vehicles: Jobs,
    reports: Jobs
}



type Props = {
    user: User
    companyId: number
    tabId: TabId
}


const CompanyPage: NextPage<Props> = p => {

    return <comp.PrivatePage
        defaultTabId={p.tabId}
        tabs={tabs}
        items={tabContent}
        onTabChange={tabId => {
            console.log('tabchange', tabId)
            switch (tabId) {
                case 'main': {
                    store.contact.handbook.fetch().then(_ => {
                        store.company.details.fetch(p.companyId)
                        store.operator.all.fetch()
                        store.contact.list.fetch()
                    })
                    break
                }
                case 'jobs': {
                    store.company.all.fetch().then(_ =>
                        store.job.list.fetch()
                    )
                    break
                }
                case 'employees': {
                    store.employee.handbook.fetch().then(_ =>
                        store.employee.list.fetch()
                    )
                    break
                }
            }
        }}
    />
}

export default CompanyPage




export const getServerSideProps = withSessionPrivateSsr<Props>(
    async ({req, query}, user) => {
        const tabId = query.tab as TabId ?? 'main'
        const companyId = parseInt(req.session.companyId!!)
        return companyId
            ? {
                props: { user, companyId, tabId }
            }
            : {
                redirect: {
                    destination: '/operator/select',
                    permanent: false
                }
            }
    },
    'operator'
)
