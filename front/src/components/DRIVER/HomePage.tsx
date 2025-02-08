import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import ChatSidebar from './Chat/ChatSidebar';
import ChatWindow from './Chat/ChatWindow';
import Orders from './Orders';
import { FaComments, FaBox } from 'react-icons/fa';

export default function HomePage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const activeChat = useSelector((state: RootState) => state.chat.activeChat);
    const [isLoading] = useState(false);
    const [error] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'chat' | 'orders'>('orders'); // Default to orders tab

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`py-4 px-2 flex items-center space-x-2 border-b-2 font-medium transition-colors ${
                                activeTab === 'orders'
                                    ? 'border-yellow-500 text-yellow-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <FaBox />
                            <span>Orders</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`py-4 px-2 flex items-center space-x-2 border-b-2 font-medium transition-colors ${
                                activeTab === 'chat'
                                    ? 'border-yellow-500 text-yellow-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <FaComments />
                            <span>Chat</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 py-6">
                {activeTab === 'chat' ? (
                    <div className="flex h-[calc(100vh-180px)]">
                        <ChatSidebar />
                        <div className="flex-1 flex flex-col">
                            {activeChat ? (
                                <ChatWindow chatId={activeChat} />
                            ) : (
                                <div className="flex-1 flex items-center justify-center bg-gray-100">
                                    <div className="text-center">
                                        <h3 className="text-xl font-medium text-gray-600">Select a conversation</h3>
                                        <p className="text-gray-500 mt-2">Choose a chat from the sidebar to start messaging</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <Orders />
                )}
            </div>
        </div>
    );
}
