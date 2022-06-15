import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from 'lib/utils'

type Query = Rec & req.Paging & {
    companyId?: number
}




const handler = withSessionPrivateApiRoute(async (req, res, user) => {

    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'

    const companyId = req.session.companyId!!

    console.log('company/list', companyId)

    if (isGet) {
        const q = req.query as Query

        const d = data.contract.list[q.companyId ?? companyId] ?? []
        console.log(d)
        res.json({
            total: total(d.length, q.pageSize),
            data: page(d, q.pageNum, q.pageSize)
        })
    }

})

export default handler