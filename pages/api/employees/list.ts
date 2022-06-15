import * as data from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from 'lib/utils'

type Query = Rec & req.Paging & {
    id: string
    jobId: string
}





const handler = withSessionPrivateApiRoute(async (req, res, user) => {

    const method = req.method!.toUpperCase() as api.HttpMethod
    const isGet = method == 'GET'

    const companyId = req.session.companyId!!

    if (isGet) {
        const q = req.query as Query

        console.log('employees/list', companyId, data.employee.byCompany)


        const d = (q.jobId
            ? data.employee.byCompanyAndJob[companyId]?.[q.jobId]
            : data.employee.byCompany[companyId]
        ) ?? []

        console.log('employees/list', d)

        res.json({
            total: total(d.length, q.pageSize),
            data: page(d, q.pageNum, q.pageSize)
        })
    }

})

export default handler