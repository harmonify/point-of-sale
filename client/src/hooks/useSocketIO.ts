import { socket } from "@/app/socket"
import { useEffect, useState } from "react"

export interface ISocketIOHandler {
  event: string
  listener: (...args: any[]) => void
}

export const useSocketIO = (handlers: ISocketIOHandler[] = []) => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    handlers.forEach((h) => {
      console.log(`🚀 ~ beenr aje ~ ${JSON.stringify(h.event, null, 2)}`);
      socket.on(h.event, h.listener)
    })

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      handlers.forEach((h) => {
        socket.off(h.event, h.listener)
      })
    }
  }, [])

  return { isConnected, socket }
}
