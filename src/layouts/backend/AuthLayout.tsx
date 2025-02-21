'use client'

import {ReactNode} from 'react'


type Props = {
    children?: ReactNode,
}
const AuthLayout = (props: Props) => {


    return (
        <div className="lg:pl-72">
            <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                    {props?.children}
                </div>
            </main>
        </div>
    )
}

export default AuthLayout;
