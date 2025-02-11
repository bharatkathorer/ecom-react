import AuthLayout from "../../../layouts/frontend/AuthLayout.tsx";
import {useParams} from "react-router-dom";
import {CheckIcon, StarIcon} from '@heroicons/react/20/solid'
import {ShieldCheckIcon} from '@heroicons/react/24/outline'
import {useEffect, useState} from "react";
import ProductsApi from "../../../api/frontend/productsApi.ts";
import {makeUrl} from "../../../utils/const.tsx";
import CartButtonComponent from "../../../components/CartButtonComponent.tsx";


const reviews = {average: 4, totalCount: 1624}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const ViewProduct = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState<any>({})
    useEffect(() => {
        loadProduct();
    }, []);
    const loadProduct = async () => {
        const response: any = await ProductsApi.find(productId);
        if (response.data.success) {
            setProduct(response.data);
        }
    }
    if (!product?.id) {
        return <></>;
    }
    return <AuthLayout>

        <div
            className="lg:grid  lg:grid-cols-2 lg:gap-x-8 ">
            {/* Product details */}
            <div className="lg:max-w-lg lg:self-end">
                <div className="mt-4">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.title}</h1>
                </div>

                <section aria-labelledby="information-heading" className="mt-4">
                    <h2 id="information-heading" className="sr-only">
                        Product information
                    </h2>

                    <div className="flex items-center">
                        <p className="text-lg text-gray-900 sm:text-xl">₹{product.net_price}</p>

                        <div className="ml-4 border-l border-gray-300 pl-4">
                            <h2 className="sr-only">Reviews</h2>
                            <div className="flex items-center">
                                <div>
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                aria-hidden="true"
                                                className={classNames(
                                                    reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                    'size-5 shrink-0',
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                </div>
                                <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-6">
                        <p className="text-base text-gray-500">{product.description}</p>
                    </div>

                    <div className="mt-6 flex items-center">
                        <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500"/>
                        <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                    </div>
                </section>
            </div>

            {/* Product image */}
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                <img alt={product.imageAlt} src={makeUrl(product.product_image)}
                     className="aspect-square w-full rounded-lg object-cover"/>
            </div>

            {/* Product form */}
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                <section aria-labelledby="options-heading">
                    <h2 id="options-heading" className="sr-only">
                        Product options
                    </h2>

                    <div>
                        <div className="mt-4">
                            <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                                <span>
                                  ₹ {product.discount} Off
                                </span>

                            </a>
                        </div>
                        <div className="mt-10">
                            <CartButtonComponent product={product}/>
                        </div>
                        <div className="mt-6 text-center">
                            <a href="#" className="group inline-flex text-base font-medium">
                                <ShieldCheckIcon
                                    aria-hidden="true"
                                    className="mr-2 size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                />
                                <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </AuthLayout>
}


export default ViewProduct;
// 'use client'



