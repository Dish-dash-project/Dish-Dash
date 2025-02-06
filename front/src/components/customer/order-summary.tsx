import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeItem, updateQuantity } from '../../store/slice/orderSlice';

// interface MenuItem {
//   name: string;
//   imageUrl: string;
// }

// interface item {
//   id: number;
//   price: number; // Changed from string to number
//   quantity: number;
//   menuItemId?: number;
//   MenuItem: {
//     name: string;
//     imageUrl: string;
//   };
// }

export function OrderSummary() {
    const dispatch = useDispatch();
    const { items, loading} = useSelector((state: RootState) => state.order);
    const [serviceCharge] = useState(1.00);
    const [updating, setUpdating] = useState<number | null>(null); // Track which item is being updated

    useEffect(() => {
        fetchOrderData();
    }, []);

    const fetchOrderData = async () => {
        try {
            const orderResponse = await axios.get(`http://localhost:3000/api/order/`);
            dispatch(updateQuantity({ id: orderResponse.data.id, quantity: orderResponse.data.quantity }));
        } catch (error) {
            console.error('Error fetching order data:', error);
        } finally {
            setUpdating(null);
        }
    };

    const updateItemQuantity = (itemId: number, change: number) => {
        const item = items.find((item) => item.id === itemId);
        if (!item) return;

        const newQuantity = item.quantity + change;

        if (newQuantity <= 0) {
            dispatch(removeItem(itemId));
        } else {
            dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
        }
    };

    const calculateTotal:any = () => {
        const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return itemsTotal + serviceCharge;
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
      <aside className="w-[320px] bg-white p-6">
        <h2 className="text-xl font-bold mb-6">Your Balance</h2>
        <div className="bg-gradient-to-r from-[#FFB800] to-[#FFD449] rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white">Balance</span>
            <div className="flex gap-2">
              <button className="bg-white/20 p-2 rounded-lg">
                <span className="text-white">💰</span>
              </button>
              <button className="bg-white/20 p-2 rounded-lg">
                <span className="text-white">↗️</span>
              </button>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">${250}</div>
        </div>
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

        <div>
          <h3 className="font-semibold mb-4">Order Menu</h3>
          <div className="space-y-4 mb-6">
            {items.map((item:any) => (
              <div key={item.id} className="flex items-center gap-3">
                <img 
                  src={item.MenuItem.imageUrl} 
                  alt={item.MenuItem.name} 
                  className="w-12 h-12 rounded-lg object-cover" 
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.MenuItem.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <button 
                      onClick={() => updateItemQuantity(item.id, -1)}
                      disabled={updating === item.id}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-sm text-gray-500 min-w-[20px] text-center">
                      {updating === item.id ? '...' : item.quantity}
                    </span>
                    <button 
                      onClick={() => updateItemQuantity(item.id, 1)}
                      disabled={updating === item.id}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[#FFB800] font-bold block">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  <span className="text-xs text-gray-500">
                    ${parseFloat(item.price).toFixed(2)} each
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">+${serviceCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <button 
            className="w-full bg-[#FFB800] text-white py-3 rounded-xl mb-4 hover:bg-[#e6a600] transition-colors"
            onClick={() => {
              console.log('Processing checkout...');
            }}
          >
            Checkout
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 border rounded-xl py-3 hover:bg-gray-50 transition-colors">
            <span>🎫</span>
            Have a coupon code?
          </button>
        </div>
      </aside>
    );
}