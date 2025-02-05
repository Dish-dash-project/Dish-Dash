import { useState, useEffect } from 'react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface UserAddress {
  street: string;
  details: string;
}

export function OrderSummary() {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [serviceCharge] = useState(1.00); // Could also come from backend

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                // Fetch order items
                const orderResponse = await fetch('/api/order-items');
                const orderData = await orderResponse.json();
                setOrderItems(orderData);

                // Fetch user address
                const addressResponse = await fetch('/api/user-address');
                const addressData = await addressResponse.json();
                setUserAddress(addressData);

                // Fetch user balance
                const balanceResponse = await fetch('/api/user-balance');
                const balanceData = await balanceResponse.json();
                setBalance(balanceData.balance);
            } catch (error) {
                console.error('Error fetching order data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, []);

    const calculateTotal = () => {
        const itemsTotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return itemsTotal + serviceCharge;
    };

    if (loading) {
        return <div>Loading...</div>; // Add proper loading state UI
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
          <div className="text-2xl font-bold text-white mb-2">${balance.toFixed(3)}</div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Your Address</h3>
            <button className="text-[#FFB800] text-sm">Change</button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-medium mb-1">{userAddress?.street}</p>
            <p className="text-sm text-gray-500">{userAddress?.details}</p>
            <div className="flex gap-2 mt-2">
              <button className="text-xs bg-white px-3 py-1 rounded border">Add Details</button>
              <button className="text-xs bg-white px-3 py-1 rounded border">Add Note</button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Order Menu</h3>
          <div className="space-y-4 mb-6">
            {orderItems.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <img 
                  src={item.image || "/placeholder.svg?height=50&width=50"} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-lg" 
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                </div>
                <span className="text-[#FFB800] font-bold">+${item.price}</span>
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
            className="w-full bg-[#FFB800] text-white py-3 rounded-xl mb-4"
            onClick={() => {
              // Add checkout logic here
              console.log('Processing checkout...');
            }}
          >
            Checkout
          </button>
          <button className="w-full flex items-center justify-center gap-2 border rounded-xl py-3">
            <span>🎫</span>
            Have a coupon code?
          </button>
        </div>
      </aside>
    );
}