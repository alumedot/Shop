import axios from 'axios';

export default {
  async signUp(email: string, password: string) {
    return await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNj9MeduIPQU85kYJXJhSjhDGiavt2AXk', {
      email,
      password,
      returnSecureToken: true,
    });
  },
};
