import {useState} from "react";
import productsApi from "../api/frontend/productsApi.ts";

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
    const handleAddToCart = async () => {
        const response: any = await productsApi.addCart(product.id);
        if (response?.data?.success) {
            if (response.data?.message === 'cart added successfully') {
                setCart(true);
            } else {
                setCart(false);
            }
        }
    }
    return (<button
        onClick={handleAddToCart}
        type="button"
        className={`
        ${sm?'px-4 py-2 text-sm':'px-8 py-3 text-base font-medium'}
        cursor-pointer
        flex w-full items-center justify-center rounded-md border
         border-transparent bg-indigo-600   text-white 
         hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          focus:ring-offset-gray-50
        `}
    >
        {isCart ? 'Remove to cart' : 'Add to cart'}
    </button>)
}
export default CartButtonComponent;
