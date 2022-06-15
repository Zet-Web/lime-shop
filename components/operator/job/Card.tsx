import * as ui from 'consta'
import * as el from 'elements'
import * as store from 'stores'

import {Grid, GridItem, Text} from 'consta'




type Props = {

}

const Card = (p: Props) => {
    const data = store.job.details.use()
console.log('job details', data)
    return <ui.Card horizontalSpace='xl' verticalSpace='xl'>
        <Grid cols='1' rowGap='m' colGap='s'>
            <Text size='2xl'>{data.name}</Text>

            <el.Divider />

            <GridItem>
                <Text size='xs' view='secondary'>Доч. организация</Text>
                <Text>{data.companyId && store.company.all.map[data.companyId].name}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>№ договора</Text>
                <Text>{data.contractNumber}</Text>
            </GridItem>

            <GridItem>
                <Text size='xs' view='secondary'>№ группы барьеров</Text>
                <Text>{data.number}</Text>
            </GridItem>

        </Grid>
    </ui.Card>

}


export default Card