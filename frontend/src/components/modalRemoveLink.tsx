import { Dispatch, FormEvent, SetStateAction, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import ILink from '../interfaces/ILink';

interface IModalRemoveLinkProps {
  linkSelected: ILink | null;
  setModalRemoveIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalRemoveLink(props: IModalRemoveLinkProps) {
  const { removeLink } = useContext(GlobalContext);

  const { setModalRemoveIsOpen, linkSelected } = props;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await removeLink(Number(linkSelected?.id)).then(() =>
      setModalRemoveIsOpen(false),
    );
  };

  return (
    <div className="fixed inset-0 bg-zinc-200 bg-opacity-30 w-screen h-screen">
      <form
        className="fixed inset-0 z-50 overflow-auto text-white-900 p-2 max-w-[500px] w-full h-72 lg:h-56 flex m-auto rounded-md"
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
                className="bg-red-700 mt-5 text-sm lg:text-base p-2 w-full rounded-sm hover:bg-red-800 transition-colors"
              >
                SIM, QUERO REMOVER
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
