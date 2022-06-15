import * as store from 'stores'

import { Button, GridItem } from 'consta'


import * as comp from 'components'




const activeMessage = [
    'Все Операторы и договоры подрядной организации будут деактивированы. Повторная активация производится вручную. Продолжить?',
    'Необходимо вручную активировать Операторов и договоры, указанные в заявке'
]




const EditModal = () => {

    return <comp.common.company.EditModal>
        {
            (watch, control, setValue) => <>
                <GridItem col='3' colStart='2'>
                    <Button
                        label={watch('isActive') ? 'Деактивировать' : 'Активировать'}
                        width='full' size='s' view='secondary' type='button'
                        onClick={_ => store.changeStatusModal().edit()}
                    />
                </GridItem>

                <comp.common.ChangeStatusModal
                    isActive={watch('isActive')}
                    messages={activeMessage}
                    onConfirm={st => setValue('isActive', st)}
                />
            </>
        }

    </comp.common.company.EditModal>
}

export default EditModal