import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { MobileNavbar } from './components/Main/MobileNavbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileNavbar />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
