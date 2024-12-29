import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { TodoIndexPage } from './component';
import { AddAppointment } from './component/add-appointment';
import { Dashboard } from './component/dashoard';
import { DeleteAppointment } from './component/delete-appointment';
import { EditAppointment } from './component/edit-appointment';
import { UserLogin } from './component/user-login';
import { UserRegister } from './component/user-register';
export function App() {
  return (
    <div>
     <section>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<TodoIndexPage/>} />
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='add-appointment' element={<AddAppointment/>}/>
        <Route path='edit-appointment' element={<EditAppointment/>} />
        <Route path='delete-appointment' element={<DeleteAppointment/>} />
      </Routes>
      </BrowserRouter>
     </section>
    </div>
  )
}
export default App;
