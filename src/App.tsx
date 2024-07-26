import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import ChangePassword from './pages/Authentication/ChangePassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import VerificationOTP from './pages/Authentication/VerificationOTP';

// Admin
import Dashboard from './pages/Dashboard/Dashboard';
import AddProject from './pages/Projects/AddProject';
import AddTask from './pages/Tasks/AddTask';
import ProjectDash from './pages/Projects/ProjectDash';
import ProjectDetail from './pages/Projects/ProjectDetail';
import EditProject from './pages/Projects/EditProject';


// Autres
import DefaultLayout from './layout/DefaultLayout';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ErrorPage from './pages/ErrorPage';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Projets from './pages/Projets';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

import AuthLayout from './layout/AuthLayout';

function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

      }
    setLoading(false);

    }, [navigate]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    }, []);
  
    if (loading) {
        return <Loader />;
    }

    return (
      <>
        {isLoggedIn ? (

          <DefaultLayout>
              
              <Routes>

                <Route path="/auth/dashboard" element={
                    <>
                      <PageTitle title="Dashboard | MOBISOLF" />
                      <Dashboard />
                    </>}
                />

                <Route path="/auth/projets" element={
                    <>
                      <PageTitle title="Liste des project | MOBISOLF" />
                      <ProjectDash />
                    </>}
                />
                <Route path="/auth/add/projets" element={
                    <>
                      <PageTitle title="Ajout de projet | MOBISOLF" />
                      <AddProject />
                    </>}
                />
                <Route path="/auth/add/modifiction/:id" element={
                    <>
                      <PageTitle title="Ajout de projet | MOBISOLF" />
                      <EditProject />
                    </>}
                />
                <Route path="/auth/detail/projet/:id" element={
                    <>
                      <PageTitle title="Detail du projet | MOBISOLF" />
                      <ProjectDetail />
                    </>}
                />

              <Route path="/auth/task/add/:id" element={
                    <>
                      <PageTitle title="Ajout de tâche | MOBISOLF" />
                      <AddTask />
                    </>}
                />

                <Route
                  path="/calendar"
                  element={
                    <>
                      <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <Calendar />
                    </>
                  }
                />
                <Route
                  path="/Projets"
                  element={
                    <>
                      <PageTitle title="Liste des Projets|" />
                      <Projets />
                    </>
                  }
                />
                <Route
                  path="/forms/form-elements"
                  element={
                    <>
                      <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <FormElements />
                    </>
                  }
                />
                <Route
                  path="/forms/form-layout"
                  element={
                    <>
                      <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <FormLayout />
                    </>
                  }
                />
                <Route
                  path="/tables"
                  element={
                    <>
                      <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <Tables />
                    </>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <>
                      <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <Settings />
                    </>
                  }
                />
                <Route
                  path="/chart"
                  element={
                    <>
                      <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <Chart />
                    </>
                  }
                />
                <Route
                  path="/ui/alerts"
                  element={
                    <>
                      <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <Alerts />
                    </>
                  }
                />
                <Route
                  path="/ui/buttons"
                  element={
                    <>
                      <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <Buttons />
                    </>
                  }
                />
                <Route
                  path="/auth/signin"
                  element={
                    <>
                      <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <SignIn />
                    </>
                  }
                />
                <Route
                  path="/auth/signup"
                  element={
                    <>
                      <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                      <SignUp />
                    </>
                  }
                />
                {/* <Route path="*" element={<ErrorPage />} /> */}
              </Routes>

          </DefaultLayout>

          ) : (
            <AuthLayout>
              <Routes>
                <Route index element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/resetPassword" element={<ResetPassword />} />
                <Route path="/auth/verificationOTP" element={<VerificationOTP />} />
                <Route path="/auth/changePassword" element={<ChangePassword />} />
                <Route path="*" element={<ErrorPage/>} />
              </Routes>
            </AuthLayout>
        )}

      </>
    );


}

export default App;
