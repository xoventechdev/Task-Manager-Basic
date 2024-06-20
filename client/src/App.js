import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/task/DashboardPage";
import Page404 from "./pages/layout/Page404";
import { Fragment } from "react";
import CreatePage from "./pages/task/CreatePage";
import NewPage from "./pages/task/NewPage";
import ProgressPage from "./pages/task/ProgressPage";
import CompletedPage from "./pages/task/CompletedPage";
import CanceledPage from "./pages/task/CanceledPage";
import ProfilePage from "./pages/user/ProfilePage";
import LoginPage from "./pages/user/LoginPage";
import RegistrationPage from "./pages/user/RegistrationPage";
import ForgetPasswordPage from "./pages/user/ForgetPasswordPage";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/canceled" element={<CanceledPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/password-reset" element={<ForgetPasswordPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
