import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeItem, updateQuantity } from '../../store/slice/orderSlice';
import { MapPin } from 'lucide-react';
import LocationMap from '../googlemaps/HomePage';

export function OrderSummary() {
    const dispatch = useDispatch();
    const { items, loading} = useSelector((state: RootState) => state.order);
    const [serviceCharge] = useState(1.00);
    const [updating, setUpdating] = useState<number | null>(null); // Track which item is being updated
    const [showMap, setShowMap] = useState(false);

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

    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        return subtotal + serviceCharge;
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            dispatch(removeItem(itemId));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleQuantityChange = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        setUpdating(itemId);
        try {
            dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setUpdating(null);
        }
    };

    return (
        <>
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
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={updating === item.id}
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="text-sm text-gray-500 min-w-[20px] text-center">
                              {updating === item.id ? '...' : item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
                    onClick={() => setShowMap(true)}
                    className="w-full mb-4 flex items-center justify-center gap-2 rounded-lg border-2 border-[#FFB800] bg-white px-4 py-2.5 text-[#FFB800] hover:bg-[#FFB800] hover:text-white transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    Select Delivery Location
                  </button>

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

              {/* Map Modal */}
              {showMap && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                  <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMap(false)}></div>
                  <div className="relative min-h-screen flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-2xl w-full max-w-7xl">
                      <button 
                        onClick={() => setShowMap(false)}
                        className="absolute right-4 top-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <LocationMap />
                    </div>
                  </div>
                </div>
              )}
        </>
    );
}