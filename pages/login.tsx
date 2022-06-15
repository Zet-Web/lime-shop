import {NextPage} from 'next'
import { Button } from 'consta'
import {withSessionSsr} from '../lib/withSession'

import * as store from 'stores'

type Props = {
    
}

const LoginPage: NextPage<Props> = p => {
    return <>
        <Button
            label='Авторизоваться admin'
            onClick={_ => store.auth.login('admin')}
        />
        <Button
            label='Авторизоваться operator'
            onClick={_ => store.auth.login('operator')}
        />
    </>
}

export default LoginPage



export const getServerSideProps = withSessionSsr<Props>(async ({req, query}) => {
    const user = req.session.user

    //console.log('session', session)

    return user
        ? {
            redirect: {
                destination: '/' + user.role,
                permanent: false
            }
        }
        : {
            props: {

            }
        }
})
