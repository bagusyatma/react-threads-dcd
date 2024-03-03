import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';

function CategoryList({ categories }) {
  return (
    <div className="p-2 rounded-md bg-blue-50 h-fit lg:sticky lg:top-4">
      <div className="mb-2 font-semibold">Categories</div>
      <div>
        {categories.map((category) => (
          <CategoryItem key={category} category={category} />
        ))}
      </div>
    </div>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoryList;
