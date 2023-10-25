import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// import Home from './ui/Home.jsx';
// import Menu, { loader as menuLoader } from './features/menu/Menu.jsx';
import {loader as menuLoader} from './features/menu/Menu.jsx';
// import Cart from './features/cart/Cart.jsx';
/*import CreateOrder, {
 action as createAction,
 } from './features/order/CreateOrder.jsx';*/
import {action as createAction} from './features/order/CreateOrder.jsx';
// import Order, {loader as orderLoader} from './features/order/Order.jsx';
import {loader as orderLoader} from './features/order/Order.jsx';
import {action as updateOrderAction} from './features/order/UpdateOrder.jsx';
// import AppLayout from './ui/AppLayout.jsx';
// import Error from './ui/Error.jsx';
import {lazy, Suspense} from 'react';
import Loader from './ui/Loader.jsx';

/*
 // Normal or Simple Way of using React Browser Router Dom
 const router = createBrowserRouter([
 {
 element: <AppLayout />,
 errorElement: <Error />,
 children: [
 {
 path: '/',
 element: <Home />,
 },
 {
 path: '/menu',
 element: <Menu />,
 errorElement: <Error />,
 loader: menuLoader,
 },
 {
 path: '/cart',
 element: <Cart />,
 },
 {
 path: '/order/new',
 element: <CreateOrder />,
 action: createAction,
 },
 {
 path: '/order/:orderId',
 element: <Order />,
 loader: orderLoader,
 errorElement: <Error />,
 action: updateOrderAction,
 },
 ],
 },
 ]);

 function App() {
 return <RouterProvider router={router} />;
 }
 */

const AppLayout = lazy(() => import('./ui/AppLayout.jsx'));
const Error = lazy(() => import('./ui/Error.jsx'));
const Home = lazy(() => import('./ui/Home.jsx'));
const Menu = lazy(() => import('./features/menu/Menu.jsx'));
const Cart = lazy(() => import('./features/cart/Cart.jsx'));
const CreateOrder = lazy(() => import('./features/order/CreateOrder.jsx'));
const Order = lazy(() => import('./features/order/Order.jsx'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loader />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <Error />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/menu',
        element: (
          <Suspense fallback={<Loader />}>
            <Menu />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <Error />
          </Suspense>
        ),
        loader: menuLoader,
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: '/order/new',
        element: (
          <Suspense fallback={<Loader />}>
            <CreateOrder />
          </Suspense>
        ),
        action: createAction,
      },
      {
        path: '/order/:orderId',
        element: (
          <Suspense fallback={<Loader />}>
            <Order />
          </Suspense>
        ),
        loader: orderLoader,
        errorElement: (
          <Suspense fallback={<Loader />}>
            <Error />
          </Suspense>
        ),
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
