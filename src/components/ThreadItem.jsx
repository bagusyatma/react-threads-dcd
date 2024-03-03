import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { DETAIL_PATH } from '../constant';
import { postedAt } from '../utils';

function ThreadItem({ id, title, body, category, totalComments, createdAt, user, inDetail }) {
  const navigate = useNavigate();

  const handleThreadClick = () => {
    if (!inDetail) {
      navigate(`${DETAIL_PATH}/${id}`);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 my-1">
        <img src={user.avatar} alt={user.name} className="inline-block h-6 w-6 rounded-full" />
        <span className="font-semibold capitalize">{user.name}</span>
        <span className="text-xl ">⁕</span>
        <span className="text-sm  text-gray-500">{postedAt(createdAt)}</span>
      </div>
      <div className={`font-bold inline-block focus:text-blue-700 focus:outline-none ${!inDetail && 'cursor-pointer'}`} onClick={handleThreadClick}>
        {title}
      </div>
      <div className={`mt-1 mb-4 ${!inDetail && 'truncate-custom'}`}>{parse(body)}</div>
      <div className="text-xs font-semibold bg-blue-200 rounded mb-2 inline-block px-1 ">{`#${category}`}</div>
      <div className="text-xs font-semibold capitalize">{`${totalComments} Comments`}</div>
    </>
  );
}

export const userTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export const threadTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userTypes).isRequired,
  inDetail: PropTypes.bool,
};

ThreadItem.propTypes = {
  ...threadTypes,
};

export default ThreadItem;
