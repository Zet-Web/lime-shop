import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from 'lib/utils'

type Query = Rec & {
    id: string
}





const handler = withSessionPrivateApiRoute(async (req, res, user) => {

    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'

    const companyId = req.session.companyId!!

    if (isGet) {
        const q = req.query as Query

        console.log('contracts/handbook')

        res.json(data.contract.handbook)
    }

})

export default handler