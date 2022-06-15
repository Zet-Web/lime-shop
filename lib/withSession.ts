import { NextApiRequest, NextApiResponse, GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next'
import {IronSessionOptions} from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {remote} from './api'


export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'gpn-site',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
}


type PrivateApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>, user: User) => void | Promise<void>

export const withSessionApiRoute = (handler: NextApiHandler) =>
    withIronSessionApiRoute(handler, sessionOptions)


export const withSessionPrivateApiRoute = (handler: PrivateApiHandler) =>
    withIronSessionApiRoute((req, res) => {
        const {user} = req.session ?? {}

        if (user) {
            return handler(req, res, user)
        }
        else
            res.redirect('/login')
    }, sessionOptions)


type Rec = Record<string, unknown>

type SsrResult<P extends Rec = Rec> = GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
type SsrHandler<P extends Rec = Rec> = (context: GetServerSidePropsContext) => SsrResult<P>
type PrivateSsrHandler<P extends Rec = Rec> = (context: GetServerSidePropsContext, user: User) => SsrResult<P>

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<P extends Rec = Rec> (handler: SsrHandler<P>) {
    return withIronSessionSsr(handler, sessionOptions)
}


export const withSessionPrivateSsr = <P extends Rec = Rec> (handler: PrivateSsrHandler<P>, role?: Role) =>
    withIronSessionSsr(async (ctx) => {
        const {user} = ctx.req.session ?? {}
        const {url} = ctx.req

        //const res = await remote.auth.status()
        //console.log(res)


        return user// && res
            ? (
                role && user.role == role
                //url?.startsWith('/' + user.role) || url?.endsWith(user.role + '.json')
                    ? handler(ctx, user)
                    : {
                        redirect: {
                            destination: '/' + (user.role ?? ''),
                            permanent: false
                        }
                    }
            )
            : {
                redirect: {
                    destination: '/login',
                    permanent: false
                },
            }
    }, sessionOptions)