'use client'

import * as React from 'react'
import {Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'


type Props = {
    open: boolean,
    close: () => void,
    children: React.ReactElement
}
const ModelComponent = ({open = true, children, close}: Props) => {
    return (
        <Dialog open={open} onClose={() => close && close()} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0  bg-gray-500/75 transition-opacity
              "
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    className="flex min-h-full  justify-center text-center md:items-center md:px-2 lg:px-4">
                    <DialogPanel
                        transition
                        className="flex w-full transform text-left
                        text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300
                        data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4
                        data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
                    >
                        <div
                            className="mx-auto min-w-sm  my-auto bg-white p-4 rounded-xl relative">
                            <button
                                type="button"
                                onClick={() => close && close()}
                                className="absolute right-2 cursor-pointer top-2
                                 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon aria-hidden="true" className="size-6 text-red-700"/>
                            </button>
                            {children}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ModelComponent;
