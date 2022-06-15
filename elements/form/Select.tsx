import { Controller } from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types'
import {FieldPath} from 'react-hook-form/dist/types/path'
import {FieldValues} from 'react-hook-form/dist/types/fields'


import { required } from './validationMessages'

import * as ui from 'consta'


type Props<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>
    control: Control<TFieldValues>
    items: number[]
    labelMap: Rec
    multiple?: boolean
}


const Select = <TFieldValues extends FieldValues,>(p: Props<TFieldValues>) => {
    //const error = p.form.formState.errors[p.field]

    return <Controller<TFieldValues>
        name={p.name}
        rules={{ required }}
        control={p.control}
        render={
            ({field, fieldState: { error }}) => <ui.Select
                size='s' multiple={p.multiple}
                status={error && 'alert'}
                caption={error?.message}
                getItemKey={id => id}
                getItemLabel={id =>
                    p.labelMap[id] ?? ''
                }
                items={p.items}
                value={field.value}
                onBlur={field.onBlur}
                onChange={v =>
                    field.onChange(v.value)
                }
            />
        }
    />
}


export default Select