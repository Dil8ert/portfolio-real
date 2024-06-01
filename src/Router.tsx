import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/Main/HomePage';
import { MobileNavbar } from './components/Main/MobileNavbar';
import Services from './components/Main/Services';
import Projects from './components/Main/Projects';
import { ContactUs } from './components/Main/Contact/ContactUs';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <MobileNavbar component={HomePage} />,
  },
  {
    path: '/',
    element: <MobileNavbar component={HomePage} />,
  },
  {
    path: '/services',
    element: <MobileNavbar component={Services} />,
  },
  {
    path: '/projects',
    element: <MobileNavbar component={Projects} />,
  },
  {
    path: '/contact',
    element: <MobileNavbar component={ContactUs} />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
