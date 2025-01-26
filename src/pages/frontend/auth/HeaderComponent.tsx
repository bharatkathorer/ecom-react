import {ReactElement} from "react";
import {Link} from "react-router-dom";

type props = {
    children?: ReactElement,
    title?: String,
}
const HeaderComponent = ({children, title = "Sign in to your account"}: props) => {
    return <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to={'/'}>
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
            </Link>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                {title}
            </h2>
        </div>
        {children}
    </div>
}
export default HeaderComponent;