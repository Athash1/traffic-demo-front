import { defineStore } from 'pinia'
import type { AuthState, Auth } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
  state: ():AuthState => ({
    token: localStorage.getItem('token'),
    userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
    role: localStorage.getItem('role')
  }),
  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.token
  },
  actions: {
    adminLogin(token: string, userInfo: Auth) {
      this.token = token;
      this.userInfo = userInfo;
      this.role = 'admin';
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('role', 'admin')
    },
    userLogin(token: string, userInfo: Auth) {
      this.token = token;
      this.userInfo = userInfo;
      this.role = 'user';
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('role', 'user')
    },
    logout() {
      this.token = null;
      this.userInfo = null;
      this.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('role');
    }
  }
})