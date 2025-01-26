import {Link} from "react-router-dom";
import HeaderComponent from "./HeaderComponent.tsx";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";

const RegisterPage = () => {
    return (
        <>
            <HeaderComponent title={' Register to your account'}>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <InputComponent
                            label={'Email address'}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                        />
                        <InputComponent
                            label={'Password'}
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="password"
                        />
                        <ButtonComponent name={'Submit'} type="submit"/>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have account? {' '}
                        <Link to={'/login'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login now
                        </Link>
                    </p>
                </div>
            </HeaderComponent>


        </>
    )
}

export default RegisterPage;
