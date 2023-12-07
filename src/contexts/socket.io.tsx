import { createContext, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { API_ENDPOINT } from '../config';
import { useAuth } from './auth';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.token) return;

    const newSocket = io(API_ENDPOINT, {
      transports: ['websocket'],
      auth: {
        token: auth?.token,
      },
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [auth]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
