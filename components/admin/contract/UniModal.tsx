import {DefaultValues} from 'react-hook-form/dist/types/form'
import * as store from 'stores'

import * as comp from 'components'
import * as el from 'elements'
import { GridItem, Text } from 'consta'

import {local} from 'lib/api'


import sty from 'styles/company.module.sass'



export type ModalType = 'company' | 'contract'


type Props = {

}


const UniModal = (p: Props) => {

    const {handbook} = store.contract
    const companyStore = store.company.all
    const companyIds = companyStore.useIds()

    const state = store.modal.useState()
    const isEdit = state.mode == 'edit'

    console.log('UniModal', 'state = ', {...state})

    return typeof window != 'undefined'
        ? <comp.Modal<Contract>
            api={local.contracts.save}
            defaultValues={isEdit ? store.contract.details : undefined}
            title='Договор'
            mode={isEdit ? 'edit' : 'add'}
            id={isEdit ? 'contract' : undefined}
            affectStore={store.contract.list}
            className={sty.editModal}
        >
            {({control, watch}) => <>
                <Text view='secondary' size='s'>Наименование</Text>
                <GridItem col='3' colStart='2'>
                    <el.form.TextField<Contract> name='name' control={control} />
                </GridItem>

                <Text view='secondary' size='s'>Номер</Text>
                <GridItem col='3' colStart='2'>
                    <el.form.TextField<Contract> name='number' control={control} />
                </GridItem>

                <Text view='secondary' size='s'>Дата</Text>
                <GridItem col='3' colStart='2'>
                    <el.form.DatePicker<Contract> name='date' control={control} />
                </GridItem>

                <GridItem col='4' colStart='1'>
                    <el.Divider />
                </GridItem>

                <GridItem col='4'>
                    <Text size='l'>Дочерняя организация</Text>
                </GridItem>

                <GridItem col='4'>
                    <el.form.Combobox<Contract>
                        name='companyId' control={control}
                        items={companyIds}
                        labelMap={companyStore.map}
                        labelField='name'
                    />
                </GridItem>

                <GridItem col='4' colStart='1'>
                    <el.Divider />
                </GridItem>

                <GridItem col='4'>
                    <Text size='l'>Виды работ</Text>
                </GridItem>

                <GridItem col='4' colStart='1'>
                    <el.form.Combobox<Contract>
                        multiple
                        name='jobIds' control={control}
                        items={handbook.jobs}
                        labelMap={handbook.map.jobs}
                    />
                </GridItem>
            </>}
        </comp.Modal>
        : <></>
}

export default UniModal