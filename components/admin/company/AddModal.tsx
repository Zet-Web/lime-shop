import * as store from 'stores'
import * as el from 'elements'
import * as comp from 'components'

import { GridItem, Text } from 'consta'
import {local} from 'lib/api'

import sty from 'styles/company.module.sass'




const AddModal = () => {

    return typeof window != 'undefined'
        ? <comp.Modal<CompanyDetails>
            api={local.company.save}
            defaultValues={store.company.details}
            title='Подрядная организация'
            mode='add'
            affectStore={store.company.list}
            className={sty.editModal}
        >
            {({control, watch}) => <>
                <Text view='secondary' size='s'>Название</Text>
                <GridItem col='3' colStart='2'>
                    <el.form.TextField<CompanyDetails> name='name' control={control} />
                </GridItem>

                <Text view='secondary' size='s'>ИНН</Text>
                <GridItem col='3' colStart='2'>
                    <el.form.TextField<CompanyDetails> name='inn' control={control} />
                </GridItem>

                <Text view='secondary' size='s'>Юр. адрес</Text>
                <GridItem col='3' colStart='2'>
                    <el.form.TextField<CompanyDetails> name='address' control={control} type='textarea' />
                </GridItem>

                <Text view='secondary' size='s'>Статус</Text>
                <GridItem col='3' colStart='2'>
                    <comp.common.StatusBadge isActive={watch('isActive')} />
                </GridItem>

                <GridItem col='4' colStart='1'>
                    <el.Divider />
                </GridItem>

                <Text size='l'>Операторы</Text>

                <GridItem col='4' colStart='1'>
                    <comp.common.company.OperatorSelect<CompanyDetails> name='operators' control={control} />
                </GridItem>
            </>}
        </comp.Modal>
        : <></>
}

export default AddModal