import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import AddQuestion from '../pages/addQuestion/AddQuestion';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';
import NotFound from '../pages/NotFound';
import TaskCreate from '../pages/taskCreate/TaskCreate';

function RequireAuth() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      element: <RequireAuth />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: '/dashboard',
              element: <Dashboard />,
            },
            {
              path: '/task-create',
              element: <TaskCreate />,
            },
            {
              path: '/task-create/add-question',
              element: <AddQuestion />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default router;
