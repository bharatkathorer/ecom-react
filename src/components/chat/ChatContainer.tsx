import {useEffect, useState} from "react";
import ChatComponent from "./ChatComponent.tsx";
import socketService from "../../utils/socketioService.ts";
import {useSelector} from "react-redux";


const ChatContainer = () => {
    const [contacts, setContacts] = useState<any>([]);
    const [searchUsers, setSearchUsers] = useState<any[]>([]);
    const [receiver, setReceiver] = useState<any | null>(null);
    const {user, login} = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (login) {
            socketService.initialize();
        }
        if (user?.id) {
            socketService.connect();
            socketService.on(`messageReceived${user.id}`, handleMessageReceived);
            socketService.on(`messageSend${user.id}`, handleMessageSendSuccessfully);
            socketService.on("usersList", handleLoadUsersList);
            socketService.on("messageList", handleMessagesList);
            socketService.on("searchList", handleSearchList);
            socketService.emit("loadUserList");
        }

        return () => {
            socketService.disconnect();
            socketService.off(`messageReceived${user.id}`);
            socketService.off(`messageSend${user.id}`);
            socketService.off("usersList");
            socketService.off("messageList");
            socketService.off("searchList");
        };
    }, [user?.id]);

    const handleMessageReceived = (data: any) => {
        let isContact = false;
        setContacts((prevContacts: any) =>
            prevContacts.map((item: any) => {
                if (String(item.id) === String(data.sender_id)) {
                    isContact = true;
                    return {
                        ...item,
                        notifications: String(receiver?.id) === String(data.sender_id) ? 0 : (item.notifications || 0) + 1,
                        message: data.message,
                        messages: [...item.messages, data],
                    };
                }
                return item;
            })
        );

        setReceiver((prevReceiver: any) => {
                return (prevReceiver?.id == data?.sender_id) ? {
                    ...prevReceiver,
                    messages: [...prevReceiver.messages, data],
                    message: data.message
                } : prevReceiver
            }
        );
        if (!isContact) {
            socketService.emit("loadUserList");
        }
        scrollToBottom();
    };

    const handleLoadUsersList = (users: any) => {
        setContacts(users.map((user: any) => ({...user, messages: []})));

        if (receiver?.id && !receiver.message) {
            const activeUser = users.find((user: any) => user.id === receiver.id);
            if (activeUser) openChat(activeUser);
        }
    };

    const handleMessageSendSuccessfully = (data: any) => {
        setReceiver((prevReceiver: any) =>
            prevReceiver ? {...prevReceiver, messages: [...prevReceiver.messages, data], message: data.message} : null
        );
        scrollToBottom();
    };

    const openChat = (user: any) => {
        setContacts((prevContacts: any) =>
            prevContacts.map((item: any) => {
                if (String(item.id) === String(user.id)) {
                    return {
                        ...item,
                        notifications: 0
                    };
                }
                return item;
            })
        );
        setReceiver({...user, notifications: 0});
        socketService.emit("loadMessages", user.id);
    };

    const handleMessagesList = (data: any) => {
        setReceiver((prevReceiver: any) => (prevReceiver ? {...prevReceiver, messages: data} : null));
        scrollToBottom();
    };

    const handleSendMessage = (message: string) => {
        if (receiver) {
            socketService.emit("sendMessage", {
                receiver_id: receiver.id,
                message,
            });
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            const chatContainer = document.getElementById('chatMessage');
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }, 100)
    };

    const handleSearchList = (data: any) => {
        setSearchUsers(data);
    };

    const handleSearch = (val: string) => {
        socketService.emit("searchUser", val);
    };

    return <ChatComponent
        onSendMessage={handleSendMessage}
        onCloseChat={() => setReceiver(null)}
        users={contacts}
        searchUsers={searchUsers}
        user={receiver || {}}
        onOpenChat={openChat}
        onSearch={handleSearch}
    />;
};

export default ChatContainer;
