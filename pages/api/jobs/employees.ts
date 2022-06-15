import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from '../../../lib/utils'


type Query = Rec & req.Paging & {
    employeeId: string
}


const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'

    const companyId = parseInt(req.session.companyId!!)

    if (isGet) {
        const q = req.query as Query
        const jobId = parseInt(q.jobId)

        const d = data.employee.byCompany[companyId]
            .filter(e => e.jobIds.includes(jobId))

        console.log('jobs/employees', d)

        res.json(res.json({
            total: total(d.length, q.pageSize),
            data: page(d, q.pageNum, q.pageSize)
        }))
    }
})

export default handler