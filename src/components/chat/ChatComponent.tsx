// ChatComponent
import {useState} from "react";
import {ArrowLeftIcon, ChatBubbleBottomCenterIcon, PaperAirplaneIcon, XMarkIcon,} from "@heroicons/react/20/solid";
import {useSelector} from "react-redux";

type User = {
    id: string;
    name: string;
    message: string;
    date?: string;
    notifications?: number;
    messages?: { isMe: boolean; message: string; created_at: string }[];
};

type ChatWidgetProps = {
    users?: User[];
    searchUsers?: User[];
    user?: User;
    onSendMessage: (message: string) => void;
    onOpenChat: (user: any) => void;
    onCloseChat: () => void;
    onSearch: (query: string) => void;
};

const ChatComponent = ({
                           users = [],
                           searchUsers = [],
                           user,
                           onSendMessage,
                           onOpenChat,
                           onCloseChat,
                           onSearch
                       }: ChatWidgetProps) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isChat, setIsChat] = useState<User | null>(null);
    const authUser = useSelector((state: any) => state.auth.user);
    const [form, setForm] = useState<{ message: string }>({message: ""});
    const [searchForm, setSearchForm] = useState<{ query: string }>({query: ""});


    const toggleChat = () => setIsShow(!isShow);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.message.trim()) {
            onSendMessage(form.message);
            setForm({message: ""});
        }
    };

    const handleOpenChat = (item: User) => {
        setIsChat(item);
        setSearchForm({query: ""});
        onOpenChat(item);
    };

    const formatTime = (isoString: string): string => {
        const date = new Date(isoString);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    return (
        <>
            {/* Floating Button */}
            <div onClick={toggleChat}
                 className="fixed z-50 bottom-10 right-10 bg-blue-500 text-white flex items-center justify-center rounded-full h-10 w-10 cursor-pointer">
                {isShow ? <XMarkIcon className="h-6 w-6"/> : <ChatBubbleBottomCenterIcon className="h-6 w-6"/>}
            </div>

            {/* Chat Box */}
            {isShow && (
                <div
                    className="w-80 fixed bottom-24 right-10 bg-white  rounded-lg shadow-lg overflow-hidden z-50">
                    {!isChat ? (
                        <div className="flex flex-col h-96">
                            <div className="bg-gray-50 py-2 px-3">
                                <h2 className="text-lg text-gray-600">Hey, {authUser?.name}</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <form onSubmit={(e) => e.preventDefault()} className="flex bg-gray-50">
                                    <input
                                        type="text"
                                        value={searchForm.query}
                                        onChange={(e) => {
                                            setSearchForm({query: e.target.value});
                                            onSearch(e.target.value);
                                        }}
                                        placeholder="Search..."
                                        className="w-full border-b border-gray-200 px-4 py-2 focus:outline-none"
                                    />
                                </form>
                                <ul>
                                    {(searchForm.query ? searchUsers : users).length > 0 ? (
                                        (searchForm.query ? searchUsers : users).map((item) => (
                                            <li key={item.id} onClick={() => handleOpenChat(item)}
                                                className="flex relative items-center px-3 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100">
                                                <img className="w-10 h-10 rounded-full"
                                                     src={`https://ui-avatars.com/api/?name=${item?.name}&background=4e80ee&color=fff`}
                                                     alt={item.name}/>
                                                {
                                                    ((item.notifications??0)>=1) &&
                                                    <span
                                                        className="absolute text-xs bg-green-500 text-white rounded-full left-2 bottom-1 px-1">
                                                    {item.notifications}
                                                </span>
                                                }
                                                <div className="ml-3">
                                                    <span className="font-semibold text-gray-600">{item.name}</span>
                                                    <p className="text-sm text-gray-600">{item.message}</p>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-4 text-center">No record found</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-96">
                            <div className="bg-gray-50 py-2 px-3 flex items-center border-b border-gray-200">
                                <ArrowLeftIcon onClick={() => {
                                    setIsChat(null);
                                    onCloseChat();
                                }} className="h-5 w-5 cursor-pointer"/>
                                <img className="w-10 h-10 rounded-full mx-3"
                                     src={`https://ui-avatars.com/api/?name=${isChat?.name}&background=4e80ee&color=fff`}
                                     alt={isChat.name}/>
                                <span className="font-semibold text-gray-600">{isChat.name}</span>
                            </div>
                            <div className="flex-1 overflow-y-auto px-4 py-2" id="chatMessage">
                                {user?.messages?.map((item, index) => (
                                    <div key={index}
                                         className={`flex flex-col ${item.isMe ? "items-end" : "items-start"}`}>
                                        <div
                                            className={`p-2 max-w-xs text-white rounded-lg ${item.isMe ? "bg-green-500" : "bg-blue-500"}`}>
                                            <p>{item.message}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">{formatTime(item.created_at)}</span>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex bg-gray-50">
                                <input type="text" value={form.message}
                                       onChange={(e) => setForm({message: e.target.value})}
                                       placeholder="Type your message..."
                                       className="w-full border border-gray-200 rounded-l-lg px-4 py-2 focus:outline-none"/>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                                    <PaperAirplaneIcon className="h-5 w-5"/>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatComponent;

