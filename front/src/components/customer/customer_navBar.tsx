import { Bell, MessageSquare, Search, Settings, LogOut, User } from "lucide-react"
import { filterProductByQuery } from '../../store/slice/filterProductByQuery.ts';
import { advancedSearch } from '../../store/slice/advancedSearchSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { AppDispatch, RootState } from "../../store/store.tsx";
import { logout } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filteredProducts: Product[];
  product: Product | null;
}

export function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
          e.preventDefault();
          dispatch(advancedSearch({ menuName: query }))
          setQuery(""); // Clear the input after search
      }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    navigate('/profiles');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">
          Hello, {user?.name || 'Guest'}
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What do you want to eat today..."
            className="w-full rounded-full bg-white pl-10 pr-4 py-2 text-sm outline-none border border-gray-200"
          />
        </div>
        <button className="p-2 rounded-full bg-white border">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full bg-white border">
          <Bell className="h-5 w-5" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button 
            className="p-2 rounded-full bg-white border hover:bg-gray-100"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Settings className="h-5 w-5" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
