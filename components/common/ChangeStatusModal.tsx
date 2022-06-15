import { changeStatusModal } from 'stores'

import * as ui from 'consta'
import {Button, Text} from 'consta'

import sty from 'styles/company.module.sass'




type Props = {
    messages: string[]
    isActive: boolean
    onConfirm: (isActive: boolean) => void
}

const ChangeStatusModal = (p: Props) => {
    const state = changeStatusModal().useState()

    const isOpen = state.mode == 'edit' && changeStatusModal().opened()

    return <ui.Modal className={sty.changeStatusModal} isOpen={isOpen}>
        <Text size='2xl'>{p.isActive ? 'Деа' : 'А'}ктивация</Text>
        <Text as='p' size='m' view='secondary'>
            {p.messages[+p.isActive]}
        </Text>
        <div className={sty.buttons}>
            <Button
                size='m' view='primary'
                label='Подтвердить'
                onClick={_ => {
                    changeStatusModal().close()
                    p.onConfirm(!p.isActive)
                }}
            />
            &nbsp;&nbsp;
            <Button
                size='m' view='secondary'
                label='Отмена'
                onClick={_ => changeStatusModal().close()}
            />
        </div>
    </ui.Modal>
}


export default ChangeStatusModal