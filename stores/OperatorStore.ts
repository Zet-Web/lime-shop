import { local } from 'lib/api'
import ListStore from './ListStore'
import TableStore from './TableStore'
import DetailsStore from './DetailsStore'



class OperatorDetailsStore extends DetailsStore<Operator> {
    private constructor() {
        super({
            isActive: true,
            orgs: []
        })
        console.log('new OperatorDetailsStore')
    }

    fetch(id: number) {
    }

    static details = new OperatorDetailsStore()
}



class OperatorListStore extends ListStore<req.Operator, Operator> {

    private constructor(api) {
        super(api)
    }

    static all = new OperatorListStore(local.operators.all)
}


class OperatorTableStore extends TableStore<req.Operator, Operator> implements SearchStore{

    private constructor(api) {
        super(api)
        console.log('new OperatorTableStore')
    }


    static list = new OperatorTableStore(local.operators.list)

    search(text) {

    }
}


class OperatorStore {

    static details = OperatorDetailsStore.details
    static all = OperatorListStore.all
    static list = OperatorTableStore.list
}

export default OperatorStore
