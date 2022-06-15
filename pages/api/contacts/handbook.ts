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

    if (isGet) {
        const q = req.query as Query

        console.log('contacts/handbook')

        res.json(data.contact.handbook)
    }

})

export default handler