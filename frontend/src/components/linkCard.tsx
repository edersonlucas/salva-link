import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Check, Copy, PencilSimpleLine, Trash } from 'phosphor-react';
import Link from 'next/link';
import { useState } from 'react';
import ILink from '../interfaces/ILink';
import goLink from '../assets/img/go-link.svg';
import ModalEditLink from './modalEditLink';
import ModalRemoveLink from './modalRemoveLink';
import characterLimit from '../util/characterLimit';

interface ILinkCardProps {
  data: ILink;
}

export default function LinkCard(props: ILinkCardProps) {
  const { data } = props;

  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false);
  const [linkIsCopied, setLinkIsCopied] = useState(false);

  const handleCopyKey = () => {
    setLinkIsCopied(!linkIsCopied);
    setTimeout(() => {
      setLinkIsCopied(false);
    }, 1000);
  };

  return (
    <div className="bg-zinc-900 text-white-900 flex flex-col lg:flex-row items-center justify-between p-3 rounded-md m-3">
      <CopyToClipboard text={data.link} onCopy={handleCopyKey}>
        <button
          type="button"
          className="bg-blue-700 lg:h-20 w-full lg:w-40 text-sm lg:text-base p-1 lg:p-2 rounded-sm flex items-center justify-center mb-3 lg:mb-0 enabled:hover:bg-blue-800 transition-colors disabled:opacity-90"
          disabled={linkIsCopied}
        >
          {linkIsCopied ? (
            <>
              <Check size={26} />
              LINK COPIADO!
            </>
          ) : (
            <>
              <Copy size={26} />
              COPIAR LINK
            </>
          )}
        </button>
      </CopyToClipboard>
      <div className="flex lg:flex-row items-center gap-4">
        <Link target="_blank" href={data.link} className="flex gap-2">
          <Image
            className="hidden lg:block"
            src={goLink}
            alt="Icon to GoLink"
            width={30}
          />
          <div className="text-center">
            <p className="text-sm lg:text-base">
              {characterLimit(data.title, 45)}
            </p>
            <p className="text-xs lg:text-sm text-gray-300">
              {characterLimit(data.link, 50)}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex lg:flex-col gap-3 mt-3 lg:mt-0 w-full lg:w-32">
        <button
          type="button"
          className="bg-orange-700 w-full lg:w-32 flex justify-center items-center text-sm lg:text-base p-1 rounded-sm hover:bg-orange-800 transition-colors"
          onClick={() => setModalEditIsOpen(true)}
        >
          EDITAR
          <PencilSimpleLine size={26} />
        </button>
        <button
          type="button"
          className="bg-red-700 w-full lg:w-32 flex justify-center items-center text-sm lg:text-base p-1 rounded-sm hover:bg-red-800 transition-colors"
          onClick={() => setModalRemoveIsOpen(true)}
        >
          REMOVER
          <Trash size={26} />
        </button>
      </div>
      {modalEditIsOpen && (
        <ModalEditLink
          setModalEditIsOpen={setModalEditIsOpen}
          linkSelected={data}
        />
      )}
      {modalRemoveIsOpen && (
        <ModalRemoveLink
          setModalRemoveIsOpen={setModalRemoveIsOpen}
          linkSelected={data}
        />
      )}
    </div>
  );
}
