
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { name, email, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message, register, reset } = useContext(AuthContext);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/dashboard');
        }

        reset();
    }, [user, isError, isSuccess, message, navigate, reset]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const userData = {
            name,
            email,
            password,
        };

        register(userData);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 font-sans">
            <div className="bg-white rounded-2xl w-full max-w-[400px] overflow-hidden">

                {/* Header Tabs */}
                <div className="flex">
                    <div className="flex-1 py-4 text-center cursor-pointer relative">
                        <span className="text-gray-800 font-bold text-lg">Sign Up</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-sky-400 rounded-t-full"></div>
                    </div>

                </div>

                {/* Form Container */}
                <div className="p-8">
                    <form onSubmit={onSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400 text-sm" />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all text-sm"
                                id="name"
                                name="name"
                                value={name}
                                placeholder="Full Name"
                                onChange={onChange}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400 text-sm" />
                            </div>
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all text-sm"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={onChange}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400 text-sm" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all text-sm"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={onChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-sky-500 transition-colors focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400 text-sm" />
                            </div>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all text-sm"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Verify Password"
                                onChange={onChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-sky-500 transition-colors focus:outline-none"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 rounded-full transition-all uppercase tracking-wide text-sm"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
