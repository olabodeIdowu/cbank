import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import "./general.css";
import Register from "./features/authentication/Register";
import Login from "./pages/Login";
import RequireAuth from "./features/authentication/RequireAuth";
import ResetPassword from "./features/authentication/ResetPassword";
import ForgotPassword from "./features/authentication/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import DashboardLayout from "./ui/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";

import InternalUsers from "./features/admin/internalUsers/InternalUsers";
import Team from "./features/admin/internalUsers/Team";
import Roles from "./features/admin/internalUsers/Roles";
import Permissions from "./features/admin/internalUsers/Permissions";
import Role from "./features/admin/internalUsers/Role";
import InternalUser from "./features/admin/internalUsers/InternalUser";

import PosType from "./features/pos/posTypes/PosType";
import Terminal from "./features/pos/terminals/Terminal";
import PosRequest from "./features/pos/posRequests/PosRequest";
import TerminalDetails from "./features/pos/terminals/TerminalDetails";
import PosRequestDetails from "./features/pos/posRequests/PosRequestDetails";
import PosPayment from "./features/pos/posPayments/PosPayment";
import Pos from "./features/pos/pos/Pos";
import PosPaymentDetails from "./features/pos/posPayments/PosPaymentDetails";
import PosDetails from "./features/pos/pos/PosDetails";
import Account from "./features/accounts/Account";
import AccountDetails from "./features/accounts/AccountDetails";
import Analytics from "./features/pos/posAnalytics/PosAnalytics";

const ROLES = {
  user: 2001,
  manager: 1984,
  admin: 4,
  super_admin: 5,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Routes>
        {/* we want to protect these routes */}
        <Route
          element={
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.super_admin]} />
          }
        >
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="accounts" element={<Account />} />
            <Route
              path="accounts/:accountDetails"
              element={<AccountDetails />}
            />
            <Route path="analytics" element={<Analytics />} />
            <Route path="pos-type" element={<PosType />} />
            <Route path="terminal" element={<Terminal />} />
            <Route path="pos-request" element={<PosRequest />} />
            <Route path="pos" element={<Pos />} />
            <Route path="pos-payment" element={<PosPayment />} />
            <Route
              path="terminal/:terminalDetails"
              element={<TerminalDetails />}
            />
            <Route
              path="pos-request/:posRequestDetails"
              element={<PosRequestDetails />}
            />
            <Route path="pos/:posDetails" element={<PosDetails />} />
            <Route
              path="pos-payment/:posPaymentDetails"
              element={<PosPaymentDetails />}
            />
            <Route path="internal-users" element={<InternalUsers />} />
            <Route
              path="internal-users/:internalUserID"
              element={<InternalUser />}
            />
            <Route path="teams" element={<Team />} />
            <Route path="roles" element={<Roles />} />
            <Route path="roles/:roleID" element={<Role />} />
            <Route path="permissions" element={<Permissions />} />
          </Route>
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.manager]} />}>
            <Route path='editor' element={<Manager />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
            <Route path='editor' element={<User />} />
          </Route> */}

        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
