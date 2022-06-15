import * as h from '@consta/uikit/Header'
import * as ui from 'consta'
import { Button, Text } from 'consta'

import * as icon from 'icons'
import {useRef} from 'react'
import * as store from 'stores'
import {useState} from '@hookstate/core'



type Props = {

}

const Module = h.HeaderModule


export const ErrorNotify = () => {
    const error = store.auth.useError()

    const items: ui.SnackBarItemDefault[] = error ? [{
        key: 1, message: error, status: 'alert', autoClose: true, showProgress: 'line'
    }] : []

    return <ui.SnackBar
        items={items}
        onItemClose={item=> store.auth.error = ''}
        style={{ position: 'fixed', bottom: 'var(--space-m)', right: 'var(--space-m)' }} />
}



const HeaderLogin = () => {
    const user = store.auth.useUser()
    const loginRef = useRef(null)
    const cardRef = useRef(null)
    const popover = useState(false)

    ui.useClickOutside({
        isActive: popover.get(),
        ignoreClicksInsideRefs: [loginRef, cardRef],
        handler: _ => popover.set(false)
    })

    return <Module indent="s">
        {
            popover.get() && <ui.Popover anchorRef={loginRef}>
                <ui.Card ref={cardRef} horizontalSpace='s' verticalSpace='s' style={{display: 'flex', flexDirection: 'column'}}>
                    <Button
                        style={{ textAlign: 'left' }}
                        size='s'
                        view='clear'
                        label='настройки'
                        width='full'
                        //onClick={_ => store.auth.logout()}
                    />
                    <Button
                        style={{ textAlign: 'left' }}
                        size='s'
                        view='clear'
                        label='сменить организацию'
                        width='full'
                        onClick={_ => store.auth.selectCompany()}
                    />
                    <Button
                        style={{ textAlign: 'left' }}
                        size='s'
                        view='clear'
                        label='выход'
                        width='full'
                        onClick={_ => store.auth.logout()}
                    />
                </ui.Card>
            </ui.Popover>
        }
        <h.HeaderLogin
            ref={loginRef}
            isLogged={true}
            personName={user?.name}
            personInfo={user?.email}
            personStatus="available"
            //personAvatarUrl="avatar.png"
            onClick={_ => popover.set(!popover.get())}
        />
    </Module>
}

const Header = (p: Props) => {
    return <h.Header
        leftSide={
            <>
                <Module>
                    <h.HeaderLogo>
                        <Text as="p" size="l" weight="bold">Подрядные организации</Text>
                    </h.HeaderLogo>
                </Module>
            </>
        }
        rightSide={
            <>
                <Module indent="s">
                    <h.HeaderButton iconLeft={icon.Ring} iconSize='s'/>
                </Module>
                <Module indent="s">
                    <h.HeaderButton iconLeft={icon.Question} iconSize='s'/>
                </Module>
                <HeaderLogin />
                <ErrorNotify />
            </>
        }
    />
}

export default Header