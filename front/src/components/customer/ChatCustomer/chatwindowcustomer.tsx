import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { format } from 'date-fns';
import { FaUser, FaPaperPlane, FaImage, FaComments } from 'react-icons/fa';
import { sendMessage, fetchMessages } from '../../../store/slice/chatSlice';
import { getFullImageUrl } from '../../../utils/imageUtils';
import LoadingSpinner from '../../common/LoadingSpinner';

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}

interface ChatWindowProps {
  chatId: string;
}

const ChatWindowcustomer = ({ chatId }: ChatWindowProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const chat = useSelector((state: RootState) => 
    state.chat.chats.find(c => c.id === chatId)
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchMessages(chatId)).unwrap();
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMessages();
  }, [chatId, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending || !chatId) return;

    setIsSending(true);
    try {
      await dispatch(sendMessage({
        chatId,
        content: newMessage.trim()
      })).unwrap();
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Message send failed:', error);
      // Consider adding error state feedback
    } finally {
      setIsSending(false);
    }
  };

  if (!chat) return null;

  const otherParticipant = chat.participants.find(p => p.id !== currentUser?.id);

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.senderId === currentUser?.id;
    
    return (
      <div
        key={message.id}
        className={`flex items-start space-x-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
      >
        {/* User Avatar */}
        <div className="flex-shrink-0">
          {message.sender?.imageUrl ? (
            <img
              src={getFullImageUrl(message.sender.imageUrl)}
              alt={message.sender.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-500 text-sm" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-gray-500 mb-1">{message.sender.name}</span>
          <div
            className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
              isOwnMessage 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 mt-1">
            {format(new Date(message.createdAt), 'HH:mm')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center">
        <div className="flex items-center space-x-3">
          {otherParticipant?.imageUrl ? (
            <img
              src={getFullImageUrl(otherParticipant.imageUrl)}
              alt={otherParticipant.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-500 text-xl" />
            </div>
          )}
          <div>
            <h3 className="font-medium text-lg">{otherParticipant?.name}</h3>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner size="lg" />
          </div>
        ) : chat.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FaComments className="text-4xl mb-2" />
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation with {otherParticipant?.name}</p>
          </div>
        ) : (
          chat.messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-yellow-500 transition-colors"
          >
            <FaImage className="text-xl" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane className={`text-lg ${isSending ? 'opacity-50' : ''}`} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindowcustomer; 