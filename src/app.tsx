import 'src/global.css';

// ----------------------------------------------------------------------

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import { Route, Routes } from 'react-router-dom';
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { DashboardLayout } from './layouts/dashboard';
import { EmployeeShow } from './pages/dashboard/EmployeeShow/EmployeeShow';
import { EmployeeEdit } from './pages/dashboard/EmployeeEdit/EmployeeEdit';
import { EmployeeCreate } from './pages/dashboard/EmployeeCreate/EmployeeCreate';
import { EmployeeList } from './pages/dashboard/EmployeeList/EmployeeList';


export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <SettingsProvider settings={defaultSettings}>
        <ThemeProvider>
          <MotionLazy>
            <Refine 
              dataProvider={dataProvider(import.meta.env.VITE_JSON_SERVER_URL)}
              routerProvider={routerProvider}
              resources={[
                {
                  name: "employees",
                  list: "/dashboard/employees",
                  show: "/dashboard/employees/:id/show",
                  create: "/dashboard/employees/create",
                  edit: "/dashboard/employees/:id/edit",
                  canDelete: true,
                },
                {
                  name: "employeeTypes",
                  list: "/dashboard/employeeTypes"
                },
              ]}
            >
              <ProgressBar />
              <SettingsDrawer />

              <Routes>
                {/* <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employeeTypes/:id" element={<EmployeeShow />} />
                <Route path="/employeeTypes/create" element={<EmployeeCreate />} />
                <Route path="/employees/:id/edit" element={<EmployeeEdit />} /> */}
                {/* <Route path="/employeeTypes" element={<MuiInferencer />} /> */}
                <Route path="/*" element={<Router />} />
              </Routes>
        
            </Refine>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
