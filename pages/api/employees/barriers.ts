import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'


type Query = Rec & {
    employeeId: string
}


const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'

    const companyId = req.session.companyId!!

    if (isGet) {
        const q = req.query as Query
        let {contractId} = q

        const d = data.barrier.byCompany[companyId]

        console.log('employee/jobs', d)

        res.json(d)
    }
})

export default handler