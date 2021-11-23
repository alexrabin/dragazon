import axios from 'axios';

const mainService = {

    addToCart : async function(productId, quantity) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/addtocart`, {
                products: [
                    {
                        productId,
                        quantity
                    }
                ]
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
    removeFromCart : async function(productId){

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
    createOrder: async function(){
        
    },
    getOrders: async function(){

    }

}
export default mainService;