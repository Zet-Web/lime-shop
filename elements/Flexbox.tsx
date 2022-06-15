import { Property } from 'csstype'
import { FC } from 'react'


type Props = {
    className?: string
    column?: boolean
    padding?: string
    margin?: string
    gap?: number|string
    floated?: 'left' | 'right'
    flex?: string | number
    align?: Property.AlignItems
    justify?: Property.JustifyContent
    height?: string
    width?: string
}

const Flexbox: FC<Props> = p =>
    <div className={p.className} style={{
        display: 'flex',
        flexDirection: p.column ? 'column' : undefined,
        flex: p.flex,
        alignItems: p.align || 'center',
        justifyContent: p.justify,
        float: p.floated,
        gap: p.gap,
        height: p.height,
        padding: p.padding,
        margin: p.margin,
        width: p.width
    }}>{p.children}</div>



export default Flexbox