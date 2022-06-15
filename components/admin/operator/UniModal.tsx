import * as store from 'stores'
import * as comp from 'components'

import * as el from 'elements'
import { GridItem, Text } from 'consta'
import {local} from 'lib/api'

import {StatusBadge} from '.'


import CompanySelect from './CompanySelect'

import sty from 'styles/company.module.sass'



type Props = {

}


const UniModal = (p: Props) => {

    const state = store.modal.useState()
    const isEdit = state.mode == 'edit'

    console.log('UniModal', 'state = ', {...state})

    return typeof window != 'undefined'
        ? <comp.Modal<Operator>
            api={local.operators.save}
            defaultValues={isEdit ? store.operator.details : undefined}
            title='Оператор'
            mode={isEdit ? 'edit' : 'add'}
            affectStore={store.operator.list}
            className={sty.editModal}
        >
            {({control, watch, setValue: set}) => <>
                <Text view='secondary' size='s'>ФИО</Text>
                <GridItem colStart='2' col='3'>
                    <el.form.TextField<Operator> name='name' control={control} />
                </GridItem>

                <Text view='secondary' size='s'>Email</Text>
                <GridItem colStart='2' col='3'>
                    <el.form.TextField<Operator> name='email' control={control} />
                </GridItem>

                <Text view='secondary' size='s'>Статус</Text>
                <GridItem colStart='2' col='3'>
                    <StatusBadge isActive={watch('isActive') ?? true} />
                </GridItem>

                <GridItem colStart='1' col='4'>
                    <el.Divider />
                </GridItem>

                <GridItem col='4' colStart='1'>
                    <Text size='l'>Подрядные организации</Text>
                </GridItem>

                <GridItem col='4' colStart='1'>
                    <CompanySelect control={control} />
                </GridItem>
            </>}
        </comp.Modal>
        : <></>
}

export default UniModal