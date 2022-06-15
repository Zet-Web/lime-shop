import {ReactNode} from 'react'
import {UseFormWatch} from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types'
import {UseFormSetValue} from 'react-hook-form/dist/types/form'

import * as store from 'stores'


import {Divider} from 'elements'

import { GridItem, Text } from 'consta'
import {local} from 'lib/api'
import {StatusBadge} from '..'

import OperatorSelect from './OperatorSelect'
import * as comp from 'components'


import * as el from 'elements'

import sty from 'styles/company.module.sass'






/*
const SwitchStatus = () => {
    const confirmRef = useRef(null)
    const popover = useState(false)

    return popover.get() && <ui.Popover anchorRef={confirmRef} className={sty.changeStatusModal} direction='rightDown'>
        <ui.Card horizontalSpace='s' verticalSpace='s' style={{display: 'flex', flexDirection: 'column'}}>
            <Text size='2xl'>{st == 'active' ? 'Деа' : 'А'}ктивация</Text>
            <Text as='p' size='m' view='secondary'>
                Вы уверены, что хотите {st == 'active' ? 'де' : ''}активировать подрядную организацию {watch('name')} ?
            </Text>
            <div className={sty.buttons}>
                <Button
                    size='m' view='primary'
                    label='Подтвердить'
                    onClick={_ => store.companyDetails.changeStatus = false}
                />
                &nbsp;&nbsp;
                <Button
                    size='m' view='secondary'
                    label='Отмена'
                    onClick={_ => store.companyDetails.changeStatus = false}
                />
            </div>
        </ui.Card>
    </ui.Popover>
    <ui.Switch size='m' checked={st == 'active'} ref={confirmRef} onChange={_ => popover.set(!popover.get())} />
}
*/

type Props = {
    children?: (
        watch: UseFormWatch<CompanyDetails>,
        control: Control<CompanyDetails>,
        setValue: UseFormSetValue<CompanyDetails>
    ) => ReactNode | ReactNode[],

}

const EditModal = (p: Props) => {

    return typeof window != 'undefined'
        ? <comp.Modal<CompanyDetails>
            title='Подрядная организация'
            mode='edit'
            api={local.company.save}
            defaultValues={store.company.details}
            affectStore={store.company.details}
            className={sty.editModal}
        >
            {({ watch, control, setValue }) => <>
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
                    {/*<SwitchStatus />*/}
                    <StatusBadge isActive={watch('isActive')} />
                </GridItem>

                {p.children?.(watch, control, setValue)}

                <GridItem col='4' colStart='1'>
                    <Divider />
                </GridItem>

                <Text size='l'>Операторы</Text>

                <GridItem col='4' colStart='1'>
                    <OperatorSelect<CompanyDetails> name='operators' control={control} />
                </GridItem>
            </>}
        </comp.Modal>
        : <></>
}

export default EditModal