import {makeUrl} from "../utils/const.js";


type Props = {
    product: {
        product_image: string,
        title: string,
        slug: string,
        net_price: string,
    }
};
const ProductComponent = ({product}: Props) => {
    // @ts-ignore
    return <div>
        <div className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
                <img alt={product.slug} src={makeUrl(product?.product_image)}
                     className="size-full object-cover"/>
            </div>
            <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
            </div>
            <div
                className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                />
                <p className="relative text-lg font-semibold text-white">{product.net_price}</p>
            </div>
        </div>
        <div className="mt-6">
            <a
                href={'#'}
                className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
            >
                Add to bag<span className="sr-only">, {product.title}</span>
            </a>
        </div>
    </div>
}
export default ProductComponent;