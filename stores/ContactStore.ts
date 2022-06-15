import {createState, useState} from '@hookstate/core'
import {DefaultValues} from 'react-hook-form/dist/types/form'

import DetailsStore from './DetailsStore'
import TableStore from './TableStore'


import {local} from 'lib/api'
import {associate} from 'lib/utils'


class ContactHandbookStore {
    private _data = createState<ContactHandbook<number>>({
        roles: [],
        positions: []
    })

    private _map = {
        roles: {},
        positions: {}
    }

    fetch = () =>
        local.contacts.handbook().then(h => {
            if (!('status' in h)) {
                this._map.roles = associate(h.roles)
                this._map.positions = associate(h.positions)

                this._data.set({
                    roles: h.roles.map(x => x.id),
                    positions: h.positions.map(x => x.id),
                })
            }
        })

    get map() {
        return this._map
    }

    use = () => useState(this._data).get()
    get = (field: keyof ContactHandbook) => this._data.get()[field]

    get roles() {
        return this.get('roles')
    }

    get positions() {
        return this.get('positions')
    }

    static instance = new ContactHandbookStore()
}


const def: DefaultValues<Contact> = {

}

class ContactDetailsStore extends DetailsStore<Contact> {

    private constructor() {
        super(def)
        console.log('new ContactDetailsStore')
    }

    fetch(id: number) {
    }

    static instance = new ContactDetailsStore()
}


class ContactTableStore extends TableStore<req.Contact, Contact> {

    private constructor(api) {
        super(api)
    }

    async save() {
        //await local.company.contact.save(this._curr.get())
    }

    static list = new ContactTableStore(local.contacts.list)
}


class ContactStore {

    static handbook = ContactHandbookStore.instance
    static list = ContactTableStore.list
    static details = ContactDetailsStore.instance
}


export default ContactStore