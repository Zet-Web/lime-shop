import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from 'lib/utils'
import {company, operator} from 'data'


type Query = Rec & req.Paging & {
    id: string
    companyId?: string
}




const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isGet = method == 'GET'

    const q = req.query as Query

    console.log('operators/list', q)

    const {companyId} = req.session
    const id = q.companyId ?? companyId
    const { list, details } = company

    const orgs = id
        ?
            details[id].operators.map(
                oId => list.filter(c => details[c.id].operators.some(x => x == oId))
            )
        : []

    const d = operator.list//.map(o => ({ ...o, orgs }) as Operator)

    res.json({
        total: total(d.length, q.pageSize),
        data: page(d, q.pageNum, q.pageSize)
    })
})

export default handler