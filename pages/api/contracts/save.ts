import {withSessionPrivateApiRoute} from 'lib/withSession'



const handler = withSessionPrivateApiRoute(async (req, res, user) => {
    const method = req.method!.toUpperCase() as api.HttpMethod

    const isPost = method == 'POST'


    if (isPost) {
        const b = req.body as Body
        console.log('contracts/save', b)

        res.json({
            status: 'ok'
        })
    }

})

export default handler