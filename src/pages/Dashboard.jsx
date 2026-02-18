import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ItemContext from '../context/ItemContext';
import { toast } from 'react-toastify';
import {
    FaHome,
    FaStickyNote,
    FaBookmark,
    FaFileAlt,
    FaImage,
    FaClock,
    FaCog,
    FaPlus,
    FaSearch,
    FaBell,
    FaComment,
    FaChevronRight,
    FaEllipsisH,
    FaLink,
    FaVideo,
    FaTimes,
    FaCloud,
    FaFolder
} from 'react-icons/fa';

function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { items, isLoading, isError, message, deleteItem, createItem } = useContext(ItemContext);

    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const [quickNoteTitle, setQuickNoteTitle] = useState('');
    const [quickNoteContent, setQuickNoteContent] = useState('');


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


    const notesCount = items.filter(i => i.type === 'NOTE').length;
    const bookmarksCount = items.filter(i => i.type === 'LINK').length;
    const documentsCount = items.filter(i => i.type === 'DOCUMENT').length;
    const imagesCount = items.filter(i => i.type === 'IMAGE').length;


    const getFilteredItems = () => {
        let filtered = items;


        if (activeTab === 'notes') filtered = filtered.filter(i => i.type === 'NOTE');
        if (activeTab === 'bookmarks') filtered = filtered.filter(i => i.type === 'LINK');
        if (activeTab === 'documents') filtered = filtered.filter(i => i.type === 'DOCUMENT');
        if (activeTab === 'images') filtered = filtered.filter(i => i.type === 'IMAGE');


        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(i =>
                i.title.toLowerCase().includes(query) ||
                (i.description && i.description.toLowerCase().includes(query))
            );
        }

        return filtered;
    };

    const filteredItems = getFilteredItems();


    const handleItemClick = (item) => {
        if (item.type === 'LINK') {
            window.open(item.url, '_blank');
        } else {
            setSelectedItem(item);
        }
    };

    const onQuickNoteSubmit = (e) => {
        e.preventDefault();
        if (!quickNoteContent) return;

        createItem({
            title: quickNoteTitle || 'Quick Note',
            description: quickNoteContent,
            type: 'NOTE'
        });
        setQuickNoteTitle('');
        setQuickNoteContent('');
        toast.success('Quick note saved!');
    };

    const onAddItemSubmit = (e) => {
        e.preventDefault();
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
        setIsAddModalOpen(false);
    };


    const SidebarItem = ({ id, icon: Icon, label, onClick }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${activeTab === id
                    ? 'bg-[#4318FF] text-white shadow-lg shadow-blue-500/30'
                    : 'text-[#A3AED0] hover:bg-gray-50 hover:text-[#2B3674]'
                }`}
        >
            <Icon size={18} />
            {label}
        </button>
    );


    const OverviewCard = ({ icon: Icon, label, count, colorClass, bgClass, onClick }) => (
        <div
            onClick={onClick}
            className="bg-white p-4 rounded-[20px] border border-gray-200 flex items-center gap-4 cursor-pointer hover:border-[#4318FF] transition-all transform hover:-translate-y-1 min-w-[200px]"
        >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bgClass} ${colorClass}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-[#A3AED0] text-sm font-medium">{label}</p>
                <h3 className="text-2xl font-bold text-[#2B3674]">{count}</h3>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4318FF]"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-white font-sans overflow-hidden transition-colors duration-300">
            { }
            <aside className="w-64 bg-white hidden md:flex flex-col p-6 z-10 space-y-2 border-r border-gray-100 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-[#4318FF] rounded-lg flex items-center justify-center">
                        <FaBookmark className="text-white text-sm" />
                    </div>
                    <span className="text-xl font-bold text-[#2B3674] uppercase tracking-tight">SecondBrain</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2">
                    <SidebarItem id="dashboard" icon={FaHome} label="Dashboard" />
                    <SidebarItem id="notes" icon={FaStickyNote} label="My Notes" />
                    <SidebarItem id="bookmarks" icon={FaLink} label="Link" />
                    <SidebarItem id="documents" icon={FaFileAlt} label="Documents" />
                    <SidebarItem id="images" icon={FaImage} label="Images" />


                </div>
            </aside>

            { }
            <div className="flex-1 flex flex-col min-h-0 relative">
                { }
                <header className="h-20 bg-white px-8 flex items-center justify-between shrink-0 transition-colors duration-300">
                    <div></div>

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
                                        <button
                                            onClick={() => navigate('/profile')}
                                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#2B3674] hover:bg-blue-50 hover:text-[#4318FF] rounded-xl transition-colors flex items-center gap-2"
                                        >
                                            <FaCog size={14} /> My Profile
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header >

                { }
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-8 transition-colors duration-300">
                    <div className="flex flex-col xl:flex-row gap-8">
                        { }
                        <div className="flex-1 min-w-0">
                            { }
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-[#2B3674]">Quick Access</h1>
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="bg-[#4318FF] hover:bg-[#3311CC] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/40 transition-all flex items-center gap-2 active:scale-95"
                                >
                                    <FaPlus size={12} /> Add New
                                </button>
                            </div>

                            { }
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                                <OverviewCard
                                    icon={FaStickyNote}
                                    label="Notes"
                                    count={notesCount}
                                    bgClass="bg-blue-50"
                                    colorClass="text-[#4318FF]"
                                    onClick={() => setActiveTab('notes')}
                                />
                                <OverviewCard
                                    icon={FaLink}
                                    label="Link"
                                    count={bookmarksCount}
                                    bgClass="bg-blue-50"
                                    colorClass="text-[#4318FF]"
                                    onClick={() => setActiveTab('bookmarks')}
                                />
                                <OverviewCard
                                    icon={FaFileAlt}
                                    label="Documents"
                                    count={documentsCount}
                                    bgClass="bg-blue-50"
                                    colorClass="text-[#4318FF]"
                                    onClick={() => setActiveTab('documents')}
                                />
                                <OverviewCard
                                    icon={FaImage}
                                    label="Images"
                                    count={imagesCount}
                                    onClick={() => setActiveTab('images')}
                                    bgClass="bg-blue-50"
                                    colorClass="text-[#4318FF]"
                                />
                            </div>

                            { }
                            {activeTab === 'notes' && (
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-[#2B3674]">Recent Notes</h2>
                                        <button
                                            onClick={() => setActiveTab('notes')}
                                            className="bg-[#4318FF] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#3311CC] transition-colors"
                                        >
                                            View All
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        {items.filter(i => i.type === 'NOTE').slice(0, 3).map(note => (
                                            <div
                                                key={note._id}
                                                onClick={() => handleItemClick(note)}
                                                className="bg-white p-6 rounded-[20px] border border-gray-200 hover:border-[#4318FF] transition-all cursor-pointer group"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="w-12 h-12 rounded-full bg-blue-50 text-[#4318FF] flex items-center justify-center shrink-0">
                                                        <FaStickyNote size={20} />
                                                    </div>
                                                    <span className="text-xs text-[#A3AED0] font-bold bg-white border border-gray-100 px-2 py-1 rounded-full">{new Date(note.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <h3 className="font-bold text-[#2B3674] text-xl mb-3 line-clamp-1 group-hover:text-[#4318FF] transition-colors">
                                                    {note.title}
                                                </h3>
                                                <p className="text-[#A3AED0] text-sm line-clamp-3 leading-relaxed font-medium">
                                                    {note.description || 'No content...'}
                                                </p>
                                            </div>
                                        ))}
                                        {items.filter(i => i.type === 'NOTE').length === 0 && (
                                            <div className="col-span-3 text-center py-12 bg-white rounded-[20px] shadow-sm">
                                                <div className="w-16 h-16 bg-blue-50 text-[#4318FF] rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <FaStickyNote size={24} />
                                                </div>
                                                <p className="text-[#2B3674] font-bold text-lg mb-1">No notes yet</p>
                                                <p className="text-[#A3AED0] text-sm mb-4">Create your first note to get started</p>
                                                <button
                                                    onClick={() => setIsAddModalOpen(true)}
                                                    className="text-[#4318FF] font-bold hover:underline"
                                                >
                                                    Create Note
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            { }
                            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden transition-colors duration-300">
                                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-[#2B3674] flex items-center gap-2">
                                        {activeTab === 'notes' ? 'All Notes' : `Recent ${activeTab === 'bookmarks' ? 'Link' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                                    </h2>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-[#A3AED0]">
                                        <FaEllipsisH />
                                    </button>
                                </div>

                                <div className="px-6 py-4 grid grid-cols-12 border-b border-gray-100 text-xs font-bold text-[#A3AED0] uppercase tracking-wide">
                                    <div className="col-span-6">Name</div>
                                    <div className="col-span-2">Type</div>
                                    <div className="col-span-3">Date</div>
                                    <div className="col-span-1 text-right">Action</div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.slice(0, 10).map((item) => (
                                            <div
                                                key={item._id}
                                                onClick={() => handleItemClick(item)}
                                                className="px-6 py-4 hover:bg-gray-50 transition-colors grid grid-cols-12 items-center gap-4 group cursor-pointer"
                                            >
                                                <div className="col-span-6 flex items-center gap-4 min-w-0">
                                                    <div className={`
                                                        w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                                                        bg-blue-50 text-[#4318FF]
                                                    `}>
                                                        {item.type === 'NOTE' && <FaStickyNote size={18} />}
                                                        {item.type === 'LINK' && <FaLink size={18} />}
                                                        {item.type === 'DOCUMENT' && <FaFileAlt size={18} />}
                                                        {item.type === 'IMAGE' && <FaImage size={18} />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="font-bold text-[#2B3674] text-sm truncate">{item.title}</h3>
                                                        {item.type === 'LINK' && item.url && (
                                                            <p className="text-xs text-blue-500 truncate mt-0.5">{item.url}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-span-2">
                                                    <span className="text-[10px] font-bold text-[#4318FF] bg-blue-50 px-2 py-1 rounded-full uppercase">{item.type}</span>
                                                </div>

                                                <div className="col-span-3">
                                                    <p className="text-sm font-bold text-[#2B3674]">{new Date(item.createdAt).toLocaleDateString()}</p>
                                                </div>

                                                <div className="col-span-1 flex justify-end items-center gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteItem(item._id);
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Delete"
                                                    >
                                                        <FaTimes size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-12 text-center text-[#A3AED0]">
                                            No items found in this category.
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 border-t border-gray-100 text-center">
                                    <button className="text-white bg-[#4318FF] px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#3311CC] transition-colors">View All</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

            { }
            {selectedItem && (
                <div className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
                    <div className="bg-white rounded-[20px] w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden relative flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <h2 className="text-xl font-bold text-[#2B3674] truncate pr-4">{selectedItem.title}</h2>
                            <button onClick={() => setSelectedItem(null)} className="text-[#A3AED0] hover:text-[#2B3674] p-2 rounded-full hover:bg-gray-50 transition-colors">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-6 bg-gray-50 flex items-center justify-center">
                            {selectedItem.type === 'IMAGE' && (
                                <img
                                    src={selectedItem.fileUrl}
                                    alt={selectedItem.title}
                                    className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                                />
                            )}
                            {selectedItem.type === 'DOCUMENT' && (
                                <iframe
                                    src={selectedItem.fileUrl}
                                    title={selectedItem.title}
                                    className="w-full h-[70vh] rounded-xl border border-gray-200 bg-white"
                                />
                            )}
                            {selectedItem.type === 'NOTE' && (
                                <div className="max-w-2xl w-full bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
                                    <p className="whitespace-pre-wrap text-[#2B3674] leading-relaxed text-lg font-medium">
                                        {selectedItem.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
            }

            { }
            {
                isAddModalOpen && (
                    <div className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-[20px] w-full max-w-lg shadow-2xl transform transition-all">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-[#2B3674]">Add New Item</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-[#A3AED0] hover:text-[#2B3674]">
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <div className="p-6">
                                <form onSubmit={onAddItemSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-[#2B3674] mb-2">Type</label>
                                        <div className="grid grid-cols-4 gap-3">
                                            {['LINK', 'NOTE', 'IMAGE', 'DOCUMENT'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, type })}
                                                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${formData.type === type
                                                        ? 'bg-[#4318FF] text-white shadow-lg shadow-blue-500/30'
                                                        : 'bg-gray-50 text-[#A3AED0] hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#2B3674] mb-2">Title</label>
                                        <input
                                            type="text"
                                            placeholder="Enter title..."
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-white border border-[#E0E5F2] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4318FF] outline-none transition-all font-medium placeholder:text-[#A3AED0] text-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#2B3674] mb-2">Description</label>
                                        <textarea
                                            placeholder="Enter description..."
                                            rows="3"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-white border border-[#E0E5F2] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4318FF] outline-none transition-all resize-none font-medium placeholder:text-[#A3AED0] text-black"
                                        ></textarea>
                                    </div>

                                    {(formData.type === 'LINK' || formData.type === 'VIDEO') && (
                                        <div>
                                            <label className="block text-sm font-bold text-[#2B3674] mb-2">URL</label>
                                            <input
                                                type="text"
                                                placeholder="https://..."
                                                value={formData.url}
                                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                                className="w-full bg-white border border-[#E0E5F2] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4318FF] outline-none transition-all font-medium placeholder:text-[#A3AED0] text-black"
                                            />
                                        </div>
                                    )}

                                    {(formData.type === 'IMAGE' || formData.type === 'DOCUMENT') && (
                                        <div>
                                            <label className="block text-sm font-bold text-[#2B3674] mb-2">File</label>
                                            <input
                                                type="file"
                                                accept={formData.type === 'IMAGE' ? "image/*" : ".pdf,image/*,.doc,.docx"}
                                                onChange={(e) => setFile(e.target.files[0])}
                                                className="w-full bg-white border border-[#E0E5F2] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4318FF] outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-50 file:text-[#4318FF] hover:file:bg-[#E9EDF7] text-sm text-gray-500"
                                            />
                                            {file && (
                                                <p className="mt-2 text-xs font-bold text-[#4318FF] bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
                                                    Selected: {file.name}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-[#4318FF] text-white font-bold py-3.5 rounded-xl hover:bg-[#3311CC] transition-colors shadow-lg shadow-blue-500/30"
                                        >
                                            Create Item
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default Dashboard;