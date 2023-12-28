import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Welcome } from '../pages/Welcome';
import { SignUp } from '../pages/SignUp';
import { LogIn } from '../pages/LogIn';
import { AppLayout } from './AppLayout';
import { ErrorPage } from '../pages/ErrorPage';
import { GraphiQLPage } from '../pages/GraphiQLPage';
import { AuthLayout } from './AuthLayout';
import { HeaderLayout } from './HeaderLayout/HeaderLayout';

const routerConfig = [
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <GraphiQLPage /> }],
  },
  {
    path: '/welcome',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <Welcome /> }],
  },
  {
    path: '/signUp',
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <SignUp /> }],
  },
  {
    path: '/logIn',
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <LogIn /> }],
  },
];

export function PathRouter() {
  const router = createBrowserRouter(routerConfig);
  return <RouterProvider router={router} />;
}
