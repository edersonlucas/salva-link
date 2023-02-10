import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface IModalLogoutProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalLogout(props: IModalLogoutProps) {
  const { logout } = useContext(AuthContext);

  const { setModalIsOpen } = props;
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-zinc-700 text-white-900 w-60 lg:w-72 h-60 lg:h-40 flex m-auto rounded-md">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex flex-col rounded-lg items-center">
        <h3 className="text-lg lg:text-xl mb-4">Deseja mesmo sair?</h3>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 w-full text-base lg:text-lg">
          <button onClick={logout} className="bg-red-700 w-full rounded-md">
            Sim
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-orange-700 w-full rounded-md"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
