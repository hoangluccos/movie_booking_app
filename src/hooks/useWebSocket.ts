import { useRef, useCallback, useState } from "react";

type MessageHandler = (data: any) => void;

export const useWebSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const connect = useCallback(
    (userId: string, onMessage: MessageHandler): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (socketRef.current) {
          resolve(); // đã kết nối rồi
          return;
        }

        const socket = new WebSocket(
          `ws://10.0.2.2:8080/matching?userId=${userId}`
        );

        socket.onopen = () => {
          console.log("✅ WebSocket connected!");
          setIsConnected(true);
          setIsLoading(true);
          resolve();
        };

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            console.log("📩 Received:", data);
            onMessage(data);
          } catch (err) {
            console.error("❌ Error parsing WebSocket message:", err);
          }
        };

        socket.onerror = (event: Event) => {
          console.error("🔥 WebSocket error event:", event);
          reject(event);
        };

        socket.onclose = () => {
          console.log("❌ WebSocket disconnected.");
          setIsConnected(false);
        };

        socketRef.current = socket;
      });
    },
    []
  );

  const disconnect = () => {
    console.log("click disconnect");
    if (socketRef.current) {
      setIsLoading(false);
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  return { connect, disconnect, isConnected, isLoading };
};
