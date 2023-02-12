import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Check, CheckSquare, Copy, PlusCircle } from 'phosphor-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import goLinkBlue from '../assets/img/go-link-blue.svg';
import characterLimit from '../util/characterLimit';
import ILink from '../interfaces/ILink';
import { GlobalContext } from '../contexts/GlobalContext';

interface IBlogLinkCardProps {
  data: ILink;
}

export default function BlogLinkCard(props: IBlogLinkCardProps) {
  const { data } = props;

  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [linkIsSalved, setLinkIsSalved] = useState(false);

  const { addNewLink, links } = useContext(GlobalContext);

  useEffect(() => {
    setLinkIsSalved(links.some((item) => item.link === data.link));
  }, [links, data.link]);

  const handleCopyKey = () => {
    setLinkIsCopied(!linkIsCopied);
    setTimeout(() => {
      setLinkIsCopied(false);
    }, 1000);
  };

  const handleSaveLink = async () => {
    await addNewLink(data, 'save');
  };

  return (
    <div className="bg-white-900 flex flex-col lg:flex-row items-center justify-between p-2 lg:p-3 rounded-md m-3">
      <CopyToClipboard text={data.link} onCopy={handleCopyKey}>
        <button
          type="button"
          className="bg-blue-700 lg:h-20 w-full lg:w-40 text-sm lg:text-base p-1 lg:p-2 rounded-sm flex items-center justify-center mb-3 lg:mb-0 hover:bg-blue-800 transition-colors"
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
            src={goLinkBlue}
            alt="Icon to GoLink"
            width={30}
          />
          <div className="text-center">
            <p className="text-sm lg:text-base text-blue-700">
              {characterLimit(data.title, 45)}
            </p>
            <p className="text-xs lg:text-sm text-blue-600">
              {characterLimit(data.link, 50)}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex lg:flex-col gap-3 mt-3 lg:mt-0 w-full lg:w-32">
        <button
          type="button"
          className={`${
            linkIsSalved
              ? 'w-full lg:h-20 lg:w-32 flex justify-center items-center text-sm lg:text-base p-1 rounded-sm bg-orange-700'
              : 'w-full lg:h-20 lg:w-32 flex justify-center items-center text-sm lg:text-base p-1 rounded-sm bg-green-700 hover:bg-green-800 transition-colors'
          }`}
          onClick={handleSaveLink}
          disabled={linkIsSalved}
        >
          {linkIsSalved ? (
            <>
              SALVO
              <CheckSquare size={30} />
            </>
          ) : (
            <>
              SALVAR
              <PlusCircle size={30} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
