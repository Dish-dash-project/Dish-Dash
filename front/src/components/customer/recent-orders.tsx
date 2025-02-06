import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { filterProduct } from "../../store/slice/filterProductByQuery.ts"
import { AppDispatch } from '../../store/store.tsx';
import { addItem } from '../../store/slice/orderSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.tsx';
import { fetchCategories } from "../../store/slice/categorySlice";


interface Restaurant {
  id: number
  name: string
  description: string
  imageUrl: string
  price: string
  createdAt: string
  updatedAt: string
  ownerId: number
  categoryId: number | null
}

  export function RecentOrders() {


 
  const { filteredProducts, loading ,error} = useSelector((state: RootState) => state.filterProductByQuery);
  const { categories } = useSelector((state: RootState) => state.category);
  console.log('filteredProducts', filteredProducts)
  const [showAll, setShowAll] = useState(false); // New state to toggle between all and filtered results
  const [ordering, setOrdering] = useState<number | null>(null); // Track which item is being ordered

//   const navigate = useNavigate()



  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(filterProduct());
    dispatch(fetchCategories());
  }, [dispatch]);
  





  const handleOrder = async (menuItem: Restaurant) => {
    try {
      setOrdering(menuItem.id);
      
      // Dispatch action to add item to order
      dispatch(addItem({
        id: Date.now(), // Generate a unique ID for the order item
        quantity: 1,
        price: parseFloat(menuItem.price),
        menuItemId: menuItem.id,
        MenuItem: {
          name: menuItem.name,
          imageUrl: menuItem.imageUrl,
        },
      }));

      // Show success message or update UI
      console.log('Item added to order:', menuItem);
      
      // Optionally navigate to cart/order summary
      // navigate('/cart');
      
    } catch (error) {
      console.error('Error adding item to order:', error);
    } finally {
      setOrdering(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Order</h2>
        <a href="#" className="text-[#FFB800] text-sm">
          View all
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((restaurant:any) => (
          <div key={restaurant.id} className="bg-white rounded-xl p-4">
            <div className="relative mb-4">
              <img


                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <h3 className="font-semibold mb-2">{restaurant.name}</h3>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{restaurant.description}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[#FFB800] font-bold">${restaurant.price}</span>
              <button 
                className={`
                  bg-[#FFB800] text-white px-4 py-2 rounded-lg
                  ${ordering === restaurant.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e6a600]'}
                  transition-all duration-200
                `}
                onClick={() => handleOrder(restaurant)}
                disabled={ordering === restaurant.id}
              >
                {ordering === restaurant.id ? 'Adding...' : 'Order'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}