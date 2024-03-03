import PropTypes from 'prop-types';
import ThreadItem, { threadTypes } from './ThreadItem';

function ThreadsList({ threads }) {
  return threads
    ? threads.map((thread) => (
        <div key={thread.id} className="bg-blue-50 rounded-md p-3 gap-2 mb-2 last:mb-0 hover:bg-blue-100">
          <ThreadItem {...thread} />
        </div>
      ))
    : null;
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadTypes)).isRequired,
};

export default ThreadsList;
