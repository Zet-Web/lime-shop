import {createState} from '@hookstate/core'

import ListStore from './ListStore'
import TableStore from './TableStore'
import {local} from 'lib/api'
import DetailsStore from './DetailsStore'




class CompanyDetailsStore extends DetailsStore<CompanyDetails> implements Store {

    private _id?: number

    private constructor() {
        super({
            isActive: true
        })
    }


    fetch (id: number) {
        this._id = id
        local.company.details(id).then(x => {
            if (!('status' in x))
                x ? this.set(x) : this.reset()
        })
    }

    static instance = new CompanyDetailsStore()
}

class CompanyListStore extends ListStore<req.Company, Company> {

    private constructor(api) {
        super(api)
    }

    static all = new CompanyListStore(local.company.all)
}


class CompanyTableStore extends TableStore<req.Company, Company> implements SearchStore {
    private _isActive = createState<boolean|undefined>(undefined)
    private _searchText = ''

    private constructor(api) {
        super(api)
    }

    search (text: string) {
        this.clearPage()
        this._searchText = text
        this.fetch({
            searchText: text,
            isActive: this._isActive.get(),
        })
    }


    filter(isActive?: boolean[]) {
        this.clearPage()
        if (isActive?.length == 1) {
            this._isActive.set(isActive[0])
            this.fetch({
                searchText: this._searchText,
                isActive: isActive[0]
            })
        }
        else this._isActive.set(undefined)
    }

    static list = new CompanyTableStore(local.company.list)
}



class CompanyStore {
    static details = CompanyDetailsStore.instance
    static all = CompanyListStore.all
    static list = CompanyTableStore.list
}

export default CompanyStore


//export const useOrganizations = (): State<OrganizationRow[]> => useState(state)


