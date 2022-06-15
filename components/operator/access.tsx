import * as ui from 'consta'
import {ReactElement} from 'react'

import * as ic from 'icons'

export const icon: Record<JobAccess, ReactElement> = {
    accepted: <ic.Check size='s' view='success' />,
    waitlisted: <ic.Close size='s' view='alert' />,
    rejected: <ic.Close size='s' view='alert' />
}

export const name: Record<JobAccess, string> = {
    accepted: 'допущен',
    waitlisted: 'на проверке',
    rejected: 'не допущен'
}

export const badge: Record<JobAccess, ui.BadgePropStatus> = {
    accepted: 'success',
    waitlisted: 'warning',
    rejected: 'error'
}

export const Badge = (p: { access: JobAccess }) => <ui.Badge
    view='stroked' size='s'
    status={badge[p.access] ?? 'normal'}
    label={name[p.access] ?? 'неизвестен'}
/>

