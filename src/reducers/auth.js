import { AUTH, LOGOUT } from '../constants/actionTypes';
import jwt_decode from 'jwt-decode';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            const decoded = jwt_decode(action?.data.token);
            const { picture, email, name } = decoded;
            const user = {
                picture,
                email,
                name,
            }
            localStorage.setItem('profile', JSON.stringify(user));
            return { ...state, authData: user };
        
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };

        default:
            return state;
    }
}

export default authReducer;