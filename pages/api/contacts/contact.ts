import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from 'lib/utils'

type Query = Rec & req.Paging & {
    action: 'list' | 'details'
    id: string
}

type Body = {
    action: 'select'
    id?: string
}




const handler = withSessionPrivateApiRoute(async (req, res, user) => {

    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'
    const isPost = method == 'POST'

    const companyId = req.session.companyId!!

    console.log('companyId', companyId)

    if (isGet) {
        const q = req.query as Query

        console.log('action', q.action)

        switch (q.action) {
            case 'list': {
                const d = data.contact.byCompany[companyId] ?? []
                console.log(d)
                res.json({
                    total: total(d.length, q.pageSize),
                    data: page(d, q.pageNum, q.pageSize)
                })
                break
            }
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