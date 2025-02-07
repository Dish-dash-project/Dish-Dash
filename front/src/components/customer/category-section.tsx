import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchCategoryById } from "../../store/slice/categorySlice";
import { AppDispatch, RootState } from "../../store/store.tsx";
import { setSelectedCategory } from "../../store/slice/categorySlice.ts";
import { advancedSearch } from '../../store/slice/advancedSearchSlice'; // Import advancedSearch


export function CategorySection() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (id: number) => {
    
    dispatch(advancedSearch({ categoryId: id })); // Dispatch advanced search with category ID
    // Add this line
    dispatch(fetchCategoryById(id))
      .then((action) => {
        console.log('Category data:', action.payload);
        // You can add navigation or other logic here
      })
      .catch((error) => {
        console.error('Error fetching category:', error);
      });
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Category</h2>
        <a href="#" className="text-[#FFB800] text-sm">
          View all
        </a>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {categories.map((category:any) => (
          <button
            key={category.id}
            className="flex flex-col items-center justify-center min-w-[100px] rounded-xl bg-white p-4 transition-colors hover:bg-[#FFB800] hover:text-white"
            onClick={() => handleCategoryClick(category.id)}

          >
            <span className="text-2xl mb-2">{category.imageUrl}</span>
            <span className="text-sm"> {category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}