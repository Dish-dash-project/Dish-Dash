import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { FaComments, FaCircle } from 'react-icons/fa';
import { fetchChats, sendMessage, setActiveChat } from '../../../store/slice/chatSlice';
import { getFullImageUrl } from '../../../utils/imageUtils';

const ChatSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { chats, activeChat } = useSelector((state: RootState) => state.chat);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch chats when component mounts
    dispatch(fetchChats());
  }, [dispatch]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChat || !newMessage.trim()) return;

    try {
      await dispatch(sendMessage({
        chatId: activeChat,
        content: newMessage
      })).unwrap();
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleChatSelect = (chatId: string) => {
    dispatch(setActiveChat(chatId));
  };

  return (
    <div className="w-80 bg-white h-screen border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold flex items-center">
          <FaComments className="mr-2 text-yellow-500" />
          Messages
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => {
          const otherParticipant = chat.participants.find(p => p.id !== user?.id);
          
          return (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-yellow-50 transition-colors ${
                activeChat === chat.id ? 'bg-yellow-100' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    {otherParticipant?.imageUrl ? (
                      <img
                        src={getFullImageUrl(otherParticipant.imageUrl)}
                        alt={otherParticipant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                        {otherParticipant?.name[0]}
                      </div>
                    )}
                    <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{otherParticipant?.name}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                </div>
                {chat.unreadCount > 0 && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeChat && (
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatSidebar; 