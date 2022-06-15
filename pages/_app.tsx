
import type { AppProps } from 'next/app'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme'

import Header, {ErrorNotify} from 'components/header'

import 'styles/globals.css'
import * as store from '../stores'
import {useEffect} from 'react'



type Props = Record<string, unknown> & {
    user: User
}

const MyApp = (p: AppProps<Props>) => {

    const isBrowser = typeof window != 'undefined'
    const {user} = p.pageProps

    useEffect(() => {
        store.auth.user = user
    }, [user])


    return isBrowser && <Theme preset={presetGpnDefault} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100%' }}>
        {
            user && <Header />
        }

        <p.Component { ...p.pageProps } />
    </Theme>
}

export default MyApp

