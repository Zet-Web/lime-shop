import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'



type Query = Rec & {
    id: string
    companyId?: string
}




const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isGet = method == 'GET'

    const q = req.query as Query

    console.log('operators/all', q)

    const { list } = data.company

    res.json(list)
})

export default handler