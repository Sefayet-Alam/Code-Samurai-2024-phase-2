import { createBrowserRouter } from "react-router-dom";

// Layouts
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";

// Private Routes
import SystemAdminRoute from "./SystemAdminRoute";
import LandfillManagerRoute from "./LandfillManagerRoute";
import STSManagerRoute from "./STSManagerRoute";

// Error fallback UI
import ErrorFallbackUI from "./../errorHandling/ErrorFallbackUI";

// User pages
import Login from "../Pages/Authentication/Login/Login";
import Home from "../Pages/Home/Home";

// System Admin Routes
import SAHome from "../Pages/SystemAdminDashboard/SAHome/SAHome";
import SAProfile from "../Pages/SystemAdminDashboard/SAProfile/SAProfile";
import SAUpdatePassword from "../Pages/SystemAdminDashboard/SAProfile/SAUpdatePassword";
import SaCreateUser from "../Pages/SystemAdminDashboard/SAManageUser/SACreateUser/SaCreateUser";
import SAViewUserList from "../Pages/SystemAdminDashboard/SAManageUser/SAViewUserList/SAViewUserList";
import SAUpdateUser from "../Pages/SystemAdminDashboard/SAManageUser/SAUpdateUser/SAUpdateUser";
import SARegisterTruck from "../Pages/SystemAdminDashboard/SARegisterTruck/SARegisterTruck";
import SACreateSTS from "../Pages/SystemAdminDashboard/SACreateSTS/SACreateSTS";
import SAAssignSTSManager from "../Pages/SystemAdminDashboard/SAAssignSTSManager/SAAssignSTSManager";
import SAAssignSTSTruck from "../Pages/SystemAdminDashboard/SAAssignSTSTruck/SAAssignSTSTruck";
import SACreateLandfillSite from "../Pages/SystemAdminDashboard/SACreateLandfillSite/SACreateLandfillSite";
import SAAssignLFSManager from "../Pages/SystemAdminDashboard/SAAssignLFSManager/SAAssignLFSManager";

// Landfill Manager Routes
import LFManagerHome from "../Pages/LandfillManagerDashboard/LFManagerHome/LFManagerHome";
import LFMProfile from "../Pages/LandfillManagerDashboard/LFMProfile/LFMProfile";
import LFMUpdatePassword from "../Pages/LandfillManagerDashboard/LFMUpdatePassword/LFMUpdatePassword";
import LFMAddTruckEntry from "../Pages/LandfillManagerDashboard/LFMAddTruckEntry/LFMAddTruckEntry";

// Secondary Transfer Station Manager Routes
import STSHome from "../Pages/STSManagerDashboard/STSHome/STSHome";
import STSManagerProfile from "../Pages/STSManagerDashboard/STSManagerProfile/STSManagerProfile";
import STSUpdatePassword from "../Pages/STSManagerDashboard/STSUpdatePassword/STSUpdatePassword";
import STSMAddTruckEntry from "../Pages/STSManagerDashboard/STSMAddTruckEntry/STSMAddTruckEntry";

export const router = createBrowserRouter([
  // Common routes
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorFallbackUI />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  // System admin dashboard protected routes
  {
    path: "/system-admin/dashboard",
    element: (
      <SystemAdminRoute>
        <DashboardLayout />
      </SystemAdminRoute>
    ),
    errorElement: <ErrorFallbackUI />,
    children: [
      {
        path: "/system-admin/dashboard",
        element: <SAHome />,
      },
      {
        path: "/system-admin/dashboard/home",
        element: <SAHome />,
      },
      {
        path: "/system-admin/dashboard/profile",
        element: <SAProfile />,
      },
      {
        path: "/system-admin/dashboard/update-password",
        element: <SAUpdatePassword />,
      },
      {
        path: "/system-admin/dashboard/create-user",
        element: <SaCreateUser />,
      },
      {
        path: "/system-admin/dashboard/users",
        element: <SAViewUserList />,
      },
      {
        path: "/system-admin/dashboard/update-user",
        element: <SAUpdateUser />,
      },
      {
        path: "/system-admin/dashboard/register-truck",
        element: <SARegisterTruck />,
      },
      {
        path: "/system-admin/dashboard/register-sts",
        element: <SACreateSTS />,
      },
      {
        path: "/system-admin/dashboard/assign-sts-manager",
        element: <SAAssignSTSManager />,
      },
      {
        path: "/system-admin/dashboard/assign-sts-truck",
        element: <SAAssignSTSTruck />,
      },
      {
        path: "/system-admin/dashboard/create-landfill-site",
        element: <SACreateLandfillSite />,
      },
      {
        path: "/system-admin/dashboard/assign-lfs-manager",
        element: <SAAssignLFSManager />,
      },
    ],
  },
  {
    path: "/landfill-manager/dashboard",
    element: (
      <LandfillManagerRoute>
        <DashboardLayout />
      </LandfillManagerRoute>
    ),
    errorElement: <ErrorFallbackUI />,
    children: [
      {
        path: "/landfill-manager/dashboard",
        element: <LFManagerHome />,
      },
      {
        path: "/landfill-manager/dashboard/home",
        element: <LFManagerHome />,
      },
      {
        path: "/landfill-manager/dashboard/profile",
        element: <LFMProfile />,
      },
      {
        path: "/landfill-manager/dashboard/update-password",
        element: <LFMUpdatePassword />,
      },
      {
        path: "/landfill-manager/dashboard/truck-entry",
        element: <LFMAddTruckEntry />,
      },
    ],
  },
  {
    path: "/sts-manager/dashboard",
    element: (
      <STSManagerRoute>
        <DashboardLayout />
      </STSManagerRoute>
    ),
    errorElement: <ErrorFallbackUI />,
    children: [
      {
        path: "/sts-manager/dashboard",
        element: <STSHome />,
      },
      {
        path: "/sts-manager/dashboard/home",
        element: <STSHome />,
      },
      {
        path: "/sts-manager/dashboard/profile",
        element: <STSManagerProfile />,
      },
      {
        path: "/sts-manager/dashboard/update-password",
        element: <STSUpdatePassword />,
      },
      {
        path: "/sts-manager/dashboard/truck-entry",
        element: <STSMAddTruckEntry />,
      },
    ],
  },
]);
