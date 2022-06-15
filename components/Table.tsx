import * as ui from 'consta'
import * as store from 'stores'


type Props<T> = Omit<ui.TableProps<T & ui.TableRow>, 'rows'> & {
    className?: string
    columns: ui.TableColumn<T & ui.TableRow>[]
    filters?: ui.TableFilters<T & ui.TableRow>
    store: store.TableStore<any, any>
    onRowClick?: (id: number) => unknown
}


const Table = <T,>(p: Props<T>) => {
    return <>
        <ui.Table
            {...p}
            borderBetweenRows
            rows={p.store.useData() as (T & ui.TableRow)[]}
            size='l'
            onRowClick={e => p.onRowClick?.(e.id as unknown as number)}
            /*onFiltersUpdated={f => {
                store.company.filter(f.status?.value?.map(x => x.value))
            }}*/
        />
        <ui.Pagination
            currentPage={p.store.usePage()}
            totalPages={p.store.total}
            onChange={v => p.store.page = v}
            size='s' position='left'
        />
    </>
}


export default Table