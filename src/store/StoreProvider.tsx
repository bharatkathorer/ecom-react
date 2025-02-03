import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import {persist, store} from '../store/store.tsx';
import * as React from "react";

export default function StoreProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persist}>{children}</PersistGate>
        </Provider>
    );
}
