import * as ui from '../consta'
import * as icon from '../icons'
import Flexbox from '../elements/Flexbox'
import {useState} from '@hookstate/core'

type Props = {
    placeholder: string
    store: SearchStore
}

const SearchToolbar = (p: Props) => {

    const text = useState('')

    return <Flexbox justify='space-between' width='100%'>
        <ui.TextField
            size='s' leftSide={icon.Search} width='full' placeholder={p.placeholder}
            value={text.get()}
            onChange={e => text.set(e.value ?? '')}
        />&nbsp;&nbsp;&nbsp;
        <ui.Button
            label='найти' view='ghost' size='s'
            onClick={_ => p.store.search(text.get())}
        />
    </Flexbox>
}

export default SearchToolbar