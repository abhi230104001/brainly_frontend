import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ItemContext from '../context/ItemContext';
import { toast } from 'react-toastify';

function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { items, isLoading, isError, message, deleteItem, createItem } = useContext(ItemContext);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'LINK',
        url: '',
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!user) {
            navigate('/login');
        }
    }, [user, navigate, isError, message]);

    const onSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.title) {
            toast.error('Title is required');
            return;
        }

        if (formData.type === 'DOCUMENT' || formData.type === 'IMAGE') {
            if (!file) {
                toast.error('File is required for this type');
                return;
            }
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('type', formData.type);
            data.append('file', file);
            createItem(data);
        } else {
            createItem(formData);
        }

        setFormData({ title: '', description: '', type: 'LINK', url: '' });
        setFile(null);
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome {user && user.name}</h1>
                <div className="space-x-4">
                    <button onClick={() => navigate('/profile')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Profile
                    </button>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </div>

            {/* Add Item Form (Simplified) */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add New Item</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                        >
                            <option value="LINK">Link</option>
                            <option value="NOTE">Note</option>
                            <option value="IMAGE">Image</option>
                            <option value="DOCUMENT">Document</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {(formData.type === 'LINK' || formData.type === 'VIDEO') && (
                        <div>
                            <input
                                type="text"
                                placeholder="URL"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    )}

                    {(formData.type === 'IMAGE' || formData.type === 'DOCUMENT') && (
                        <div>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    )}

                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add Item
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md relative group">
                            <button
                                onClick={() => deleteItem(item._id)}
                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                X
                            </button>
                            <div className="flex items-center mb-2">
                                <span className="text-xs font-bold px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded mr-2">{item.type}</span>
                                <span className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 break-words dark:text-white">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 break-words">{item.description}</p>

                            {item.type === 'LINK' && (
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
                                    {item.url}
                                </a>
                            )}
                            {item.type === 'IMAGE' && item.fileUrl && (
                                <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                                    <img src={item.fileUrl} alt={item.title} className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
                                </a>
                            )}
                            {item.type === 'DOCUMENT' && item.fileUrl && (
                                <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-200 dark:bg-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                    Open Document
                                </a>
                            )}
                        </div>
                    ))
                ) : (
                    <h3 className="dark:text-white">You have not set any items</h3>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
