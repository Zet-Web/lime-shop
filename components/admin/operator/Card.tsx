import * as ui from 'consta'
import {Divider} from 'elements'
import * as el from 'elements'
import * as icon from 'icons'
import * as store from 'stores'

import {Grid, GridItem, Text} from 'consta'


import {StatusBadge} from '.'

import * as admin from 'components/admin'

import sty from 'styles/company.module.sass'



const OperatorList = () => {
    const selectedId = store.company.details.use().operators
    const model = store.operator.all
    const ids = model.useIds()

    const selected = ids?.filter(x => selectedId?.includes(x)) ?? []

    return <Grid cols={1} rowGap='xs'>
        {
            selected?.map((x, i) =>
                <ui.User key={i} name={model.map[x].name} info={model.map[x].email} />
            )
        }
    </Grid>
}



type Props = {

}

const Card = (p: Props) => {
    const data = store.company.details.use()

    return <ui.Card horizontalSpace='xl' verticalSpace='xl'>
        <Grid cols='1' rowGap='m' colGap='s'>
            <StatusBadge isActive={data.isActive!!} size='l' width='fit-content' />

            <Text size='2xl'>{data.name}</Text>

            <Divider />

            <GridItem>
                <Text size='xs' view='secondary'>ИНН</Text>
                <Text>{data.inn}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>Юр. адрес</Text>
                <Text>{data.address}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>Операторы</Text>
                <OperatorList />
            </GridItem>

            <el.button.Edit onClick={ _ => store.modal.edit()} />
        </Grid>
        <admin.company.EditModal />
    </ui.Card>

}


export default Card