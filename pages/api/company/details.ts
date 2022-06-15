import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'



type Query = Rec & {
    id: string
    isActive?: boolean[]
}





const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isGet = method == 'GET'



    if (isGet) {
        const q = req.query as Query

        console.log('company/details', q)

        const {companyId} = req.session
        res.json(data.company.details[q.id ?? companyId] ?? {})
    }

})

export default handler