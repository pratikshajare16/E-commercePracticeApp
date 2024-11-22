import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Login'
import Header from './Header'
import Register from '../Register'
import AddProduct from '../AddProduct'
import UpdateProduct from '../UpdateProduct'
import ProtectedRoute from './ProtectedRoute'
import ProductList from '../ProductList'

const RouteBars = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add_product" element={<ProtectedRoute Component={AddProduct} />} />
                <Route path="/update_product" element={<ProtectedRoute Component={UpdateProduct} />} />
                <Route path="/" element={<ProtectedRoute Component={ProductList} />} />

            </Routes>
        </BrowserRouter>

    )
}

export default RouteBars