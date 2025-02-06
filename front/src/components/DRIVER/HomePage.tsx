import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import ChatSidebar from './Chat/ChatSidebar';
import ChatWindow from './Chat/ChatWindow';

export default function HomePage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const activeChat = useSelector((state: RootState) => state.chat.activeChat);
    const [isLoading] = useState(false);
    const [error] = useState<string | null>(null);

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
            <div className="flex h-[calc(100vh-64px)]"> {/* Adjust height to account for navbar */}
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
        </div>
    );
}
