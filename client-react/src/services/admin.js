import axios from 'axios';

const adminService = {
    getAllUsers: async function () {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    makeUserAdmin: async function(userId) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/makeadmin/${userId}`,{}, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    deleteUser: async function(userId){
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    getAllProducts: async function () {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products`, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    createProduct: async function(title, desc, img, categories, price, inStock){
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products`,{
                title: title,
                desc: desc,
                img: img,
                categories: categories,
                price: price,
                inStock: inStock
            }, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    updateProduct: async function(productId, title, desc, img, categories, price, inStock){
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/products/${productId}`,{
                title: title,
                desc: desc,
                img: img,
                categories: categories,
                price: price,
                inStock
            }, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    deleteProduct: async function(productId){
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/products/${productId}`, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    getAllOrders: async function() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders`, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    getOrderDetails: async function(orderId) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/${orderId}`, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    },
    updateOrder: async function(orderId, details){

    },
    deleteOrder: async function(orderId){
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/orders/${orderId}`, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } )
            return {response: response};
        } catch (err) {
            return {error:err.response ? err.response.data: "network error"};
        }
    }
}
export default adminService