import axios from 'axios';

const mainService = {

    addToCart : async function(productId, quantity) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/addtocart`, {
                product: 
                    {
                        productId,
                        quantity
                    }
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
    removeFromCart : async function(productId, quantity){
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/removefromcart`, {
                product: 
                    {
                        productId,
                        quantity
                    }
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
    getCart: async function(){
        
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/cart`, {
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
    getProduct: async function(productId){
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${productId}`, {
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
    createOrder: async function(address){
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/create`, {
                address: 
                    address
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
    getOrders: async function(){
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/userorders`, {
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
export default mainService;