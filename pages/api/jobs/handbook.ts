import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'


type Query = Rec & {
    id: string
}





const handler = withSessionPrivateApiRoute(async (req, res, user) => {

    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'

    const companyId = req.session.companyId!!

    if (isGet) {
        const q = req.query as Query

        console.log('jobs/handbook')

        res.json(data.job.handbook)
    }

})

export default handler