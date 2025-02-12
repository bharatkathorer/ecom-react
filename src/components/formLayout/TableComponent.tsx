import {ReactNode} from "react";
import {NavLink} from "react-router-dom";
import PaginationComponent from "../PaginateComponent.tsx";
import LoadingComponent from "../LoadingComponent.tsx";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type actionData = {
    title: string,
    href: string,
}
type  Props = {
    title?: string,
    dataKey?: string,
    loading?: boolean,
    description?: string,
    fields: Object[],
    options: any,
    renderSlot?: (key: string, row: any) => ReactNode
    actionSlot?: () => ReactNode,
    actionData?: actionData
}
const TableComponent = ({
                            title,
                            dataKey = 'data',
                            description,
                            fields = [],
                            options = [],
                            renderSlot,
                            actionSlot,
                            actionData,
                            loading
                        }: Props) => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    {
                        title &&
                        <h1 className="text-base font-semibold text-gray-900">
                            {title}
                        </h1>
                    }
                    {
                        description &&
                        <p className="mt-2 text-sm text-gray-700">
                            {description}
                        </p>
                    }
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    {
                        actionSlot ? actionSlot() : actionData?.href && (
                            <NavLink
                                to={actionData.href}
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {actionData.title}
                            </NavLink>)
                    }
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                            <tr>
                                {
                                    fields.map((item: any, index: number) => (<th
                                        key={index}
                                        scope="col"
                                        className="sticky top-16 z-10 border-b border-gray-300 bg-white/75
                                        py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900
                                        backdrop-blur backdrop-filter sm:pl-6 lg:pl-8 uppercase"
                                    >
                                        {item.label}
                                    </th>))
                                }
                            </tr>
                            </thead>
                            {
                                !loading &&
                                <tbody>

                                {(options?.[dataKey] ?? options).map((row: any, rowIdx: number) => (
                                    <tr key={rowIdx}>
                                        {
                                            fields.map((field: any, fieldIndex: number) => (

                                                <td
                                                    key={`${rowIdx}-${fieldIndex}`}
                                                    className={classNames(
                                                        rowIdx !== (options?.[dataKey] ?? options).length - 1 ? 'border-b border-gray-200' : '',
                                                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                                                    )}
                                                >
                                                    {
                                                        renderSlot ? renderSlot(field.key, {
                                                            ...row,
                                                            indexId: rowIdx,
                                                            fieldIndex,
                                                        }) : row[field.key]
                                                    }
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))}
                                </tbody>
                            }
                        </table>
                        {
                            loading &&
                            <div className={'py-16'}>
                                <LoadingComponent/>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <PaginationComponent
                data={options.paginate}
            />
        </div>
    )
}

export default TableComponent;
