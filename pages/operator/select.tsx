import type { NextPage } from 'next'
import * as ui from 'consta'
import { Grid, Text } from 'consta'
import * as store from 'stores'
import {withSessionPrivateSsr} from 'lib/withSession'

import {company} from 'data'

import sty from 'styles/operator/select.module.sass'




type Props = {
    companies: Company[]
}

const Card = (p: Company) =>
    <div
        className={sty.companyItem}
        onClick={_ => store.auth.selectCompany(p.id)}
    >
        <Text size='xl'>{p.name}</Text>
        <Text view='secondary' size='s'>ИНН {p.inn}</Text>
    </div>


const IndexPage: NextPage<Props> = p => {

    return <div className={sty.layout}>
        <div className={sty.main}>
            <ui.Card horizontalSpace='2xl' verticalSpace='2xl' className={sty.selector}>
                <Text size='2xl' align='center'>Выберите подрядную организацию</Text>

                <Grid cols='1' rowGap='m'>
                    {
                        p.companies.map((x, i) => <Card key={i} {...x} />)
                    }
                </Grid>
            </ui.Card>
        </div>
    </div>
}

export default IndexPage



export const getServerSideProps = withSessionPrivateSsr<Props>(async ({req}, user) => {
    const {companyId} = req.session
    return !companyId
        ? {
            props: {
                user,
                companies: company.list
            }
        }
        : {
            redirect: {
                destination: '/operator',
                permanent: false
            }
        }
}, 'operator')
