import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomePage from './components/Main/HomePage';
import { MobileNavbar } from './components/Main/MobileNavbar';
import Blog from './components/Main/Blog';
import BlogPost from './components/Main/BlogPost';
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
    path: '/blog',
    element: <MobileNavbar component={Blog} />,
  },
  {
    path: '/blog/:slug',
    element: <MobileNavbar component={BlogPost} />,
  },
  {
    path: '/services',
    element: <Navigate to="/blog" replace />,
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
