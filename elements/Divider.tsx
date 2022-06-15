import { FC } from 'react'

import sty from 'styles/divider.module.sass'

type Props = {

}

const Divider: FC = p => {
    return <div className={sty.divider}>
        {p.children}
    </div>
}

export default Divider