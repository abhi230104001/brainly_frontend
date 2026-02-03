import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Profile() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Dashboard
                </button>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Logout
                </button>
            </div>

            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">User Profile</h1>

                <div className="space-y-4">
                    {user.avatar && (
                        <div className="flex justify-center mb-4">
                            <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                        <p className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                            {user.name}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                        <p className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">User ID</label>
                        <p className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 font-mono text-sm">
                            {user._id}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
