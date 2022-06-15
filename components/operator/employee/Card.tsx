import * as ui from 'consta'
import * as el from 'elements'
import * as icon from 'icons'
import * as store from 'stores'

import {Grid, GridItem, Text} from 'consta'

import UniModal from './UniModal'

import {yesNo} from 'lib/convert'





type Props = {

}

const Card = (p: Props) => {
    const data = store.employee.details.use()
console.log('employee details', data)

    return <ui.Card horizontalSpace='xl' verticalSpace='xl'>
        <Grid cols='1' rowGap='m' colGap='s'>
            <Grid cols='1' rowGap='s' xAlign='center'>
                <ui.Avatar size='l' url='' />
                <Text size='2xl' align='center'>{data.name}</Text>
            </Grid>

            <el.Divider />

            <GridItem>
                <Text size='xs' view='secondary'>УЕИГД</Text>
                <Text>{data.ueigd}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>Регион</Text>
                <Text>{data.regionId && store.employee.handbook.map.regions[data.regionId]}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>Дата рождения</Text>
                <Text>{data.birthDate}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>Подразделение</Text>
                <Text>{data.departmentId && store.employee.handbook.map.departments[data.departmentId]}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>Должность</Text>
                <Text>{data.positionId && store.employee.handbook.map.positions[data.positionId]}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>Учатствует в работах ГПН</Text>
                <Text>{yesNo(data.used)}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>Активность</Text>
                <Text>{yesNo(data.isActive)}</Text>
            </GridItem>

            <el.button.Edit onClick={_ => store.modal.edit()} />
            <el.button.Ghost label='Удалить' iconLeft={icon.Cancel} />
        </Grid>
        <UniModal />
    </ui.Card>

}


export default Card