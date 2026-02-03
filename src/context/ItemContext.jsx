import { createContext, useState, useEffect, useContext } from 'react';
import itemService from '../features/items/itemService';
import AuthContext from './AuthContext';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchItems();
        } else {
            setItems([]);
        }
    }, [user]);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const token = user.token;
            const data = await itemService.getItems(token);
            setItems(data);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || error.message);
        }
        setIsLoading(false);
    };

    const createItem = async (itemData) => {
        setIsLoading(true);
        try {
            const token = user.token;
            const newItem = await itemService.createItem(itemData, token);
            setItems([newItem, ...items]);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || error.message);
        }
        setIsLoading(false);
    };

    const deleteItem = async (id) => {
        setIsLoading(true);
        try {
            const token = user.token;
            await itemService.deleteItem(id, token);
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || error.message);
        }
        setIsLoading(false);
    };

    return (
        <ItemContext.Provider
            value={{
                items,
                isLoading,
                isError,
                message,
                createItem,
                deleteItem,
                fetchItems,
            }}
        >
            {children}
        </ItemContext.Provider>
    );
};

export default ItemContext;
