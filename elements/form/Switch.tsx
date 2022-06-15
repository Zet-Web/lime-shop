import { Controller } from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types'
import {FieldPath} from 'react-hook-form/dist/types/path'
import {FieldValues} from 'react-hook-form/dist/types/fields'


import { required } from './validationMessages'

import * as ui from 'consta'


type Props<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>
    control: Control<TFieldValues>
    optional?: boolean
}


const Switch = <TFieldValues extends FieldValues,>(p: Props<TFieldValues>) => {
    //const error = p.form.formState.errors[p.field]

    return <Controller<TFieldValues>
        name={p.name}
        rules={p.optional ? undefined : { required }}
        control={p.control}
        render={
            ({field, fieldState: { error }}) => <ui.Switch
                //status={error && 'alert'}
                //caption={error?.message}
                checked={field.value}
                onBlur={field.onBlur}
                onChange={v =>
                    field.onChange(v.e)
                }
            />
        }
    />
}


export default Switch