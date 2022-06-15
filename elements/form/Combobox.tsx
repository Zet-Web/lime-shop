import { Controller } from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types'
import {FieldPath} from 'react-hook-form/dist/types/path'
import {FieldValues} from 'react-hook-form/dist/types/fields'


import { required } from './validationMessages'

import * as ui from 'consta'


type Props<TFieldValues extends FieldValues, VALUE extends (IdName | string)> = {
    name: FieldPath<TFieldValues>
    control: Control<TFieldValues>
    items: number[]
    labelMap: Record<number, VALUE>
    labelField?: keyof VALUE
    multiple?: boolean
}


const Combobox = <TFieldValues extends FieldValues, VALUE extends (IdName | string) = IdName>(p: Props<TFieldValues, VALUE>) => {
    //const error = p.form.formState.errors[p.field]

    return <Controller<TFieldValues>
        name={p.name}
        rules={{ required }}
        control={p.control}
        render={
            ({field, fieldState: { error }}) => <ui.Combobox
                size='s' multiple={p.multiple}
                status={error && 'alert'}
                caption={error?.message}
                getItemKey={id => id}
                getItemLabel={id => (
                    p.labelField
                        ? (p.labelMap[id]?.[p.labelField] ?? p.labelMap[id]) as unknown as string
                        : p.labelMap[id] as string
                    ) ?? ''
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


export default Combobox