import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'



type Query = Rec & req.Paging & {
    action: 'list' | 'details'
    id: string
    companyId?: string
}

type Body = {
    action: 'select'
    id?: string
}




const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isGet = method == 'GET'
    const isPost = method == 'POST'


    if (isGet) {
        const q = req.query as Query

        console.log('request', q)

        switch (q.action) {
            case 'details': {
                const {companyId} = req.session
                res.json(data.company.details[q.id ?? companyId] ?? {})
                break
            }
            default: {
                res.json({})
            }
        }
    }
    else if (isPost) {
        const b = req.body as Body
        switch (b.action) {
            case 'select': {
                req.session.companyId = b.id
                await req.session.save()
                res.redirect(`/operator${b.id ? '/company' : ''}`)
                break
            }
        }
    }

})

export default handler