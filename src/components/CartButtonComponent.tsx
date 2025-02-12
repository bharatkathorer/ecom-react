import {useState} from "react";
import productsApi from "../api/frontend/productsApi.ts";
import ButtonComponent from "./formLayout/ButtonComponent.tsx";

type Props = {
    product: {
        product_image: string,
        title: string,
        slug: string,
        net_price: string,
        id: number,
        cart_id: number | null,
        description: string,
        grass_price: string,
    },
    sm?: boolean,
};
const CartButtonComponent = ({product, sm}: Props) => {
    const [isCart, setCart] = useState<boolean>(product.cart_id ? true : false)
    const [loading, SetLoading] = useState<boolean>(false)
    const handleAddToCart = async () => {
        SetLoading(true);
        const response: any = await productsApi.addCart(product.id);
        if (response?.data?.success) {
            if (response.data?.message === 'cart added successfully') {
                setCart(true);
            } else {
                setCart(false);
            }
        }
        SetLoading(false);
    }
    return (
        <ButtonComponent onClick={handleAddToCart} loading={loading} disabled={loading} className={`w-full ${sm?'px-4 py-2 text-sm':'px-8 py-3 text-base font-medium'}`}>
            <>
                {isCart ? 'Remove to cart' : 'Add to cart'}
            </>
        </ButtonComponent>

        //     <button
        //     onClick={handleAddToCart}
        //     type="button"
        //     className={`
        //     ${sm?'px-4 py-2 text-sm':'px-8 py-3 text-base font-medium'}
        //     cursor-pointer
        //     flex w-full items-center justify-center rounded-md border
        //      border-transparent bg-indigo-600   text-white
        //      hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        //       focus:ring-offset-gray-50
        //     `}
        // >
        //     {loading &&  <SpinnerComponent className={"animate-spin size-4 mr-2"}/> }  {isCart ? 'Remove to cart' : 'Add to cart'}
        // </button>
    )
}
export default CartButtonComponent;
