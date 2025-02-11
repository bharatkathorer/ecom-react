import AuthLayout from "../../../layouts/frontend/AuthLayout.tsx";
import {useEffect, useState} from "react";
import productsApi from "../../../api/frontend/productsApi.ts";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/outline";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import {formatDate, makeUrl, orderStatus} from "../../../utils/const.tsx";
import {Link} from "react-router-dom";


const OrdersPage = () => {
    const [orders, setOrders] = useState<any>([])

    useEffect(() => {
        loadOrders();
    }, []);
    const loadOrders = async () => {
        const response: any = await productsApi.orders();
        if (response?.data?.success) {
            setOrders(response.data.orders);
        }
    }

    return (
        <AuthLayout
            pageTitle="Order history"
            pageDescription="Check the status of recent orders, manage returns, and discover similar products."
        >
            <div className="mt-16">
                {
                    orders.length == 0 && <>
                        <div className="py-24 text-red-600 text-center text-xl">
                            Order is empty please order products
                        </div>
                    </>
                }
                <div className={'grid gap-4'}>
                    {orders.map((order: any) => (

                        <div
                            key={order.order_id}
                            className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                        >
                            <h3 className="sr-only">
                                Order placed on <time
                                dateTime={order.order_created_at}>{order.order_created_at}</time>
                            </h3>

                            <div
                                className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                                <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                                    <div>
                                        <dt className="font-medium text-gray-900">Order number</dt>
                                        <dd className="mt-1 text-gray-500">{order.order_id}</dd>
                                    </div>
                                    <div className="hidden sm:block">
                                        <dt className="font-medium text-gray-900">Date placed</dt>
                                        <dd className="mt-1 text-gray-500">
                                            <time
                                                dateTime={order.order_created_at}>{formatDate(order.order_created_at)}</time>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-900">Total amount</dt>
                                        <dd className="mt-1 font-medium text-gray-900">₹{order.net_price}</dd>
                                    </div>
                                </dl>

                                <Menu as="div" className="relative flex justify-end lg:hidden">
                                    <div className="flex items-center">
                                        <MenuButton
                                            className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                                                        <span
                                                            className="sr-only">Options for order {order.order_id}</span>
                                            <EllipsisVerticalIcon aria-hidden="true" className="size-6"/>
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                            <MenuItem>
                                                <Link
                                                    to={`/orders/${order.order_id}`}
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                >
                                                    View Order
                                                </Link>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>

                                <div
                                    className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                    <Link

                                        to={`/orders/${order.order_id}`}
                                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span>View Order</span>
                                        <span className="sr-only">{order.number}</span>
                                    </Link>

                                </div>
                            </div>

                            {/* Products */}
                            <h4 className="sr-only">Items</h4>
                            <ul role="list" className="divide-y divide-gray-200">
                                <li key={order.order_id} className="p-4 sm:p-6">
                                    <div className="flex items-center sm:items-start">
                                        <div
                                            className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40">
                                            <img alt={order.slug} src={makeUrl(order.product_image)}
                                                 className="size-full object-cover"/>
                                        </div>
                                        <div className="ml-6 flex-1 text-sm">
                                            <div
                                                className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                <h5>{order.title}</h5>
                                                <p className="mt-2 sm:mt-0">₹{order.net_price}</p>
                                            </div>
                                            <p className="hidden text-gray-500 sm:mt-2 sm:block line-clamp-2">{order.description}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 sm:flex sm:justify-between">
                                        <div className="flex items-center">
                                            <CheckCircleIcon aria-hidden="true"
                                                             className="size-5 text-green-500"/>
                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                {orderStatus(order.status)}
                                            </p>
                                        </div>

                                        <div
                                            className="mt-6 flex items-center divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                                            <div className="flex flex-1 justify-center pr-4">
                                                <Link
                                                    to={`/${order.id}/product`}
                                                    className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                                                >
                                                    View Product
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </AuthLayout>
    )
}

export default OrdersPage;
