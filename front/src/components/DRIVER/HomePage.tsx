import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { FaTruck, FaHistory, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import ChatSidebar from './Chat/ChatSidebar';

export default function HomePage() {
    const user = useSelector((state: RootState) => state.auth.user);
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
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <ChatSidebar />
                <div className="flex-1 container mx-auto py-8 px-4">
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl shadow-lg p-8 mb-8">
                        <div className="text-gray-800">
                            <h1 className="text-4xl font-bold mb-4">Welcome back, {user?.name}!</h1>
                            <p className="text-xl opacity-90">Ready to start delivering smiles?</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatsCard
                            icon={<FaTruck className="text-yellow-500" />}
                            title="Active Deliveries"
                            value="0"
                        />
                        <StatsCard
                            icon={<FaHistory className="text-yellow-500" />}
                            title="Completed Today"
                            value="0"
                        />
                        <StatsCard
                            icon={<FaStar className="text-yellow-500" />}
                            title="Rating"
                            value="5.0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatsCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

const StatsCard = ({ icon, title, value }: StatsCardProps) => (
    <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="text-gray-600 text-sm">{title}</h3>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </div>
);
