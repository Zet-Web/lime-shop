import { useEffect } from 'react'
import { NextPage } from 'next'

import * as comp from 'components'
import * as admin from 'components/admin'

import * as el from 'elements'

import * as ui from 'consta'
import {Grid, GridItem, Text} from 'consta'

import * as store from 'stores'
import {Flexbox} from 'elements'


import {withSessionPrivateSsr} from 'lib/withSession'



const Breadcrumbs = () => {
    const {name} = store.company.details.use()

    return <ui.Breadcrumbs
        pages={[
            {
                label: 'Подрядные организации',
                link: '/'
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
    user: User
    companyId: number
}


const CompanyPage: NextPage<Props> = p => {

    useEffect(() => {
        store.company.details.fetch(p.companyId)
        store.company.all.fetch()
        store.contract.handbook.fetch().then(_ =>
            store.contract.list.fetch({companyId: p.companyId})
        )

        store.operator.all.fetch()
    }, [p.companyId])


    return <comp.PrivatePage>
        <Grid cols='4' rowGap='xl' colGap='l'>
            <GridItem colStart='1' col='4'>
                <Breadcrumbs />
            </GridItem>
            <GridItem colStart='1' col='1'>
                <comp.common.company.Card>
                    <comp.admin.company.EditModal />
                </comp.common.company.Card>
            </GridItem>

            <GridItem colStart='2' col='3'>
                <ui.Card horizontalSpace='xl' verticalSpace='xl'>
                    <Grid cols='1' rowGap='l'>
                        <Flexbox justify='space-between' width='100%'>
                            <Text size='xl'>Договоры</Text>
                            <el.button.Add />
                        </Flexbox>
                        <admin.contract.Table />
                    </Grid>
                </ui.Card>
            </GridItem>
        </Grid>
    </comp.PrivatePage>
}

export default CompanyPage




export const getServerSideProps = withSessionPrivateSsr<Props>(async ({req, query}, user) => {
    return {
        props: {
            companyId: parseInt(query.id as string),
            user
        }
    }
}, 'admin')
