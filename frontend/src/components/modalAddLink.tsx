import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { X } from 'phosphor-react';
import { GlobalContext } from '../contexts/GlobalContext';
import Spinner from './spinner';

interface IModalEditLinkProps {
  setModalAddIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalAddLink(props: IModalEditLinkProps) {
  const { addNewLink } = useContext(GlobalContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setModalAddIsOpen } = props;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await addNewLink({ title, link });
      setIsLoading(false);
      setModalAddIsOpen(false);
    } catch (_err) {
      setIsLoading(false);
      setModalAddIsOpen(true);
    }
  };

  return (
    <div className="z-50 fixed inset-0 bg-zinc-200 bg-opacity-30 w-screen h-screen">
      <form
        className="fixed inset-0 overflow-auto text-white-900 p-2 max-w-[500px] w-full h-72 flex m-auto"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="bg-red-700 z-10 p-2 rounded-full absolute right-3 top-0 hover:bg-red-800 transition-colors"
          onClick={() => setModalAddIsOpen(false)}
        >
          <X size={20} weight="bold" />
        </button>
        <div className="bg-zinc-900 p-5 w-full h-full max-w-md m-auto flex flex-col rounded-lg items-center justify-center">
          <div className="flex flex-col gap-3 text-sm text-zinc-700 w-full">
            <input
              className="bg-zinc-600 rounded px-5 h-9 lg:h-11 w-full placeholder-gray-700"
              type="text"
              placeholder="Título"
              value={title}
              id="editTitle"
              onChange={(event) => setTitle(event.target.value)}
            />

            <input
              className="bg-zinc-600 rounded px-5 h-9 lg:h-11 w-full placeholder-gray-700"
              type="text"
              placeholder="Link"
              value={link}
              id="editLink"
              onChange={(event) => setLink(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 mt-5 text-sm lg:text-base p-2 w-full rounded-sm enabled:hover:bg-green-800 transition-colors disabled:opacity-40 gap-2 flex justify-center"
            disabled={!title || !link || isLoading}
          >
            ADICIONAR
            {isLoading && <Spinner />}
          </button>
        </div>
      </form>
    </div>
  );
}
