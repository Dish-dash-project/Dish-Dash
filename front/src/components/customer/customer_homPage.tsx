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
        
      

        <CategorySection />
        {/* <PopularDishes /> */}
        <RecentOrders />

      </main>
      <OrderSummary />
    </div>
  )
}

