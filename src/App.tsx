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
import EditTask from './pages/Tasks/EditTask';
import ProjectDash from './pages/Projects/ProjectDash';
import ProjectDetail from './pages/Projects/ProjectDetail';
import EditProject from './pages/Projects/EditProject';
import TaskDetail from './pages/Tasks/TaskDetail';

import ErrorPage from './pages/ErrorPage';

import AuthLayout from './layout/AuthLayout';
import DefaultLayout from './layout/DefaultLayout';
import TaskObs from './pages/Tasks/TaskObs';
import TaskActions from './pages/Tasks/TaskActions';
import Settings from './pages/Settings/Settings';
import AddUsers from './pages/Settings/AddUsers';
import UpdateUsers from './pages/Settings/UpdateUsers';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import Resources from './pages/Resources';
import Gantt from './pages/Gantt';

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
                      <PageTitle title="Dashboard" />
                      <Dashboard />
                    </>}
                />

                <Route path="/auth/Admin/Settings" element={
                    <>
                      <PageTitle title="Settings" />
                      <Settings />
                    </>}
                />
                <Route path="/auth/Admin/Users/comptes" element={
                    <>
                      <PageTitle title="creation de compte" />
                      <AddUsers />
                    </>}
                />
                <Route path="/auth/Admin/Users/update/:id" element={
                    <>
                      <PageTitle title="creation de compte" />
                      <UpdateUsers />
                    </>}
                />
                <Route path="/auth/Admin/liste/messages/:id" element={
                    <>
                      <PageTitle title="Messages" />
                      <Messages />
                    </>}
                />

                <Route path="/auth/Admin/user/profile" element={
                    <>
                      <PageTitle title="Profile" />
                      <Profile />
                    </>}
                />

                <Route path="/auth/Admin/calendrier" element={
                    <>
                      <PageTitle title="  Calendrier" />
                      <Calendar />
                    </>}
                />

                <Route path="/auth/Admin/gantt" element={
                    <>
                      <PageTitle title="  Gantt" />
                      <Gantt />
                    </>}
                />

                <Route path="/auth/Admin/resources" element={
                    <>
                      <PageTitle title="Resources" />
                      <Resources />
                    </>}
                />

                <Route path="/auth/Admin/projets" element={
                    <>
                      <PageTitle title="Projets" />
                      <ProjectDash />
                    </>}
                />
                <Route path="/auth/Admin/add/projets" element={
                    <>
                      <PageTitle title="Projets" />
                      <AddProject />
                    </>}
                />
                <Route path="/auth/Admin/edit/projets/:id" element={
                    <>
                      <PageTitle title="ProjetsF" />
                      <EditProject />
                    </>}
                />
                <Route path="/auth/Admin/edit/taches/:id/:codes" element={
                    <>
                      <PageTitle title="Modifier la taches" />
                      <EditTask />
                    </>}
                />
                <Route path="/auth/Admin/detail/projets/:id" element={
                    <>
                      <PageTitle title="Detail du projet" />
                      <ProjectDetail />
                    </>}
                />

              <Route path="/auth/Admin/add/tâches/:id" element={
                    <>
                      <PageTitle title="Ajouter une tâche" />
                      <AddTask />
                    </>}
                />

              <Route path="/auth/Admin/detail/taches/:id" element={
                    <>
                      <PageTitle title="Ajout de tâche" />
                      <TaskDetail />
                    </>}
                />

              <Route path="/auth/Admin/obs/lites/:id" element={
                    <>
                      <PageTitle title="Liste des observations" />
                      <TaskObs />
                    </>}
                />
              <Route path="/auth/Admin/action/lites/:id" element={
                    <>
                      <PageTitle title="Lites des actions" />
                      <TaskActions />
                    </>}
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
