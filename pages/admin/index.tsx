import {FC} from 'react'
import type { NextPage } from 'next'
import { Grid, Text } from 'consta'

import * as comp from 'components'
import * as el from 'elements'

import Flexbox from 'elements/Flexbox'

import * as store from 'stores'
import {withSessionPrivateSsr} from 'lib/withSession'


type TabId = 'company' | 'operator' | 'curator'
type Tab = TTab<TabId>


export const tabs: Tab[] = [
    { label: 'Подрядные организации', id: 'company' },
    { label: 'Операторы', id: 'operator' },
    { label: 'Кураторы', id: 'curator' }
]

const Content: FC<{ title }> = p =>
    <Grid cols='1' rowGap='xl'>
        <Flexbox justify='space-between'>
            <Text size='2xl'>{p.title}</Text>
            <el.button.Add />
        </Flexbox>
        {p.children}
    </Grid>

const Company = () =>
    <Content title='Подрядные организации'>
        <comp.admin.company.Table />
    </Content>


const Operator = () =>
    <Content title='Операторы'>
        <comp.admin.operator.Table />
    </Content>



const tabContent: Record<TabId, FC> = {
    company: Company,
    operator: Operator,
    curator: Operator,
}


type Props = {
    user: User
}



const AdminPage: NextPage<Props> = p => {

    return <comp.PrivatePage
        tabs={tabs}
        items={tabContent}
        onTabChange={tabId => {
            console.log('tabchange', tabId)
            switch (tabId) {
                case 'company': {
                    store.operator.all.fetch().then(x =>
                        store.company.list.fetch()
                    )
                    break
                }
                case 'operator': {
                    store.company.all.fetch().then(x =>
                        store.operator.list.fetch()
                    )
                    break
                }
            }
        }}
    />
}

export default AdminPage



export const getServerSideProps = withSessionPrivateSsr<Props>(async ({req}, user) => {
    //console.log('session', session)
    return {
        props: {
            user
        }
    }
}, 'admin')

