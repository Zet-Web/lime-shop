import {operator} from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'



type Query = Rec & {
    id: string
    companyId?: string
}




const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isGet = method == 'GET'

    const q = req.query as Query

    console.log('operators/all', q, operator.list)

    res.json(operator.list)
})


export default handler