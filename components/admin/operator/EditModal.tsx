import * as store from 'stores'
import {Divider} from 'elements'


import { Button, GridItem, Text } from 'consta'

import {local} from 'lib/api'
import {StatusBadge} from './index'

import CompanySelect from './CompanySelect'

import * as comp from 'components'

import * as el from 'elements'


import sty from 'styles/company.module.sass'




const activeMessage = [
    'Все Операторы и договоры подрядной организации будут деактивированы. Повторная активация производится вручную. Продолжить?',
    'Необходимо вручную активировать Операторов и договоры, указанные в заявке'
]


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



const EditModal = () => {

    return typeof window != 'undefined'
        ? <comp.Modal<Operator>
            api={local.operators.save}
            defaultValues={store.operator.details}
            title='Оператор'
            mode='edit'
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
                    {/*<SwitchStatus />*/}
                    <StatusBadge isActive={watch('isActive') ?? false} />
                </GridItem>

                <GridItem colStart='2' col='3'>
                    <Button
                        label={watch('isActive') ? 'Деактивировать' : 'Активировать'}
                        width='full' size='s' view='secondary' type='button'
                        onClick={_ => store.changeStatusModal().edit()}
                    />
                </GridItem>

                <GridItem colStart='1' col='4'>
                    <Divider />
                </GridItem>

                <Text size='l'>Подрядные организации</Text>

                <GridItem colStart='1' col='4'>
                    <CompanySelect control={control} />
                </GridItem>

                <comp.common.ChangeStatusModal
                    isActive={watch('isActive')}
                    messages={activeMessage}
                    onConfirm={st => watch('isActive', st)}
                />
            </>}
        </comp.Modal>
        : <></>
}

export default EditModal