import { Dispatch, FormEvent, SetStateAction, useContext } from "react";
import { GlobalContext } from "@/contexts/GlobalContext";
import ILink from "../interfaces/ILink";
import api from "../services/api";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";

interface IModalRemoveLinkProps {
  linkSelected: ILink | null;
  setModalRemoveIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalRemoveLink(props: IModalRemoveLinkProps) {
  const { links, setLinks } = useContext(GlobalContext);

  const { setModalRemoveIsOpen, linkSelected } = props;

  const handleSubmit = (event: FormEvent) => {
    const { "salvalink.token": token } = parseCookies();
    event.preventDefault();
    api
      .delete(`/link/${linkSelected?.id}`, {
        headers: { Authorization: token },
      })
      .then((_response) => {
        const updatedLinks = links.filter(
          (item) => item.id !== linkSelected?.id
        );
        setLinks(updatedLinks);
        toast.success("Link removido com sucesso!");
        setModalRemoveIsOpen(false);
      })
      .catch((_err) => {
        toast.error("Ocorreu algum erro!");
      });
  };

  return (
    <div className="fixed inset-0 bg-zinc-200 bg-opacity-30 w-screen h-screen">
      <form
        className="fixed inset-0 z-50 overflow-auto text-white-900 p-2 max-w-[500px] w-full h-72 lg:h-56 flex m-auto rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="bg-zinc-900 p-8 w-full h-full max-w-md m-auto flex flex-col rounded-lg items-center justify-center">
          <div className="flex flex-col gap-3 text-sm text-zinc-700 w-full">
            <h1 className="text-white-900 text-lg font-medium text-center">
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
