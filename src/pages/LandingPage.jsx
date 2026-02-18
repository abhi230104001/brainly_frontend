import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100">
            {}
            <nav className="border-b border-transparent py-6">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-4">
                    {}
                    <Link to="/" className="text-3xl font-black text-gray-900 tracking-tighter uppercase transform -rotate-2">
                        SECONDBRAIN
                    </Link>

                    {}
                    <div className="flex items-center gap-6 font-bold text-sm tracking-wide ml-auto">
                        {user ? (
                            <Link to="/dashboard" className="text-gray-900 hover:text-indigo-600 uppercase">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-900 hover:text-indigo-600 uppercase">
                                    Log In
                                </Link>
                                <Link to="/register" className="text-black hover:text-indigo-600 uppercase">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {}
            <main className="container mx-auto px-4 mt-12 lg:mt-20 text-center pb-20">
                {}
                <div className="mb-4 text-indigo-600 font-bold tracking-widest uppercase text-sm">
                    Organize your life
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 tracking-tight text-gray-900">
                    Build Your Second Brain
                </h1>

                {}
                <div className="relative max-w-4xl mx-auto mt-12">
                    {}
                    <div className="relative bg-white p-10 md:p-16 rounded-sm mx-4">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                            "Store your important links, documents, images, and notes all in one place. Free up your mind for creativity and let us handle the remembering."
                        </p>

                        {}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white transform rotate-45"></div>
                    </div>
                </div>

                {}
                <div className="mt-16">
                    <Link to={user ? "/dashboard" : "/register"} className="inline-block px-10 py-4 rounded-full bg-black text-white font-bold text-lg hover:bg-gray-800 transition-all">
                        Start Organizing Now
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
