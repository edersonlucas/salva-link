import { useState } from 'react';
import ModalLinks from './modalLinks';

interface IBlogCardProps {
  data: {
    name: string;
  };
}

export default function BlogCard(props: IBlogCardProps) {
  const { data } = props;
  const [modalLinksIsOpen, setModalLinksIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center bg-white-900 min-w-xs h-[220px] p-4 lg:p-8 grow m-3">
      <h1 className="p-8 text-3xl text-blue-700 font-bold">
        Blog: {data.name}
      </h1>
      <button
        type="button"
        className="bg-blue-700 mt-5 text-white-900 text-sm lg:text-base p-2 w-full rounded-sm hover:bg-blue-800 transition-colors"
        onClick={() => setModalLinksIsOpen(true)}
      >
        VER SUGESTÃO
      </button>
      {modalLinksIsOpen && (
        <ModalLinks data={data} setModalLinksIsOpen={setModalLinksIsOpen} />
      )}
    </div>
  );
}
