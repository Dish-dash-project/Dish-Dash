import { useEffect,useState } from "react";
import axios from "axios";


export function CategorySection() {
    // const categories = [
    //   { icon: "🥖", label: "Bakery" },
    //   { icon: "🍔", label: "Burger" },
    //   { icon: "🥤", label: "Beverage" },
    //   { icon: "🍗", label: "Chicken" },
    //   { icon: "🍕", label: "Pizza" },
    //   { icon: "🦐", label: "Seafood" },
    // ]
    const [categories, setCategories] = useState<Array<{ imgeUrl: string; name: string;id:number }>>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // Fetch categories when component mounts
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/categories'); // Adjust the API endpoint as needed
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCategories();
    }, []);
     // Show loading state
  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Category</h2>
          <a href="#" className="text-[#FFB800] text-sm">
            View all
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center justify-center min-w-[100px] rounded-xl bg-white p-4 transition-colors hover:bg-[#FFB800] hover:text-white"
            >
              <span className="text-2xl mb-2">{category.imgeUrl}</span>
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </section>
    )
  
}
  