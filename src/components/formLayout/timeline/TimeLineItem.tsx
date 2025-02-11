import {ReactElement} from "react";

type Props = {
    children?: ReactElement,
    icon?: ReactElement | string,
    title?: string,
    subTitle?: string,
    description?: string,
}

const TimeLineItem = ({children, icon, description, subTitle, title}: Props) => {
    return <li className="ms-6 mb-4">
        <span
            className="absolute mt-1 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8
            ring-white">
                {icon ? icon : <svg className="w-2.5 h-2.5 text-blue-800" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"></path>
                </svg>}
        </span>
        {
            title &&
            <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
        }
        {
            subTitle &&
            <time
                className="block mb-2 text-sm font-normal leading-none text-gray-400">
                {subTitle}
            </time>
        }
        {children ? children :
            <p className="text-base font-normal text-gray-500 ">{description}</p>
        }
    </li>
}
export default TimeLineItem;
