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

    },
    createProduct: async function(title, desc, img, categories, price, inStock){

    },
    updateProduct: async function(title, desc, img, categories, price, inStock){

    },
    deleteProduct: async function(productId){

    }
}
export default adminService