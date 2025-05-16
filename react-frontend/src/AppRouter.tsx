import React from "react";
import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Home from "./pages/Home.tsx";
// import Product from "./pages/Product.tsx";
// import Products from "./pages/Products.tsx";

const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Products = lazy(() => import('./pages/Products'));

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/product/:slug', component: Product },
];

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>
        </Router>
    );
}