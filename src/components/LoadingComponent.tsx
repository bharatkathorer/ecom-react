import SpinnerComponent from "./SpinnerComponent.tsx";

const LoadingComponent = ()=>{
    return <div className="flex items-center justify-center text-gray-400 my-4">
                <SpinnerComponent className="h-24 animate-spin "/>
            </div>
}

export default LoadingComponent;
