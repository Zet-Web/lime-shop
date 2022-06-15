import { Controller } from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types'
import {FieldPath} from 'react-hook-form/dist/types/path'
import {FieldValues} from 'react-hook-form/dist/types/fields'

import * as ui from 'consta'
import * as store from 'stores'
import {required} from 'elements/form/validationMessages'


type Props<TFieldValues extends FieldValues> = {
    defaultValue?: number[]
    name: FieldPath<TFieldValues>
    control: Control<TFieldValues>
}


const OperatorSelect = <TFieldValues extends FieldValues,>(p: Props<TFieldValues>) => {
    const model = store.operator.all
    const ids = model.useIds()

    return <Controller<TFieldValues>
        name={p.name}
        rules={{ required }}
        control={p.control}
        render={
            ({field, fieldState: { error }}) => <ui.UserSelect
                multiple
                size='s'
                status={error && 'alert'}
                caption={error?.message}
                getItemKey={id => id}
                getItemLabel={id => model.map[id].name}
                items={ids}
                placeholder='Выберите оператора'
                value={field.value}
                onBlur={field.onBlur}
                onChange={e => {
                    field.onChange(e.value)
                }}
            />
        }
    />
}


export default OperatorSelect