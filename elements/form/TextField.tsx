import { Controller } from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types'
import {FieldPath} from 'react-hook-form/dist/types/path'
import {FieldValues} from 'react-hook-form/dist/types/fields'


import { required } from './validationMessages'

import * as ui from 'consta'


type Props<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>
    control: Control<TFieldValues>
    type?: string
}


const TextField = <TFieldValues extends FieldValues,>(p: Props<TFieldValues>) => {
    //const error = p.form.formState.errors[p.field]

    return <Controller<TFieldValues>
        name={p.name}
        rules={{ required }}
        control={p.control}
        render={
            ({field, fieldState: { error }}) => <ui.TextField
                size='s' width='full' type={p.type}
                status={error && 'alert'}
                caption={error?.message}
                value={field.value as string}
                onBlur={field.onBlur}
                onChange={v =>
                    field.onChange(v.value)
                }
            />
        }
    />
}


export default TextField