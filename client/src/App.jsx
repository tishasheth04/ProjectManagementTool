import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Toaster from "sonner";
import Dashboard from './pages/dashboard';
import Login from './pages/Login';
import TaskDetails from './pages/TaskDetails';
import Tasks from './pages/Tasks';
import Trash from './pages/Trash';
import Users from './pages/Users';

function Layout () {
  const user = ""

  const location = useLocation()

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        {/*<Sidebar></Sidebar>*/}
      </div>
      
      {/*<MobileSidebar></MobileSidebar>*/}

      <div className="flex-1 overflow-y-auto">
        {/*<NavBar></NavBar>*/}

        <div className="p-4 2x1:px-10">
          <Outlet/>
        </div>

      </div>
    </div>

  ): (
    <Navigate to="/log-in" state={{from: location}} replace />
  )

}

function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element = {<Navigate to="/dashboard"/>} />
            <Route path ='/dasboard >' element={<Dashboard />} />
            <Route path ='/tasks >' element={<Tasks />} />
            <Route path ='/completed/:status >' element={<Tasks />} />
            <Route path ='/in-progress/:status >' element={<Tasks />} />
            <Route path ='/todo/:status >' element={<Tasks />} />
            <Route path ='/team >' element={<Users />} />
            <Route path ='/trashed >' element={<Trash />} />
            <Route path ='/task/:id >' element={<TaskDetails />} />
          </Route>

          <Route path ='/log-in' element={<Login />} />

        </Routes>   

        <Toaster richColors />
      </main>
  );
}

export default App;
