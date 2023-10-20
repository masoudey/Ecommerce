import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client.ts';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n.config.ts';
import './index.css';
import Root, {
    loader as rootLoader,
    action as rootAction,
} from './routes/Root.tsx';
import ErrorPage from './ErrorPage.tsx';
import Profile from './routes/Profile.tsx';
import EditProfile from './routes/EditProfile.tsx';
import Index from './routes';
import SignIn from './routes/Signin.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import Signup from './routes/Signup.tsx';
import Product from './routes/Product.tsx';
// import { parsedUserInfo } from './redux/slices/authSlice.ts';

// const userInfo = parsedUserInfo;

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Index />, loader: rootLoader },
                    {
                        path: '/signIn',
                        element: <SignIn />,
                    },
                    {
                        path: '/signup',
                        element: <Signup />,
                    },
                    {
                        path: 'products/:productId',
                        element: <Product />,
                    },
                    //             {
                    //                 path: 'contacts/:contactId',
                    //                 element: <Profile />,
                    //                 // loader: contactLoader,
                    //                 // action: contactAction,
                    //             },
                    //             {
                    //                 path: 'contacts/:contactId/edit',
                    //                 element: <EditProfile />,
                    //                 // loader: contactLoader,
                    //                 // action: editAction,
                    //             },
                    //             {
                    //                 path: 'contacts/:contactId/destroy',
                    //                 // action: destroyAction,
                    //                 errorElement: <div>Oops! There was an error. </div>,
                    //             },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <ApolloProvider client={client}>
                <I18nextProvider i18n={i18n}>
                    <RouterProvider router={router} />
                </I18nextProvider>
            </ApolloProvider>
        </React.StrictMode>
    </Provider>
);
