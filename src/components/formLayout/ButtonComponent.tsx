import {ButtonHTMLAttributes, ReactElement, useState} from "react";
import SpinnerComponent from "../SpinnerComponent.tsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactElement,
    name?: String,
    loading?: boolean
    onClick?: () => void
}
const ButtonComponent = ({children, loading, disabled, onClick, name, ...rest}: Props) => {
    const [selfLoading, setLoading] = useState<boolean>(false)
    const handleClick = (e: any) => {
        if (!selfLoading) {
            setLoading(true);
            if (disabled || loading) {
                e.preventDefault();
                return;
            }
            onClick && onClick();
            setTimeout(() => setLoading(false), 100);
        }

    }
    return <>
        <button
            className={`flex  justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-sm 
                items-center space-x-2 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                ${(disabled || loading || selfLoading) ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
            onClick={handleClick}
            {...rest}
        >
            {loading && <SpinnerComponent className='size-5 animate-spin'/>} {children && children} {name && name}
        </button>
    </>
}

export default ButtonComponent;
