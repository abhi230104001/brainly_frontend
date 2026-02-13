import axios from 'axios';

const API_URL = 'https://second-brain-bakend.onrender.com/api/auth/login';

console.log('Testing login to:', API_URL);

try {
    const response = await axios.post(API_URL, {
        email: 'test@example.com',
        password: 'password'
    });
    console.log('Success:', response.data);
} catch (error) {
    console.error('Error status:', error.response ? error.response.status : 'No response');
    console.error('Error data:', error.response ? error.response.data : error.message);
}
