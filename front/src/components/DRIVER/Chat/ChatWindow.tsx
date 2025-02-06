import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { format } from 'date-fns';
import { FaUser } from 'react-icons/fa';

interface ChatWindowProps {
  chatId: string;
  onSendMessage: (content: string) => void;
}

const ChatWindow = ({ chatId, onSendMessage }: ChatWindowProps) => {
  const chat = useSelector((state: RootState) => 
    state.chat.chats.find(c => c.id === chatId)
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  if (!chat) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {chat.type === 'GROUP' ? (
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 font-medium">{chat.name?.[0]}</span>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-500" />
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {chat.type === 'GROUP' 
                ? chat.name 
                : chat.participants.find(p => p.id !== currentUser?.id)?.name}
            </p>
            <p className="text-xs text-gray-500">
              {chat.participants.length} participants
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.senderId === currentUser?.id
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {message.senderId !== currentUser?.id && (
                <p className="text-xs text-gray-600 mb-1">{message.sender.name}</p>
              )}
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {format(new Date(message.createdAt), 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow; 