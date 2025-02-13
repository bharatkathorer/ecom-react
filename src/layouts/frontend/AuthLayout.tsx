import {ReactElement} from "react";
import NavbarComponent from "./NavbarComponent.tsx";

type Props = {
    children?: ReactElement,
    pageTitle?: string
    pageDescription?: string
}
const AuthLayout = ({children, pageTitle, pageDescription}: Props) => {

    return <>
        <NavbarComponent/>

        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {
                    pageTitle &&
                    <h2 className="text-xl font-bold text-gray-900">  {pageTitle}</h2>
                }
                {
                    pageDescription &&
                    <p className="mt-2 text-sm text-gray-500">
                        {pageDescription}
                    </p>
                }
                {children}
            </div>
        </div>
    </>
}
export default AuthLayout;
