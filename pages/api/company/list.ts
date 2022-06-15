import {company} from 'data'
import {withSessionPrivateApiRoute} from 'lib/withSession'
import {page, total} from 'lib/utils'



type Query = Rec & req.Paging & {
    id: string
    isActive?: string[]
}



const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isGet = method == 'GET'

    const q = req.query as Query

    console.log('company/list', q)

    let d = company.list
    if (q.isActive?.length)
        d = d.filter(v => q.isActive!!.includes(''+v.isActive))

    console.log(d)

    res.json({
        total: total(d.length, q.pageSize),
        data: page(d, q.pageNum, q.pageSize)
    })

})

export default handler