import {withSessionPrivateApiRoute} from 'lib/withSession'



type Body = CompanyDetails & {

}



const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isPost = method == 'POST'

    if (isPost) {
        const b = req.body as Body

        req.session.companyId = b.id
        await req.session.save()
        res.redirect(`/operator${b.id ? '' : '/select'}`)
    }

})

export default handler