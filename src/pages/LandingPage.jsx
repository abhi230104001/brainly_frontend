import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGlobe, FaFileAlt, FaImage, FaStickyNote, FaBrain } from 'react-icons/fa';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden font-sans">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        <FaBrain className="text-3xl" />
                        <span>SecondBrain</span>
                    </Link>
                    <div className="flex gap-4">
                        {user ? (
                            <Link to="/dashboard" className="px-5 py-2.5 rounded-full font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all hover:scale-105">
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="px-5 py-2.5 rounded-full font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                                    Log In
                                </Link>
                                <Link to="/register" className="px-5 py-2.5 rounded-full font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all hover:scale-105">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-6 text-center relative">

                {/* Decorative blobs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-semibold text-sm tracking-wide uppercase border border-indigo-100 dark:border-indigo-800">
                        Organize your life
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Second Brain</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Store your important links, documents, images, and notes all in one place.
                        Free up your mind for creativity and let us handle the remembering.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {user ? (
                            <Link to="/dashboard" className="px-8 py-4 rounded-full font-bold text-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 min-w-[200px]">
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="px-8 py-4 rounded-full font-bold text-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 min-w-[200px]">
                                    Start Organizing
                                </Link>
                                <Link to="/login" className="px-8 py-4 rounded-full font-bold text-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all min-w-[200px]">
                                    Existing User
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>

                {/* Hero Image / Mockup Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-20 relative mx-auto max-w-5xl"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 pointer-events-none"></div>
                        {/* This would be where the dashboard screenshot goes. For now, we simulate a dashboard look */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden min-h-[400px] flex flex-col md:flex-row">
                            {/* Sidebar Mockup */}
                            <div className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 space-y-4 hidden md:block">
                                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded"></div>
                                ))}
                            </div>
                            {/* Main Content Mockup */}
                            <div className="flex-1 p-6 space-y-6">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="flex gap-2">
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900"></div>
                                        <div className="h-8 w-8 rounded-full bg-cyan-100 dark:bg-cyan-900"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Project Stats - Relevant Content */}
                                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl space-y-2 flex flex-col items-center text-center">
                                        <div className="text-indigo-600 dark:text-indigo-400 text-2xl"><FaGlobe /></div>
                                        <div className="text-indigo-800 dark:text-indigo-300 font-medium text-sm">Web Links</div>
                                    </div>
                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl space-y-2 flex flex-col items-center text-center">
                                        <div className="text-amber-600 dark:text-amber-400 text-2xl"><FaStickyNote /></div>
                                        <div className="text-amber-800 dark:text-amber-300 font-medium text-sm">Brain Notes</div>
                                    </div>
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl space-y-2 flex flex-col items-center text-center">
                                        <div className="text-emerald-600 dark:text-emerald-400 text-2xl"><FaFileAlt /></div>
                                        <div className="text-emerald-800 dark:text-emerald-300 font-medium text-sm">Documents</div>
                                    </div>
                                    <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl space-y-2 flex flex-col items-center text-center">
                                        <div className="text-pink-600 dark:text-pink-400 text-2xl"><FaImage /></div>
                                        <div className="text-pink-800 dark:text-pink-300 font-medium text-sm">Images</div>
                                    </div>
                                </div>

                                {/* Mock List */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mt-6 space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-4 w-4 rounded border border-gray-300 dark:border-gray-600"></div>
                                            <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-700/50 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </header>



            {/* Footer */}
            <footer className="bg-gray-50 dark:bg-gray-950 py-12 border-t border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SecondBrain. All rights reserved.</p>
                </div>
            </footer>
        </div >
    );
};

export default LandingPage;
