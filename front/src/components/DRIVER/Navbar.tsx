
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Dish-Dash</h1>
        {user && <span className="text-white">Welcome, {user.name}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
