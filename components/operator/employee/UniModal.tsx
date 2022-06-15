import * as store from 'stores'
import * as comp from 'components/index'
import * as el from 'elements'

import {GridItem, Text} from 'consta'

import {local} from 'lib/api'


import sty from 'styles/company.module.sass'




const UniModal = () => {

    const state = store.modal.useState()

    const isEdit = state.mode == 'edit'
    console.log('UniModal', 'state = ', {...state})

    const {handbook} = store.employee

    return typeof window != 'undefined'
        ? <comp.Modal<EmployeeDetails>
            title='Сотрудник'
            mode={isEdit ? 'edit' : 'add'}
            api={local.employees.save}
            defaultValues={isEdit ? store.employee.details : undefined}
            affectStore={store.employee.details}
            className={sty.editModal}
        >
            {({control}) => {
                return <>
                    <Text view='secondary' size='s'>ФИО</Text>
                    <GridItem col='3' colStart='2'>
                        <el.form.TextField<EmployeeDetails> name='name' control={control} />
                    </GridItem>

                    <Text view='secondary' size='s'>Дата рождения</Text>
                    <GridItem col='3' colStart='2'>
                        <el.form.DatePicker<EmployeeDetails> name='birthDate' control={control} />
                        {/*<StatusBadge isActive={watch('isActive')} />*/}
                    </GridItem>

                    <Text view='secondary' size='s'>УЕИГД</Text>
                    <GridItem col='3' colStart='2'>
                        <el.form.TextField<EmployeeDetails> name='ueigd' control={control} />
                    </GridItem>

                    <Text view='secondary' size='s'>Регион ГПН</Text>
                    <GridItem col='3' colStart='2'>
                        <el.form.Select<EmployeeDetails>
                            name='regionId' control={control}
                            labelMap={handbook.map.regions}
                            items={handbook.regions}
                        />
                    </GridItem>

                    <Text view='secondary' size='s'>Подразделение</Text>
                    <GridItem col='3' colStart='2'>
                        <el.form.Select<EmployeeDetails>
                            name='departmentId' control={control}
                            labelMap={handbook.map.departments}
                            items={handbook.departments}
                        />
                    </GridItem>

                    <Text view='secondary' size='s'>Должность</Text>
                    <GridItem col='3' colStart='2'>
                        <el.form.Select<EmployeeDetails>
                            name='positionId' control={control}
                            labelMap={handbook.map.positions}
                            items={handbook.positions}
                        />
                    </GridItem>

                    <Text view='secondary' size='s'>Участвует в работах ГПН</Text>
                    <GridItem col='3' colStart='2'>
                        <el.form.Switch<EmployeeDetails> name='used' control={control} optional />
                    </GridItem>

                    <Text view='secondary' size='s'>Активность</Text>
                    <GridItem col='3' colStart='2'>
                        <el.form.Switch<EmployeeDetails> name='isActive' control={control} optional />
                    </GridItem>

                    <GridItem col='4' colStart='1'>
                        <el.Divider />
                    </GridItem>

                    <Text size='l'>Виды работ</Text>

                    <GridItem col='4' colStart='1'>
                        <el.form.Combobox<EmployeeDetails, string>
                            name='jobIds' control={control} multiple
                            labelMap={handbook.map.jobs}
                            items={handbook.jobs}
                        />
                    </GridItem>
                </>
            }}
        </comp.Modal>
        : <></>
}

export default UniModal