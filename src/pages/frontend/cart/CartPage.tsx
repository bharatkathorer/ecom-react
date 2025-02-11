import {QuestionMarkCircleIcon, XMarkIcon} from '@heroicons/react/20/solid'
import AuthLayout from "../../../layouts/frontend/AuthLayout.tsx";
import productsApi from "../../../api/frontend/productsApi.ts";
import {useEffect, useState} from "react";
import {makeUrl} from "../../../utils/const.tsx";
import addressApi from "../../../api/frontend/addressApi.ts";
import ModelComponent from "../../../components/ModelComponent.tsx";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import {Radio, RadioGroup} from "@headlessui/react";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import FormComponent from "../../../components/FormComponent.tsx";


const CartPage = () => {

    // const {loading} = useSelector((state: any) => state);
    const navigate = useNavigate();
    const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState<any>(null)
    const [cartList, setCartList] = useState<any>([]);
    const [address, setAddress] = useState<any>([]);
    const [openAddressModel, setOpenAddressModel] = useState<boolean>(false);

    const addressForm = useFormik({
        initialValues: {
            pincode: '',
            address: '',
            id: null
        },
        onSubmit: () => handleStoreAddress()
    })

    useEffect(() => {
        handleLoadCarts();
        handleLoadAddress();
    }, []);

    useEffect(() => {
        setSelectedDeliveryAddress(address.find((i: any) => i.is_default))
    }, [address]);
    const handleLoadCarts = async () => {
        const response: any = await productsApi.cartList();
        if (response?.data?.success) {
            setCartList(response.data.carts);
        }
    }
    const handleLoadAddress = async () => {
        const response: any = await addressApi.index();
        if (response?.data?.success) {
            setAddress(response.data.addresses);
        }
    }

    const handleRemoveCart = async (productId: any) => {
        const response: any = await productsApi.addCart(productId);
        if (response?.data?.success) {
            await handleLoadCarts();
        }
    }

    const handleStoreAddress = async () => {

        const response: any = await (addressForm.values.id ? addressApi.update(addressForm.values.id, addressForm.values) : addressApi.store(addressForm.values));
        if (response?.data?.success) {
            if (addressForm.values.id) {
                await handleLoadAddress();
            } else {
                const {auth, success, message, ...rest} = response.data;
                setAddress([
                    ...address,
                    rest
                ]);
            }
            addressForm.resetForm();
            setOpenAddressModel(false);
        }

    }
    const handleCheckout = async () => {
        const response: any = await productsApi.checkout({
            address_id: selectedDeliveryAddress?.id,
            cart_ids: cartList.map((item: any) => item.cart_id)
        })
        // console.log(response);
        if (response?.data?.success) {
            navigate('/orders');
        }
    }
    const handleEditAddress = (add: any) => {
        addressForm.setValues(add);
        setOpenAddressModel(true);
    }

    const totalPrice: number = cartList.reduce((old: number, _new: any) => old + _new.net_price, 0);

    return (
        <AuthLayout
            pageTitle="Shopping Cart"
            pageDescription="Check the status of recent orders, manage returns, and discover similar products."
        >
            <div>
                <ModelComponent open={openAddressModel} close={() => setOpenAddressModel(false)}>
                    <FormComponent className="space-y-6 w-full mt-4"
                                   onSubmit={() => addressForm.submitForm()}>
                        <>
                            <InputComponent
                                onInput={(e: any) => {
                                    addressForm.setFieldValue('pincode', e.target.value);
                                }}
                                defaultValue={addressForm.values.pincode}
                                label={'Pincode'}
                                id="pincode"
                                name="pincode"
                                type="number"
                                required
                                autoComplete="pincode"
                            />
                            <InputComponent
                                onInput={(e: any) => {
                                    addressForm.setFieldValue('address', e.target.value);
                                }}
                                defaultValue={addressForm.values.address}
                                label={'Address'}
                                id="address"
                                name="address"
                                textarea
                                required
                                autoComplete="email"
                            />
                            <div className="flex justify-end">
                                <div>
                                    <ButtonComponent type="submit" name={addressForm.values.id ? 'Update' : 'Submit'}/>
                                </div>
                            </div>
                        </>
                    </FormComponent>
                </ModelComponent>

                <div className="mt-16">
                    {
                        (cartList.length) ? <>

                            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                                    <h2 id="cart-heading" className="sr-only">
                                        Items in your shopping cart
                                    </h2>
                                    <ul role="list"
                                        className="divide-y divide-gray-200 border-b border-t border-gray-200">
                                        {cartList.map((product: any) => (
                                            <li key={product.id} className="flex py-6 sm:py-10">
                                                <div className="shrink-0">
                                                    <img
                                                        alt={product.slug}
                                                        src={makeUrl(product.product_image)}
                                                        className="size-24 rounded-md object-cover sm:size-48"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                    <div
                                                        className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <h3 className="text-sm">
                                                                    <a href={product.href}
                                                                       className="font-medium text-gray-700 hover:text-gray-800">
                                                                        {product.title}
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                            <div className="mt-1 flex text-sm">
                                                                <p className="text-gray-500 truncate">{product.description}</p>
                                                                {product.size ? (
                                                                    <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                                                                ) : null}
                                                            </div>
                                                            <div className="flex-row     space-x-2 ">
                                                                <p className="mt-1 text-sm font-medium text-gray-900"> ₹{product.discount} Off</p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 sm:mt-0 sm:pr-9">

                                                            <div className="absolute right-0 top-0">
                                                                <button type="button"
                                                                        onClick={() => handleRemoveCart(product.id)}
                                                                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                                                                    <span className="sr-only">Remove</span>
                                                                    <XMarkIcon aria-hidden="true" className="size-5"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="mt-4 flex space-x-2 text-sm ">
                                                        Buy Price ₹{product.net_price} <span
                                                        className={'line-through ml-2 text-gray-700'}>
                                                       ₹{product.grass_price}
                                                    </span>
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                {/* Order summary */}
                                <section
                                    aria-labelledby="summary-heading"
                                    className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sticky top-4"
                                >
                                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                        Order summary
                                    </h2>

                                    <dl className="mt-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-gray-600">Subtotal</dt>
                                            <dd className="text-sm font-medium text-gray-900">₹{totalPrice}</dd>
                                        </div>
                                        <div
                                            className="flex items-center justify-between border-t border-gray-200 pt-4">
                                            <dt className="flex items-center text-sm text-gray-600">
                                                <span>Shipping estimate</span>
                                                <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">Learn more about how shipping is calculated</span>
                                                    <QuestionMarkCircleIcon aria-hidden="true" className="size-5"/>
                                                </a>
                                            </dt>
                                            <dd className="text-sm font-medium text-gray-900">₹100</dd>
                                        </div>
                                        <div
                                            className="flex items-center justify-between border-t border-gray-200 pt-4">
                                            <dt className="flex text-sm text-gray-600">
                                                <span>Tax estimate</span>
                                                <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                                                    <span
                                                        className="sr-only">Learn more about how tax is calculated</span>
                                                    <QuestionMarkCircleIcon aria-hidden="true" className="size-5"/>
                                                </a>
                                            </dt>
                                            <dd className="text-sm font-medium text-gray-900">₹0</dd>
                                        </div>
                                        <div
                                            className="flex items-center justify-between border-t border-gray-200 pt-4">
                                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                                            <dd className="text-base font-medium text-gray-900">₹{totalPrice + 100}</dd>
                                        </div>

                                        <div className="mt-10 border-t border-gray-200 pt-10">
                                            <fieldset>
                                                <legend className="text-lg font-medium text-gray-900">Delivery address
                                                </legend>
                                                <RadioGroup
                                                    value={selectedDeliveryAddress}
                                                    onChange={setSelectedDeliveryAddress}
                                                    className="mt-4 grid grid-cols-1 gap-y-2 "
                                                >
                                                    {address.map((deliveryMethod: any) => (
                                                        <Radio
                                                            key={deliveryMethod.id}
                                                            value={deliveryMethod}
                                                            aria-label={deliveryMethod.title}
                                                            aria-description={`${deliveryMethod.pincode} for ${deliveryMethod.id}`}
                                                            className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                                                        >
                                                          <span className="flex flex-1 ">
                                                            <span className="flex flex-col">
                                                              <span
                                                                  className="block text-sm font-medium text-gray-900">{deliveryMethod.pincode}</span>
                                                              <span
                                                                  className="mt-1 flex items-center text-sm text-gray-500">
                                                                {deliveryMethod.address}
                                                              </span>

                                                            </span>
                                                              <div
                                                                  onClick={() => handleEditAddress(deliveryMethod)}
                                                                  className={'flex justify-end text-blue-600 hover:text-blue-400 font-semibold absolute right-4 bottom-2'}>
                                                                Edit
                                                            </div>

                                                          </span>
                                                            <CheckCircleIcon
                                                                aria-hidden="true"
                                                                className="size-5 text-indigo-600 group-[&:not([data-checked])]:hidden"
                                                            />
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                            />
                                                        </Radio>
                                                    ))}
                                                </RadioGroup>
                                            </fieldset>
                                        </div>
                                        <button
                                            className="cursor-pointer text-blue-600 font-semibold hover:underline hover:text-blue-500"
                                            onClick={() => setOpenAddressModel(true)}>
                                            {address.length ? 'Add new address' : 'Please add delivery address'}
                                        </button>
                                    </dl>

                                    <FormComponent className="mt-6" onSubmit={handleCheckout}>
                                        <button
                                            type="submit"
                                            className="w-full rounded-md border border-transparent bg-indigo-600
                                            px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700
                                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                                             focus:ring-offset-gray-50"
                                        >
                                            Checkout
                                        </button>
                                    </FormComponent>
                                </section>
                            </div>
                        </> : <>

                            <div className="py-24 text-red-600 text-center text-xl">
                                Cart is empty please add products in cart
                            </div>
                        </>
                    }
                </div>
            </div>
        </AuthLayout>
    )
}
export default CartPage;
