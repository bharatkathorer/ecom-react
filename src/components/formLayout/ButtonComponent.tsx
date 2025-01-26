import {ButtonHTMLAttributes, ReactElement} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactElement,
    name?: String,
}
const ButtonComponent = ({children, name, ...rest}: Props) => {
    return <>
        <button
            className="flex w-full justify-center
             rounded-md bg-indigo-600 px-3 py-1.5
             text-sm/6 font-semibold text-white shadow-sm
             hover:bg-indigo-500 focus-visible:outline
              focus-visible:outline-2
               focus-visible:outline-offset-2
               focus-visible:outline-indigo-600"
            {...rest}
        >
            {children && children} {name && name}
        </button>
    </>
}

export default ButtonComponent;