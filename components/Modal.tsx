import {ReactNode, useEffect} from 'react'
import {UseFormReturn} from 'react-hook-form/dist/types'
import {DefaultValues} from 'react-hook-form/dist/types/form'
import {SubmitHandler, useForm} from 'react-hook-form'

import * as store from 'stores'
import * as ui from 'consta'
import { Button, GridItem, Text } from 'consta'
import * as el from 'elements'






type Props<T extends Id = Id> = {
    defaultValues?: store.DetailsStore<T>
    cols?: number
    title: string
    children: (form: UseFormReturn<T>) => ReactNode
    api: (T) => Promise<resp.Result>
    id?: string
    affectStore: Store
    className: string
    mode: ModalMode
}


const Modal = <T extends Id = Id,>(p: Props<T>) => {
    const form = useForm<T>()

    const state = store.modal.useState()
    const isOpened = state.id == p.id && state.mode == p.mode

    const def = p.defaultValues?.get()

    console.log(`Modal: isOpened = ${isOpened}`, 'state = ', {...state}, 'props = ', { mode: p.mode, id: p.id })

    useEffect(() => {
        console.log('set default values', def)
        if (isOpened) {
            form.reset(def, { keepDefaultValues: true })
        }
    }, [isOpened])

    const cols = p.cols ?? 4

    const onSubmit: SubmitHandler<T> = data => {
        p.api(data).then(x => {
            if (x.status == 'ok') {
                form.reset(undefined, { keepDefaultValues: true })
                store.modal.close()
                p.affectStore.reload()
            }
        })
    }


    const resetForm = _ => {
        form.clearErrors()
        form.reset(undefined, { keepDefaultValues: true })
        store.modal.close()
    }

    return typeof window != 'undefined'
        ? <ui.Modal className={p.className} isOpen={isOpened}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <ui.Grid cols={cols} rowGap='l'>
                    <GridItem col={cols} colStart='1'>
                        <Text size='2xl'>{p.title}</Text>
                    </GridItem>

                    {p.children(form)}

                    <GridItem col={cols} colStart='1'>
                        <el.Divider />
                    </GridItem>

                    <GridItem col={cols} colStart='1' style={{ textAlign: 'end' }}>
                        <el.button.Ghost label='Отмена' type='reset' onClick={resetForm} />&nbsp;&nbsp;
                        <Button size='s' label='Сохранить' type='submit' />
                    </GridItem>
                </ui.Grid>
            </form>
        </ui.Modal>
        : <></>
}

export default Modal