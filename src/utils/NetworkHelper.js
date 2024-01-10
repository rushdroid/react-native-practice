import axios from 'axios';
import { API_BASE_URL } from './EndPoints';

const NetworkHelper = async (endpoint, method = 'GET', data = null, headers = {}) => {
    try {
        const url = API_BASE_URL + endpoint;
        console.log(url);
        // Define default headers if not provided
        const defaultHeaders = {
            'Content-Type': 'application/json',
            // Add other default headers if needed
        };

        // Merge default and custom headers
        const mergedHeaders = { ...defaultHeaders, ...headers };

        // Create request config
        const requestConfig = {
            method: method,
            headers: mergedHeaders,
            url: url,
            data: (method === 'POST' || method === 'PUT') ? data : null,
        };
        console.log(requestConfig);
        // Make request using Axios and await for the response
        const response = await axios(requestConfig);

        return response.data; // Return response data
    } catch (error) {
        console.log(error);
        throw error; // Throw error for handling in the caller function
    }
};

export default NetworkHelper;
