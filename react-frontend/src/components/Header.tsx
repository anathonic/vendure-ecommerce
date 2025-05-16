import React from 'react';

const Header = () => {
    return (
        <header className="bg-gray-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-gray-600 text-xl font-bold"> Vendure Shop </h1>
                <nav>
                    <ul className="flex space-x-6 font-semibold">
                        <li><a href="/products" className="text-gray-500 hover:text-gray-700">Products</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;