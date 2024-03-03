import PropTypes from 'prop-types';

function CategoryItem({ category }) {
  return <div className="text-sm bg-blue-200 rounded mr-2 last:mr-0 inline-block px-1">{`#${category}`}</div>;
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryItem;
