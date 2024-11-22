import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { Contact } from './Contact'
import { NavLinks } from './NavLink'
import { PageNotFound } from './PageNotFound'
import { User } from './User'
import Filter from './Filter'
import Company from './Company'
import Channel from './Channel'
import Other from './Other'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import LogOut from './LogOut'
import NewUser from './NewUser'
import UpdateUser from './UpdateUser'
export function NavBar() {

    return (
        <BrowserRouter>
            <NavLinks />
            <Routes>
                <Route path="/" element={<ProtectedRoute Component={Home} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/about" element={<ProtectedRoute Component={About} />} />
                <Route path="/contact/" element={<Contact />} >
                    <Route path="company" element={<Company />} />
                    <Route path="channel" element={<Channel />} />
                    <Route path="other" element={<Other />} />
                </Route>
                <Route path="/user/:name" element={<User />} />
                <Route path='/filter' element={<ProtectedRoute Component={Filter} />} />
                <Route path='/add_user' element={<ProtectedRoute Component={NewUser} />} />
                <Route path='/update_user' element={<ProtectedRoute Component={UpdateUser} />} />

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>

    )
}