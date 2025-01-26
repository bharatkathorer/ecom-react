import {InputHTMLAttributes, ReactElement} from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    suffix?: ReactElement,
};
const InputComponent = ({label, suffix, ...props}: Props) => {
    return <>
        <div>
            {
                (label || suffix) &&
                <div className="flex items-center justify-between">
                    <label htmlFor={props?.id}
                           className="block text-sm/6 font-medium text-gray-900">
                        {label}
                    </label>
                    {suffix}
                </div>
            }

            <div className="mt-2">
                <input
                    {...props}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline
                     outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline
                      focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    </>
}

export default InputComponent;