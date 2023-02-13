import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { X } from 'phosphor-react';
import { GlobalContext } from '../contexts/GlobalContext';
import ILink from '../interfaces/ILink';

interface IModalEditLinkProps {
  linkSelected: ILink | null;
  setModalEditIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalEditLink(props: IModalEditLinkProps) {
  const { editLink } = useContext(GlobalContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const { setModalEditIsOpen, linkSelected } = props;

  useEffect(() => {
    if (linkSelected) {
      setTitle(linkSelected?.title);
      setLink(linkSelected?.link);
    }
  }, [linkSelected]);

  const isTheSameBefore =
    linkSelected?.link === link && linkSelected?.title === title;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await editLink({ id: Number(linkSelected?.id), title, link });
      setModalEditIsOpen(false);
    } catch (e) {
      setModalEditIsOpen(true);
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
          onClick={() => setModalEditIsOpen(false)}
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
            className="bg-orange-700 mt-5 text-sm lg:text-base p-2 w-full rounded-sm enabled:hover:bg-orange-800 transition-colors disabled:opacity-40"
            disabled={isTheSameBefore || !title || !link}
          >
            SALVAR
          </button>
        </div>
      </form>
    </div>
  );
}
