import * as ui from 'consta'


export const name: Record<BarrierStatus, string> = {
    ok: 'пройден'
}

export const badge: Record<BarrierStatus, ui.BadgePropStatus> = {
    ok: 'success'
}

export const Badge = (p: { status: BarrierStatus }) => <ui.Badge
    view='stroked' size='s'
    status={badge[p.status] ?? 'normal'}
    label={name[p.status] ?? 'неизвестен'}
/>

