import { Controller } from 'react-hook-form'
import {Control, FieldPath} from 'react-hook-form/dist/types'
import {FieldValues} from 'react-hook-form/dist/types/fields'


import * as icon from 'icons'
import * as ui from 'consta'
import { required } from './validationMessages'


type Props<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>
    control: Control<TFieldValues>
}

const DatePicker = <T extends FieldValues,>(p: Props<T>) => {

    return <Controller<T>
        name={p.name}
        rules={{ required }}
        control={p.control}
        render={
            ({field, fieldState: { error }}) => <ui.DatePicker
                rightSide={icon.Calendar} iconSize='s' size='s'
                status={error && 'alert'}
                caption={error?.message}
                value={field.value ? new Date(field.value as string) : null}
                onBlur={field.onBlur}
                onChange={v =>
                    field.onChange(v.value)
                }
                style={{ width: '100%' }}
            />
        }
    />
}


export default DatePicker