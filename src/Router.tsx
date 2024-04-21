import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { MobileNavbar } from './components/Main/MobileNavbar';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <MobileNavbar />,
  },
  {
    path: '/',
    element: <MobileNavbar />,
  },
  {
    path: '/services',
    element: <MobileNavbar />,
  },
  {
    path: '/projects',
    element: <MobileNavbar />,
  },
  {
    path: '/contact',
    element: <MobileNavbar />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
