// import { Heart } from "lucide-react"
// import { useState, useEffect } from "react"

// interface Dish {
//   name: string
//   price: number
//   image: string
//   discount?: number
//   rating?: number
// }

// export function PopularDishes() {
//   const [dishes, setDishes] = useState<Dish[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchDishes = async () => {
//       try {
//         const response = await fetch('/api/popular-dishes') // Adjust this endpoint to match your API
//         const data = await response.json()
//         setDishes(data)
//       } catch (error) {
//         console.error('Error fetching popular dishes:', error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchDishes()
//   }, [])

//   if (isLoading) {
//     return <div>Loading...</div> // Add proper loading state UI
//   }

//   return (
//     <section className="mb-8">
        
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Popular Dishes</h2>
//         <a href="#" className="text-[#FFB800] text-sm">
//           View all
//         </a>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {dishes.map((dish) => (
//           <div key={dish.name} className="relative bg-white rounded-xl p-4">
//             {dish.discount && (
//               <span className="absolute top-6 left-6 bg-[#FF4B4B] text-white text-sm px-2 py-1 rounded">
//                 {dish.discount}% Off
//               </span>
//             )}
//             <button className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-sm">
//               <Heart className="h-4 w-4" />
//             </button>
//             <img
//               src={dish.image || "/placeholder.svg"}
//               alt={dish.name}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-semibold mb-1">{dish.name}</h3>
//                 <div className="flex items-center gap-1">
//                   {"★★★★★".split("").map((star, i) => (
//                     <span key={i} className="text-[#FFB800]">
//                       {star}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="text-right">
//                 <span className="text-[#FFB800] font-bold">${dish.price}</span>
//                 <button className="ml-2 bg-[#FFB800] text-white p-2 rounded-lg">+</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }