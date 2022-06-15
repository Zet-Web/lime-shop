import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from 'lib/utils'

type Query = Rec & req.Paging & {
    id: string
}


const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'

    const companyId = req.session.companyId!!

    const q = req.query as Query
    let { contractId } = q

    const d = data.job.byCompany[companyId]

    console.log('jobs/list', d)

    res.json({
        total: total(d.length, q.pageSize),
        data: page(d, q.pageNum, q.pageSize)
    })
})

export default handler