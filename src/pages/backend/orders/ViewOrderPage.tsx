import {useNavigate, useParams} from "react-router-dom";
import AuthLayout from "../../../layouts/backend/AuthLayout.tsx";
import {useEffect, useState} from "react";
import orderApi from "../../../api/backend/orderApi.ts";
import TimeLineComponent from "../../../components/formLayout/timeline/TimeLineComponent.tsx";
import TimeLineItem from "../../../components/formLayout/timeline/TimeLineItem.tsx";
import {formatDate, makeUrl, orderStatus, orderStatusList} from "../../../utils/const.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import {useFormik} from "formik";
import LoadingComponent from "../../../components/LoadingComponent.tsx";
import FormComponent from "../../../components/FormComponent.tsx";

const ViewOrderPage = () => {
    const {orderId} = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>({})
    const [editLoading, setEditLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setEditLoading(true);
        findOrder();
    }, []);
    const findOrder = async () => {
        const response: any = await orderApi.find(orderId);
        if (response.data.success) {
            response.data.order_transactions = await JSON.parse(response.data.order_transactions)
            setOrder(response.data);
            await form.setFieldValue('status', response.data.status)
        } else {
            setEditLoading(false);
            navigate('/admin/orders');
        }
        setEditLoading(false);
    }
    const form = useFormik({
        initialValues: {
            note: '',
            status: 0,
        },
        onSubmit: () => handleSubmit()
    })
    const handleSubmit = async () => {
        setLoading(true);
        const response: any = await orderApi.update({
            ...form.values,
            order_id: orderId
        });
        if (response.data.success) {
            await form.setFieldValue('note', '')
            await findOrder();
        }
        setLoading(false)
    }

    if (editLoading) {
        return <AuthLayout>
            <LoadingComponent/>
        </AuthLayout>
    }
    // @ts-ignore
    return <AuthLayout>
        <div className="grid md:grid-cols-4 gap-6 gap-y-8">
            <div className="col-span-3">
                <div className="max-w-xl">
                    <h1 className="text-base font-semibold text-gray-900">Manage Order</h1>

                    <dl className="mt-4 text-sm font-medium">
                        <dt className="text-gray-900">Tracking number</dt>
                        <dd className="mt-2 text-indigo-600">{order.order_id}</dd>
                    </dl>
                </div>

                <FormComponent  onSubmit={() => form.submitForm()} className='mt-10 border-t pt-10 grid gap-4  border-gray-200'>
                    <div>
                        <label
                            className="block text-sm/6 font-medium text-gray-900 capitalize">
                            Update order status
                        </label>
                        <select
                            onInput={(val: any) => form.setFieldValue('status', val.target.value)}
                            value={form.values.status}
                            id="location"
                            name="location"
                            defaultValue="Canada"
                            className="col-start-1 mt-1 row-start-1 w-full
                             appearance-none rounded-md bg-white
                              py-1.5 pl-3 pr-8 text-base text-gray-900
                               outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            {Object.entries(orderStatusList).map(([key, value]) => (
                                <option value={key} key={key}>
                                    {/*@ts-ignore*/}
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <InputComponent label={"Note"}
                                    onInput={(val: any) => form.setFieldValue('note', val.target.value)}
                                    defaultValue={form.values.note}
                                    textarea
                                    name={'note'}
                    />
                    <div>
                        <ButtonComponent loading={loading} disabled={loading} type={'submit'} name={'Update status'}/>
                    </div>
                </FormComponent>
                <div className="mt-10 border-t border-gray-200">

                    <div key={order.id} className="flex space-x-6 border-b border-gray-200 py-10">
                        <img
                            alt={order.slug}
                            src={makeUrl(order.product_image)}
                            className="size-20 flex-none rounded-lg bg-gray-100 object-cover sm:size-40"
                        />
                        <div className="flex flex-auto flex-col">
                            <div>
                                <p className="font-medium text-gray-900">
                                    {order.title}
                                </p>
                                <p className="mt-2 text-sm text-gray-600">{order.description}</p>
                            </div>
                            <div className="mt-6 flex flex-1 items-end">
                                <dl className="flex divide-x divide-gray-200 text-sm">
                                    <div className="flex pr-4 sm:pr-6">
                                        <dt className="font-medium text-gray-900">Quantity</dt>
                                        <dd className="ml-2 text-gray-700">1</dd>
                                    </div>
                                    <div className="flex pl-4 sm:pl-6">
                                        <dt className="font-medium text-gray-900">Price</dt>
                                        <dd className="ml-2 text-gray-700">₹{order.order_net_price}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="sm:ml-40 sm:pl-6">
                        <h3 className="sr-only">Your information</h3>

                        <h4 className="sr-only">Addresses</h4>
                        <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                            <div>
                                <dt className="font-medium text-gray-900">Shipping address</dt>
                                <dd className="mt-2 text-gray-700">
                                    <address className="not-italic">
                                        <span className="block">{order.address?.address}</span>
                                        <span className="block">{order.address?.pincode}</span>
                                    </address>
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-900">User Details</dt>
                                <dd className="mt-2 text-gray-700">
                                    <address className="not-italic">
                                        <span className="block">{order.user_name}</span>
                                        <span className="block">{order.user_email}</span>
                                    </address>
                                </dd>
                            </div>
                        </dl>

                        <h3 className="sr-only">Summary</h3>

                        <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                            <div className="flex justify-between">
                                <dt className="font-medium text-gray-900">Subtotal</dt>
                                <dd className="text-gray-700">₹{order.order_grass_price}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="flex font-medium text-gray-900">
                                    Discount
                                </dt>
                                <dd className="text-gray-700">₹{order.order_discount}</dd>
                            </div>
                            {/*<div className="flex justify-between">*/}
                            {/*    <dt className="font-medium text-gray-900">Shipping</dt>*/}
                            {/*    <dd className="text-gray-700">₹5.00</dd>*/}
                            {/*</div>*/}
                            <div className="flex justify-between">
                                <dt className="font-medium text-gray-900">Total</dt>
                                <dd className="text-gray-900">₹{order.order_net_price}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

            </div>
            <div>
                <h1 className="text-base font-semibold text-gray-900">History</h1>
                <TimeLineComponent>
                    <>
                        <TimeLineItem
                            title={orderStatus(0)}
                            subTitle={formatDate(order.order_created_at)}
                            description={'Order Created'}
                        />
                        {
                            order?.order_transactions?.filter((i: any) => i.id).map((history: any) => (
                                <TimeLineItem
                                    key={history.id}
                                    title={orderStatus(history.status)}
                                    subTitle={formatDate(history.created_at)}
                                    description={history.note}
                                />
                            ))
                        }
                    </>
                </TimeLineComponent>
            </div>


        </div>
    </AuthLayout>
}

export default ViewOrderPage;
