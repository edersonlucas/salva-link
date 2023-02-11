import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface IModalLogoutProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalLogout(props: IModalLogoutProps) {
  const { logout } = useContext(AuthContext);

  const { setModalIsOpen } = props;
  return (
    <div className="fixed inset-0 bg-zinc-200 bg-opacity-30 w-screen h-screen">
      <div className="fixed inset-0 z-50 overflow-auto bg-zinc-900 text-white-900 max-w-[400px] h-60 lg:h-40 flex m-auto rounded-md">
        <div className="relative p-8 w-full max-w-md m-auto flex flex-col rounded-lg items-center">
          <h3 className="text-lg lg:text-xl mb-4">DESEJA MESMO SAIR?</h3>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 w-full text-base lg:text-lg">
            <button
              onClick={logout}
              className="bg-red-700 w-full rounded-md hover:bg-red-800 transition-colors text-sm lg:text-base p-2"
            >
              SIM
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-orange-700 w-full rounded-md hover:bg-orange-800 transition-colors text-sm lg:text-base p-2"
            >
              NÃO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
