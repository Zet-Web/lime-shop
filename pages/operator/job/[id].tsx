import { useEffect } from 'react'
import {useState} from '@hookstate/core'

import { NextPage } from 'next'

import * as comp from 'components'
import * as el from 'elements'
import * as operator from 'components/operator'
import * as ui from 'consta'


import * as store from 'stores'


import {Grid, GridItem, Text} from 'consta'
import {withSessionPrivateSsr} from 'lib/withSession'



type TabId = 'employees' | 'vehicles'

type Tab = {
    label: string,
    id: TabId
}

const tabs: Tab[] = [
    {
        label: 'Сотрудники',
        id: 'employees'
    },
    {
        label: 'Транспортные средства',
        id: 'vehicles'
    }
]


const Breadcrumbs = () => {
    const name = store.job.details.use().name

    return <ui.Breadcrumbs
        pages={[
            {
                label: 'Виды работ',
                link: '/operator?tab=jobs'
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
    jobId: number
}


const JobPage: NextPage<Props> = p => {

    const tab = useState<Tab>(tabs[0])

    useEffect(() => {
        store.job.handbook.fetch().then(x => {
            store.company.all.fetch().then(x =>
                store.job.details.fetch(p.jobId)
            )
            store.job.employees.fetch({jobId: p.jobId})
        })

    }, [])



    return <comp.PrivatePage>
        <Grid cols='4' rowGap='xl' colGap='s'>
            <GridItem colStart='1' col='4'>
                <Breadcrumbs />
            </GridItem>
            <GridItem colStart='1' col='1'>
                <operator.job.Card />
            </GridItem>

            <GridItem colStart='2' col='3'>
                <ui.Card horizontalSpace='xl' verticalSpace='xl'>
                    <Grid cols='1' rowGap='l'>
                        <ui.ChoiceGroup
                            view='ghost' size='s'
                            items={tabs}
                            getLabel={x => x.label}
                            name='item'
                            style={{ width: 'fit-content' }}
                            value={tab.get()}
                            onChange={e => tab.set(e.value)}
                        />
                        <el.Flexbox justify='space-between' width='100%'>
                            <Text size='xl'>{tab.get().label}</Text>
                            <el.button.Download onClick={_ => null} />
                        </el.Flexbox>
                        <operator.job.employee.Table />
                    </Grid>
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
            jobId: parseInt(query.id as string),
            user
        }
    }
}, 'operator')