import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {
    FaHome,
    FaStickyNote,
    FaBookmark,
    FaFileAlt,
    FaImage,
    FaCog,
    FaLink,
    FaCamera,
    FaEnvelope,
    FaUser,
    FaIdCard
} from 'react-icons/fa';

function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext); // logout available but not shown in dropdown
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Component: Sidebar Item
    const SidebarItem = ({ icon: Icon, label, onClick, isActive }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${isActive
                    ? 'bg-[#4318FF] text-white shadow-lg shadow-blue-500/30'
                    : 'text-[#A3AED0] hover:bg-gray-50 hover:text-[#2B3674]'
                }`}
        >
            <Icon size={18} />
            {label}
        </button>
    );

    return (
        <div className="flex h-screen bg-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white hidden md:flex flex-col p-6 z-10 space-y-2 border-r border-gray-100">
                <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="w-8 h-8 bg-[#4318FF] rounded-lg flex items-center justify-center">
                        <FaBookmark className="text-white text-sm" />
                    </div>
                    <span className="text-xl font-bold text-[#2B3674] uppercase tracking-tight">SecondBrain</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2">
                    <SidebarItem icon={FaHome} label="Dashboard" onClick={() => navigate('/dashboard')} />
                    <SidebarItem icon={FaStickyNote} label="My Notes" onClick={() => navigate('/dashboard')} />
                    <SidebarItem icon={FaLink} label="Link" onClick={() => navigate('/dashboard')} />
                    <SidebarItem icon={FaFileAlt} label="Documents" onClick={() => navigate('/dashboard')} />
                    <SidebarItem icon={FaImage} label="Images" onClick={() => navigate('/dashboard')} />

                    <div className="pt-6 pb-2">
                        <p className="px-4 text-xs font-bold text-[#A3AED0] uppercase tracking-wider">Account</p>
                    </div>
                    <SidebarItem icon={FaUser} label="Profile" isActive={true} onClick={() => { }} />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0 relative">
                {/* Header */}
                <header className="h-20 bg-white px-8 flex items-center justify-end shrink-0 border-b border-gray-50">


                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div
                                className="flex items-center gap-3 pl-6 cursor-pointer bg-white p-2 pr-4 rounded-full hover:bg-gray-50 transition-colors"
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            >
                                <div className="w-10 h-10 rounded-full bg-white text-[#4318FF] flex items-center justify-center font-bold text-lg overflow-hidden border-2 border-gray-100">
                                    {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user?.name?.charAt(0)}
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-sm font-bold text-[#2B3674] leading-tight">{user?.name}</p>
                                    <p className="text-xs text-[#A3AED0] font-medium">View Profile</p>
                                </div>
                            </div>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-3 border-b border-gray-50">
                                        <p className="text-sm font-bold text-[#2B3674]">{user?.name}</p>
                                        <p className="text-xs text-[#A3AED0] truncate">{user?.email}</p>
                                    </div>
                                    <div className="p-2">
                                        {/* My Profile Link (redundant but kept for consistency, or disabled/different) */}
                                        <button
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#4318FF] bg-blue-50 rounded-xl transition-colors flex items-center gap-2"
                                        >
                                            <FaCog size={14} /> My Profile
                                        </button>
                                        {/* Logout Option REMOVED per user request */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header >

                {/* Profile Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl font-bold text-[#2B3674] mb-8">My Profile</h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Profile Card */}
                            <div className="md:col-span-1">
                                <div className="bg-white p-8 rounded-[20px] shadow-lg shadow-gray-100 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#4318FF] to-[#868CFF] opacity-10"></div>
                                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white text-[#4318FF] flex items-center justify-center font-bold text-4xl mb-4 relative z-10 overflow-hidden">
                                        {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user?.name?.charAt(0)}
                                    </div>
                                    <h2 className="text-xl font-bold text-[#2B3674]">{user?.name}</h2>
                                    <p className="text-[#A3AED0] text-sm font-medium mb-6">{user?.email}</p>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="md:col-span-2">
                                <div className="bg-white p-8 rounded-[20px] shadow-lg shadow-gray-100 border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-[#2B3674]">General Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                            <div className="flex items-center gap-3 mb-2 text-[#A3AED0]">
                                                <FaUser size={14} />
                                                <span className="text-xs font-bold uppercase tracking-wider">Full Name</span>
                                            </div>
                                            <p className="text-[#2B3674] font-bold text-lg pl-7">{user?.name}</p>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                            <div className="flex items-center gap-3 mb-2 text-[#A3AED0]">
                                                <FaEnvelope size={14} />
                                                <span className="text-xs font-bold uppercase tracking-wider">Email Address</span>
                                            </div>
                                            <p className="text-[#2B3674] font-bold text-lg pl-7">{user?.email}</p>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                            <div className="flex items-center gap-3 mb-2 text-[#A3AED0]">
                                                <FaIdCard size={14} />
                                                <span className="text-xs font-bold uppercase tracking-wider">User ID</span>
                                            </div>
                                            <p className="text-[#2B3674] font-bold text-sm pl-7 font-mono">{user?._id}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons for Profile - since Logout is hidden in dropdown, maybe show it here? 
                                        User said "logout option should not show on profile page". So I will NOT show it here either.
                                    */}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Profile;