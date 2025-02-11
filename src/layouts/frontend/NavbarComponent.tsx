'use client'

import {useState} from 'react'
import {Dialog, DialogBackdrop, DialogPanel, PopoverGroup,} from '@headlessui/react';
import {Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import authApi from "../../api/frontend/AuthApi.ts";
import {handleLogoutUser} from "../../utils/const.tsx";

const navigation = {
    categories: [],
    pages: [
        {name: 'Orders', href: '/orders'},
        // {name: 'Stores', href: '#'},
    ],
}

const NavbarComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const {user, loading, login} = useSelector((state: any) => state.auth);
    const handleLogout = async () => {
        if (!loading) {
            const response: any = await authApi.logout();
            if (response.data.success) {
                handleLogoutUser(dispatch);
                navigate('/');
            }
        }
    }
    return (
        <div className="bg-white">
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <span className="absolute -inset-0.5"/>
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6"/>
                            </button>
                        </div>


                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {navigation.pages.map((page: any) => (
                                <div key={page.name} className="flow-root">
                                    <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                        {page.name}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {
                                login ? <>
                                    <div className="flow-root">
                                        <div onClick={handleLogout}
                                             className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                                            Logout
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="flow-root">
                                        <Link to={'/login'} className="-m-2 block p-2 font-medium text-gray-900">
                                            Sign in
                                        </Link>
                                    </div>
                                    <div className="flow-root">
                                        <Link to={'/register'} className="-m-2 block p-2 font-medium text-gray-900">
                                            Create account
                                        </Link>
                                    </div>
                                </>
                            }

                        </div>

                        <div className="border-t border-gray-200 px-4 py-6">

                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative bg-white">
                {/*<p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">*/}
                {/*    Get free delivery on orders over $100*/}
                {/*</p>*/}

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            >
                                <span className="absolute -inset-0.5"/>
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6"/>
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to="/">
                                    <span className="sr-only">Your Company</span>
                                    LOGO
                                    {/*<img*/}
                                    {/*    alt=""*/}
                                    {/*    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"*/}
                                    {/*    className="h-8 w-auto"*/}
                                    {/*/>*/}
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.pages.map((page: any) => (
                                        <Link
                                            key={page.name}
                                            to={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverGroup>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {
                                        login ? <>
                                            <div onClick={handleLogout}
                                                 className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer">
                                                Logout
                                            </div>
                                        </> : <>
                                            <Link to="/login"
                                                  className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                Sign in
                                            </Link>
                                            <span aria-hidden="true" className="h-6 w-px bg-gray-200"/>
                                            <Link to="/register"
                                                  className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                Create account
                                            </Link>
                                        </>
                                    }
                                </div>

                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon aria-hidden="true" className="size-6"/>
                                    </a>
                                </div>

                                {
                                    login && <>
                                        <div className="ml-4 flow-root lg:ml-6">
                                            <Link to="/cart" className="group -m-2 flex items-center p-2">
                                                <ShoppingBagIcon
                                                    aria-hidden="true"
                                                    className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                                />
                                                <span
                                                    className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                            {user?.cart_items ?? 0}
                                        </span>
                                                <span className="sr-only">items in cart, view bag</span>
                                            </Link>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
export default NavbarComponent;
