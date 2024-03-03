import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateData } from '../states/shared/action';
import ThreadsList from '../components/ThreadsList';
import CategoryList from '../components/CategoryList';

function ThreadsPage() {
  const { threads = [], users = [], authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateData());
  }, [dispatch]);

  const threadList = threads?.map((thread) => ({
    ...thread,
    user: users?.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const categories = [...new Set(threads?.map((thread) => thread.category))];

  return (
    <div className="flex flex-col-reverse gap-2 lg:grid lg:grid-cols-12 lg:gap-8 relative">
      <div className="col-span-8">
        <ThreadsList threads={threadList} />
      </div>
      <div className="col-span-4">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
}

export default ThreadsPage;
