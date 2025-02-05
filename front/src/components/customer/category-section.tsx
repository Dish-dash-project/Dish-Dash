export function CategorySection() {
    const categories = [
      { icon: "🥖", label: "Bakery" },
      { icon: "🍔", label: "Burger" },
      { icon: "🥤", label: "Beverage" },
      { icon: "🍗", label: "Chicken" },
      { icon: "🍕", label: "Pizza" },
      { icon: "🦐", label: "Seafood" },
    ]
  
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
              key={category.label}
              className="flex flex-col items-center justify-center min-w-[100px] rounded-xl bg-white p-4 transition-colors hover:bg-[#FFB800] hover:text-white"
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm">{category.label}</span>
            </button>
          ))}
        </div>
      </section>
    )
  }
  
  