import { lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';
import { EmployeeList } from 'src/pages/dashboard/EmployeeList/EmployeeList';
import { EmployeeShow } from 'src/pages/dashboard/EmployeeShow/EmployeeShow';
import { EmployeeEdit } from 'src/pages/dashboard/EmployeeEdit/EmployeeEdit';
import { EmployeeCreate } from 'src/pages/dashboard/EmployeeCreate/EmployeeCreate';
import { EmployeeTypeList } from 'src/pages/dashboard/EmployeeTypes/EmployeeTypes';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard/*',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'employees',
        element: <EmployeeList />
      },
      {
        path: 'employees/:id/show',
        element: <EmployeeShow />
      },
      {
        path: 'employees/:id/edit',
        element: <EmployeeEdit />
      },
      {
        path: 'employees/create',
        element: <EmployeeCreate />
      },
      {
        path: 'employeeTypes',
        element: <EmployeeTypeList />
      }
    ]
  },
];
