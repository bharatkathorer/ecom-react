import {ReactElement} from "react";

type Props = {
    children?: ReactElement
}

const TimeLineComponent = ({children}: Props) => {
    return <ol className="relative border-s border-gray-200 ">
        {children}
    </ol>
}
export default TimeLineComponent;
