import { Sidebar } from "./customer_asid"
import { Navbar } from "./customer_navBar"
import { CategorySection } from "./category-section"
import { RecentOrders } from "./recent-orders"
import { OrderSummary } from "./order-summary"
// import { PopularDishes } from "./popular-dishes"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
     
      <main className="flex-1 p-8">
        <Navbar />
        
        <div className="mb-8 rounded-2xl bg-[#FFB800] p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Get Discount Voucher</h2>
            <h3 className="text-2xl font-semibold mb-4">Up To 20%</h3>
            <p className="max-w-md text-sm opacity-90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3">
            <img src="/placeholder.svg?height=200&width=200" alt="Promo" className="h-full w-full object-cover" />
          </div>
        </div>

        <CategorySection />
        {/* <PopularDishes /> */}
        <RecentOrders />

      </main>
      <OrderSummary />
    </div>
  )
}

