import {createElement, FC, useEffect} from 'react'
import {useState} from '@hookstate/core'

import { NextPage } from 'next'

import * as comp from 'components'
import * as el from 'elements'
import * as operator from 'components/operator'
import * as ui from 'consta'


import * as store from 'stores'


import {Grid, GridItem, Text} from 'consta'
import {withSessionPrivateSsr} from 'lib/withSession'



type TabId = 'jobs' | 'health' | 'learn'

type Tab = {
    label: string,
    id: TabId
}

const tabs: Tab[] = [
    {
        label: 'Виды работ',
        id: 'jobs'
    },
    {
        label: 'Здоровье',
        id: 'health'
    },
    {
        label: 'Обучение',
        id: 'learn'
    }
]




const Jobs = () => {
    const countSelected = store.employee.jobs.useCountSelected()

    return <>
        <el.Flexbox justify='space-between' width='100%'>
            <Text size='xl'>Назначенные виды работ</Text>
            <ui.Button
                view='secondary' size='s'
                disabled={countSelected == 0}
                label='Запросить проверку'
                onClick={_ => null}
            />
        </el.Flexbox>
        <operator.employee.job.Table/>

        <el.Flexbox justify='space-between' width='100%'>
            <Text size='xl'>Барьеры</Text>

        </el.Flexbox>
        <operator.employee.job.BarrierTable />
    </>
}

const tabContent: Record<TabId, FC> = {
    jobs: Jobs,
    health: Jobs,
    learn: Jobs
}



const TabContent = () => {
    const tab = useState<Tab>(tabs[0])

    return <Grid cols='1' rowGap='l'>
        <ui.ChoiceGroup
            view='ghost' size='s'
            items={tabs}
            getLabel={x => x.label}
            name='item'
            style={{ width: 'fit-content' }}
            value={tab.get()}
            onChange={e => tab.set(e.value)}
        />
        {
            createElement(tabContent[tab.get().id])
        }
    </Grid>
}



const Breadcrumbs = () => {
    const name = store.employee.details.use().name

    return <ui.Breadcrumbs
        pages={[
            {
                label: 'Сотрудники',
                link: '/operator?tab=employees'
            },
            {
                active: true,
                label: name,
                link: ''
            }
        ]}
        getIsActive={x => !!x.active}
        getLabel={x => x.label}
        getLink={x => x.link}
        size='s'
    />
}




type Props = {
    employeeId: number
}


const JobPage: NextPage<Props> = p => {

    useEffect(() => {
        store.employee.handbook.fetch().then(x => {
            store.company.all.fetch().then(x =>
                store.employee.details.fetch(p.employeeId)
            )
            store.employee.jobs.fetch({employeeId: p.employeeId})
            store.employee.barriers.fetch({employeeId: p.employeeId})
        })

    }, [])



    return <comp.PrivatePage>
        <Grid cols='4' rowGap='xl' colGap='s'>
            <GridItem colStart='1' col='4'>
                <Breadcrumbs />
            </GridItem>
            <GridItem colStart='1' col='1'>
                <operator.employee.Card />
            </GridItem>

            <GridItem colStart='2' col='3'>
                <ui.Card horizontalSpace='xl' verticalSpace='xl'>
                    <TabContent />
                </ui.Card>
            </GridItem>
            <comp.admin.company.AddModal />
        </Grid>
    </comp.PrivatePage>
}

export default JobPage




export const getServerSideProps = withSessionPrivateSsr<Props>(async ({req, query}, user) => {
    return {
        props: {
            employeeId: parseInt(query.id as string),
            user
        }
    }
}, 'operator')