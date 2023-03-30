import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import ILink from '../interfaces/ILink';
import Spinner from './spinner';

interface IModalRemoveLinkProps {
  linkSelected: ILink | null;
  setModalRemoveIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalRemoveLink(props: IModalRemoveLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { removeLink } = useContext(GlobalContext);

  const { setModalRemoveIsOpen, linkSelected } = props;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await removeLink(Number(linkSelected?.id)).then(() => {
      setIsLoading(false);
      setModalRemoveIsOpen(false);
    });
  };

  return (
    <div className="z-50  fixed inset-0 bg-zinc-200 bg-opacity-30 w-screen h-screen">
      <form
        className="fixed inset-0 overflow-auto text-white-900 p-2 max-w-[500px] w-full h-72 lg:h-56 flex m-auto rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="bg-zinc-900 p-8 w-full h-full max-w-md m-auto flex flex-col rounded-lg items-center justify-center">
          <div className="flex flex-col gap-3 text-sm text-zinc-700 w-full">
            <h1 className="text-white-900 text-base lg:text-lg font-medium text-center">
              VOCÊ TEM CERTEZA QUE DESEJA REMOVER ESTE LINK?
            </h1>
            <div className="text-white-900 flex flex-col lg:flex-row lg:gap-3">
              <button
                type="submit"
                className="bg-red-700 mt-5 text-sm lg:text-base p-2 w-full rounded-sm hover:bg-red-800 transition-colors gap-2 flex justify-center"
                disabled={isLoading}
              >
                SIM, QUERO REMOVER
                {isLoading && <Spinner />}
              </button>
              <button
                type="button"
                className="bg-orange-700 mt-5 text-sm lg:text-base p-2 w-full rounded-sm hover:bg-orange-800 transition-colors"
                onClick={() => setModalRemoveIsOpen(false)}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
