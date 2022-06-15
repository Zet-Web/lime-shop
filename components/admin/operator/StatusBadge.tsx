import * as ui from 'consta'
import {BadgePropSize} from '@consta/uikit/__internal__/src/components/Badge/Badge'


const StatusBadge = (p: {
    isActive: boolean
    size?: BadgePropSize
    width?: string
}) =>
    <ui.Badge
        size={p.size ?? 's'}
        label={p.isActive ? 'Активна' : 'Неактивна'}
        view='stroked'
        status={p.isActive ? 'success' : 'system'}
        style={{
            width: p.width
        }}
    />


export default StatusBadge