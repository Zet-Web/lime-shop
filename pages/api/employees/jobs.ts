import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'


type Query = Rec & {
    employeeId: string
}


const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'

    const companyId = parseInt(req.session.companyId!!)

    if (isGet) {
        const q = req.query as Query
        const employeeId = parseInt(q.employeeId)

        const d = data.employee.byCompany[companyId]
            .find(e => e.id == employeeId)
            ?.jobIds?.map(id =>
                data.job.byCompany[companyId].find(j => j.id == id)
            )

        console.log('employee/jobs', d)

        res.json(d)
    }
})

export default handler