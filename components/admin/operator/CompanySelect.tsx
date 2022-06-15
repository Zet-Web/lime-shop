import {useEffect} from 'react'
import {useState} from '@hookstate/core'
import {FieldValues} from 'react-hook-form/dist/types/fields'
import {FieldPath} from 'react-hook-form/dist/types/path'
import {Control} from 'react-hook-form/dist/types'
import * as store from 'stores'
import * as el from 'elements'

type Props = {
    control: Control<Operator>
}


const CompanySelect = (p: Props) => {
    const model = store.company.all
    const ids = model.useIds()


    return <el.form.Combobox<Operator>
        name='orgs' control={p.control}
        multiple
        labelMap={model.map}
        labelField='name'
        items={ids}
    />
}


export default CompanySelect