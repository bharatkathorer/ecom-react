import {io, Socket} from "socket.io-client";
import {BASE_URL} from "./const.tsx";

interface SocketService {
    connect: () => void;
    disconnect: () => void;
    on: (event: string, callback: (data: any) => void) => void;
    off: (event: string, callback?: (data: any) => void) => void;
    emit: (event: string, data?: any) => void;
}

class SocketClient implements SocketService {
    private socket: Socket | null = null;

    constructor() {
    }

    initialize() {
        const token = localStorage.getItem("token");
        if (!token) return;

        this.socket = io(BASE_URL, {
            autoConnect: false,
            auth: {token},
        });

        this.socket.on("connect", () => console.log("Socket Connected"));
        this.socket.on("disconnect", () => console.log("Socket Disconnected"));

        this.connect();
    }

    connect() {
        if (this.socket && !this.socket.connected) {
            this.socket.connect();
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    on(event: string, callback: (data: any) => void) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    off(event: string, callback?: (data: any) => void) {
        if (this.socket) {
            if (callback) {
                this.socket.off(event, callback);
            } else {
                this.socket.off(event);
            }
        }
    }

    emit(event: string, data?: any) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }
}

const socketService = new SocketClient();
export default socketService;
