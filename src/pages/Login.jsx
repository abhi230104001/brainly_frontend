import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message, login, reset } = useContext(AuthContext);

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

        const userData = {
            email,
            password,
        };

        login(userData);
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

                {}
                <div className="flex">
                    <div className="flex-1 py-4 text-center cursor-pointer relative">
                        <span className="text-gray-800 font-bold text-lg">Login</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-sky-400 rounded-t-full"></div>
                    </div>
                </div>

                {}
                <div className="p-8">
                    <form onSubmit={onSubmit} className="space-y-5">

                        {}
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

                        {}
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

                        {}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 rounded-full transition-all uppercase tracking-wide text-sm"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Don't have an account? <Link to="/signup" className="text-sky-400 hover:underline">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
