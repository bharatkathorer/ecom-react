import {ReactElement} from "react";
import NavbarComponent from "./NavbarComponent.tsx";

type Props = {
    children?: ReactElement
}
const FrontAuthLayout = ({children}: Props) => {
    return <>
        <NavbarComponent/>
        {children}
    </>
}
export default FrontAuthLayout;
