/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocketContext=()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider=({children})=>{
    const [socket , setSocket]= useState(null);
    const [onlineUser,setOnlineUser]=useState([]);
    const {authUser} = useAuth();
    useEffect(()=>{
        if(authUser){
            const socket = io("https://conversa-nspg.onrender.com",{
                query:{
                    userId:authUser?._id,
                }
            })
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUser(users)
            });
            setSocket(socket);
            return()=>socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null); 
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ authUser ]);

    return(
    <SocketContext.Provider value={{socket , onlineUser}}>
        {children}
    </SocketContext.Provider>
    )
}