import {makeUrl} from "../utils/const.js";
import {Link} from "react-router-dom";
// @ts-ignore
import CartButtonComponent from "./CartButtonComponent.tsx";


type Props = {
    product: {
        product_image: string,
        title: string,
        slug: string,
        net_price: string,
        id: number,
        cart_id: number | null,
        description:string,
        grass_price:string,
    }
};
const ProductComponent = ({product}: Props) => {
    return <div>
        <Link to={`/${product.id}/product`} className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
                <img alt={product.slug} src={makeUrl(product?.product_image)}
                     className="size-full object-cover"/>
            </div>
            <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.description}</h3>
            </div>
            <div
                className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                />
                <p className="relative text-lg  font-semibold text-white">₹{product.net_price}
                <span className={"line-through ml-2"}> ₹{product.grass_price}</span>
                </p>
            </div>
        </Link>
        <div className="mt-6">
            <CartButtonComponent sm product={product}/>
        </div>
    </div>
}
export default ProductComponent;
