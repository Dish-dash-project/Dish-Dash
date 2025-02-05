export function OrderSummary() {
    const orderItems = [
      { name: "Pepperoni Pizza", price: 5.59, quantity: 1 },
      { name: "Cheese Burger", price: 5.59, quantity: 1 },
      { name: "Vegan Pizza", price: 5.59, quantity: 1 },
    ]
  
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
          <div className="text-2xl font-bold text-white mb-2">$12.000</div>
        </div>
  
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Your Address</h3>
            <button className="text-[#FFB800] text-sm">Change</button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-medium mb-1">Elm Street, 23</p>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                <img src="/placeholder.svg?height=50&width=50" alt={item.name} className="w-12 h-12 rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">x1</p>
                </div>
                <span className="text-[#FFB800] font-bold">+${item.price}</span>
              </div>
            ))}
          </div>
  
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">+$1.00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold">$202.00</span>
            </div>
          </div>
  
          <button className="w-full bg-[#FFB800] text-white py-3 rounded-xl mb-4">Checkout</button>
          <button className="w-full flex items-center justify-center gap-2 border rounded-xl py-3">
            <span>🎫</span>
            Have a coupon code?
          </button>
        </div>
      </aside>
    )
  }
  
  