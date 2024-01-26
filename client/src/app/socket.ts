import { API_BASE_URL } from '@/environment';
import { io } from 'socket.io-client';

export const socket = io(API_BASE_URL);
