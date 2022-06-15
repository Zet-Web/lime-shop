import {NextApiHandler} from 'next'
import { withSessionApiRoute } from 'lib/withSession'


const logoutRoute: NextApiHandler = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}

export default withSessionApiRoute(logoutRoute)