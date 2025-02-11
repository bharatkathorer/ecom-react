import {Link} from "react-router-dom";
import {ReactElement} from "react";

type Props = {
    href: string,
    className?: string
    title?: string,
    children?: ReactElement,
}
const LinkComponent = ({href, className, title, children}: Props) => {
    return <Link to={href} className={`text-blue-700 hover:text-blue-500 hover:underline  ${className}`}>
        {children ? children : title}
    </Link>
}
export default LinkComponent;
