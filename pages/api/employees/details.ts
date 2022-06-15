import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'



type Query = Rec & {
    id: string
}





const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isGet = method == 'GET'



    if (isGet) {
        const q = req.query as Query

        console.log('employee/details', q)

        const {companyId} = req.session
        res.json(data.employee.byCompany[q.id ?? companyId][0] ?? {})
    }

})

export default handler