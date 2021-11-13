import axios from 'axios';

const authService = {

    signUp : async function(name, email, username, password) {
        console.log('Name', name)
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, {
                name: name,
                email:email,
                username:username, 
                password:password
            }, {
                 headers: {
                 'content-type': 'application/json'
                },
                withCredentials: true,
                credentials: 'same-origin',
            } );
            return {response: response}
        }
        catch (err){
            return {error:err.response ? err.response.data: "network error"};
        }
        
    },
    login: async function(username, password) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
                username:username, 
                password:password
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
    logout: async function(){
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/logout`, {
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
    getLoggedInUser: async function(){
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile`, {
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

};

export default authService;