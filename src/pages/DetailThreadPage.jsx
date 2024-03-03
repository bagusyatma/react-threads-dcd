import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';
import { asyncCreateCommentThreadDetail, asyncReceiveThreadDetail } from '../states/threadDetail/action';
import { postedAt } from '../utils';

function DetailThreadPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { threadDetail = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const commentChange = (e) => {
    setComment(e.target.innerHTML);
  };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const sendComment = (content) => {
    dispatch(asyncCreateCommentThreadDetail({ content, threadId: id }));
    setComment('');
  };

  const stylesInput = () => 'w-full px-2 py-1 rounded-md border-2 focus:border-blue-300 focus:outline-none text-base placeholder:italic';

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="mb-8">
      <span className="text-xs cursor-pointer hover:bg-red-100 rounded p-1" onClick={() => navigate(-1)}>
        {'< Back'}
      </span>
      <ThreadItem
        id={threadDetail.id}
        title={threadDetail.title}
        body={threadDetail.body}
        category={threadDetail.category}
        totalComments={threadDetail.comments.length}
        createdAt={threadDetail.createdAt}
        user={threadDetail.owner}
        inDetail
      />

      <hr className="my-2" />

      <div>
        <div
          className={`${stylesInput()} min-h-[64px]`}
          data-placeholder="type what's on your mind after seeing this thread..."
          contentEditable
          onInput={commentChange}
        />

        <div className="flex justify-end my-2">
          <button type="button" onClick={() => sendComment(comment)} className="bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded-md font-semibold text-white">
            Send!
          </button>
        </div>
      </div>

      <div className="mt-8">
        {threadDetail.comments &&
          threadDetail.comments.length > 0 &&
          threadDetail.comments.map((item) => (
            <div key={item.id} className="p-2 my-2 bg-blue-50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={item.owner.avatar} alt={item.owner.name} className="inline-block h-6 w-6 rounded-full" />
                  <span className="font-semibold capitalize">{item.owner.name}</span>
                </div>
                <span className="text-sm text-gray-500">{postedAt(item.createdAt)}</span>
              </div>
              <div className="mt-2">{parse(item.content)}</div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default DetailThreadPage;
