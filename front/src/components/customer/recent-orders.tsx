import { Heart } from "lucide-react"

const orders = [
  {
    name: "Fish Burger",
    image: "/placeholder.svg?height=200&width=200",
    distance: "4.97 km",
    time: "21 min",
    price: 5.59,
  },
  {
    name: "Japan Ramen",
    image: "/placeholder.svg?height=200&width=200",
    distance: "4.97 km",
    time: "21 min",
    price: 5.59,
  },
  {
    name: "Fried Rice",
    image: "/placeholder.svg?height=200&width=200",
    distance: "4.97 km",
    time: "21 min",
    price: 5.59,
  },
]

export function RecentOrders() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Order</h2>
        <a href="#" className="text-[#FFB800] text-sm">
          View all
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.name} className="bg-white rounded-xl p-4">
            <div className="relative mb-4">
              <img
                src={order.image || "/placeholder.svg"}
                alt={order.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <h3 className="font-semibold mb-2">{order.name}</h3>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{order.distance}</span>
              <span>{order.time}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[#FFB800] font-bold">${order.price}</span>
              <button className="bg-[#FFB800] text-white px-4 py-2 rounded-lg">Reorder</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

