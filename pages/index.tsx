import {NextPage} from 'next'
import {withSessionPrivateSsr} from 'lib/withSession'

type Props = {

}

const IndexPage: NextPage<Props> = p => {
    return <></>
}

export default IndexPage



export const getServerSideProps = withSessionPrivateSsr(async ({req, query}, user) => {

    return {
        redirect: {
            destination: '/' + user.role,
            permanent: false
        }
    }
})
