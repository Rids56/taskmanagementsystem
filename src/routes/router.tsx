import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/login/Login';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import TaskCreate from '../pages/taskCreate/TaskCreate';
import AddQuestion from '../pages/addQuestion/AddQuestion';

function RequireAuth() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
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
]);

export default router;
