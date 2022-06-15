import * as store from 'stores'
import * as comp from 'components'

import * as el from 'elements'
import { GridItem, Text } from 'consta'



import {local} from 'lib/api'
import sty from 'styles/company.module.sass'



export type ModalType = 'company' | 'contact'

type Props = {

}


const UniModal = (p: Props) => {

    //const {handbook} = store.contact
    //const companyStore = store.company.all
    //const companyIds = companyStore.useIds()

    const state = store.modal.useState()
    const isEdit = state.mode == 'edit'

    console.log('UniModal', 'state = ', {...state})

    const {handbook} = store.contact

    return typeof window != 'undefined'
        ? <comp.Modal<Contact>
            api={local.contacts.save}
            defaultValues={isEdit ? store.contact.details : undefined}
            title='Контакт'
            id={isEdit ? 'contact' : undefined}
            affectStore={store.contact.list}
            className={sty.editModal}
            mode={isEdit ? 'edit' : 'add'}
        >
            {({control, watch}) => <>
                <Text view='secondary' size='s'>ФИО</Text>
                <GridItem colStart='2' col='3'>
                    <el.form.TextField<Contact> name='name' control={control} />
                </GridItem>

                <Text view='secondary' size='s'>Роль</Text>
                <GridItem colStart='2' col='3'>
                    <el.form.Select<Contact>
                        name='roleId' control={control}
                        labelMap={handbook.map.roles}
                        items={handbook.roles}
                    />
                </GridItem>

                <Text view='secondary' size='s'>Должность</Text>
                <GridItem colStart='2' col='3'>
                    <el.form.Select<Contact>
                        name='positionId' control={control}
                        labelMap={handbook.map.positions}
                        items={handbook.positions}
                    />
                </GridItem>

                <Text view='secondary' size='s'>Email</Text>
                <GridItem colStart='2' col='3'>
                    <el.form.TextField<Contact> name='email' control={control} />
                </GridItem>

                <Text view='secondary' size='s'>Телефон</Text>
                <GridItem colStart='2' col='3'>
                    <el.form.TextField<Contact> name='phone' control={control} />
                </GridItem>
            </>}
        </comp.Modal>
        : <></>
}

export default UniModal