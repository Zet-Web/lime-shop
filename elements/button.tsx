import * as ui from 'consta'
import * as icon from 'icons'
import {Props} from '@consta/uikit/__internal__/src/components/Button/Button'



import * as store from 'stores'

import sty from 'styles/index.module.sass'
import {ButtonHTMLAttributes} from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export module button {

    export const Ghost = (p: Props & ButtonProps) =>
        <ui.Button size='s' view='ghost' className={sty.alignButton} {...p} />

    export const Icon = (p: Props & ButtonProps) =>
        <Ghost onlyIcon {...p} />

    export const Add = (p: Props) =>
        <ui.Button
            label='Добавить'
            size='s' iconLeft={icon.Add}
            onClick={_ => store.modal.add()}
        />

    export const Edit = (p: Props) =>
        <Ghost iconLeft={icon.Edit} label='Редактировать' {...p} />

    export const Pen = (p: Props) =>
        <Icon iconLeft={icon.Edit} size='xs' width='full' {...p} />

    export const Download = (p: Props) =>
        <Ghost onlyIcon iconLeft={icon.Download}  {...p} />
}