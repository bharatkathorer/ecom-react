import FrontAuthLayout from "../layouts/FrontAuthLayout.tsx";
import {useEffect, useState} from "react";
import ProductComponent from "../components/ProductComponent.tsx";
import productsApi from "../api/productsApi.ts";

const WelcomePage = () => {

    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response: any = await productsApi.index();
        if (response?.data?.success) {
            setProducts(response?.data.data);
        }
    }

    return <FrontAuthLayout>
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">Customers also bought</h2>
                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product: any, index: number) => (
                            <ProductComponent product={product} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    </FrontAuthLayout>
}
export default WelcomePage;
