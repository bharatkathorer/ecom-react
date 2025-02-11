import AuthLayout from "../layouts/frontend/AuthLayout.tsx";
import {useState} from "react";
import ProductComponent from "../components/ProductComponent.tsx";
import productsApi from "../api/frontend/productsApi.ts";
import InfinityScrollComponent from "../components/InfinityScrollComponent.tsx";

const WelcomePage = () => {

    const [products, setProducts] = useState<any>([]);

    return <AuthLayout pageTitle="Customers also bought">
        <>
            <InfinityScrollComponent apiMethod={(page) => productsApi.index(page)}
                                     setItems={(items) => setProducts(items)}>
                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product: any, index: number) => (
                        <ProductComponent product={product} key={index}/>
                    ))}
                </div>
            </InfinityScrollComponent>
        </>
    </AuthLayout>
}
export default WelcomePage;
