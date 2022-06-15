import * as icon from 'icons'
import {ReactNode} from 'react'

export const accessIcon: Record<EmployeeAccess, ReactNode> = {
    allowed: <icon.Check size='s' view='success' />,
    restricted: <icon.Warning size='s' view='warning' />,
    denied: <icon.Close size='s' view='alert' />,
}