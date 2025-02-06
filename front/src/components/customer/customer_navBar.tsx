import { Bell, MessageSquare, Search, Settings } from "lucide-react"
import { filterProductByQuery } from '../../store/slice/filterProductByQuery.ts';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AppDispatch } from "../../store/store.tsx";
import { useSelector } from 'react-redux';

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
  const dispatch = useDispatch<AppDispatch>(); // Add AppDispatch type
  const [query, setQuery] = useState("");
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
          e.preventDefault();
          dispatch(filterProductByQuery(query));
          setQuery(""); // Clear the input after search
      }
  };
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">Hello, Patricia</h1>
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
        <button className="p-2 rounded-full bg-white border">
          <Settings className="h-5 w-5" />
        </button>
        <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="h-10 w-10 rounded-full border" />
      </div>
    </div>
  )
}

