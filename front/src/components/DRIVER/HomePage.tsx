
import Navbar from './Navbar';
import Profile from './Profile';

export default function HomePage() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8">
                <Profile />
            </div>
        </div>
    );
}
