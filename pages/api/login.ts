import {NextApiHandler} from 'next'
import { withSessionApiRoute } from 'lib/withSession'

const roles: Role[] = ['admin', 'operator']

const loginRoute: NextApiHandler<resp.Result> = async(req, res) => {
    const { role } = await req.body
    let status: resp.Status = 'ok'

    try {
        const user: User = {
            name: 'Михаил Задорнов',
            email: 'zadornov.ma@gpncard.ru',
            role
        }

        if (roles.includes(role)) {
            req.session.user = user
            await req.session.save()
            res.redirect('/operator/select')
            return
        }
        else status = 'denied'
    }
    catch (error) {
        console.log((error as Error).message)
        status = 'error'
    }

    res.json({ status })
}


export default withSessionApiRoute(loginRoute)