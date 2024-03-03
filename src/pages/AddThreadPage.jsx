import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncPopulateData } from '../states/shared/action';
import { asyncAddThread } from '../states/threads/action';
import { DEFAULT_PATH } from '../constant';

function AddThreadPage() {
  const [title, titleChange] = useInput('');
  const [category, categoryChange] = useInput('');

  const [body, setBody] = useState('');

  const bodyChange = (e) => {
    setBody(e.target.innerHTML);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateData());
  }, [dispatch]);

  const handleSubmit = (e, obj) => {
    e.preventDefault();

    if (obj.title && obj.body) {
      dispatch(asyncAddThread({ title: obj.title, category: obj.category, body: obj.body }));
      navigate(DEFAULT_PATH);
    }
  };

  const disabledSubmit = (obj) => {
    if (!obj.title || !obj.body) {
      return true;
    }

    return false;
  };

  const stylesInput = () => 'w-full px-2 py-1 focus:border-b-2 focus:border-blue-300 focus:outline-none text-base placeholder:italic';
  return (
    <div className="w-2/5">
      <div className="my-3 font-bold text-xl text-blue-500">express yourself but don&#39;t be afraid! ok?~</div>
      <form>
        <div className="flex flex-col gap-2">
          <div>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={titleChange}
              className={stylesInput()}
              placeholder="type the title..."
              autoComplete="off"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={categoryChange}
              className={stylesInput()}
              placeholder="type the category... (optional)"
              autoComplete="off"
            />
          </div>
          <div>
            <div className={`${stylesInput()} h-36`} data-placeholder="type what's in your heart..." contentEditable onInput={bodyChange} />
          </div>
          <div>
            <div className="text-xs mx-1 text-blue-300">still dare?</div>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, { title, category, body })}
              className={`${
                disabledSubmit({ title, category, body }) ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }  px-2 py-1 rounded-md font-semibold text-white `}
              disabled={disabledSubmit({ title, category, body })}
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddThreadPage;
