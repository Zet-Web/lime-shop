import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from '../../../lib/utils'

type Query = Rec & req.Paging & {
    action: 'list' | 'details'
    companyId?: string
}




const handler = withSessionPrivateApiRoute(async (req, res, user) => {

    const companyId = req.session.companyId!!
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isGet = method == 'GET'
    const isPost = method == 'POST'

    console.log('companyId', companyId)

    if (isGet) {
        const q = req.query as Query

        console.log('action', q.action)

        switch (q.action) {
            case 'details': {
                res.json(data.company.details[companyId] ?? {})
                break
            }
            default: {
                res.json({})
            }
        }
    }

})

export default handler