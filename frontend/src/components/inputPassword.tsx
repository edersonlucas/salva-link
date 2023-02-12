import { Eye, EyeSlash, Lock } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface InputPasswordProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  id?: string;
  placeholder?: string;
}

export default function InputPassword(props: InputPasswordProps) {
  const { password, setPassword, id, placeholder } = props;
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  return (
    <label className="relative" htmlFor={id || 'inputPassword'}>
      <Lock
        className="text-zinc-800 absolute left-3 bottom-[.9rem]"
        size={25}
      />
      <button
        onClick={() => setIsVisiblePassword(!isVisiblePassword)}
        type="button"
        className="text-zinc-800 absolute right-3 bottom-[.9rem]"
      >
        {isVisiblePassword ? <Eye size={26} /> : <EyeSlash size={26} />}
      </button>
      <input
        className="bg-zinc-600 rounded px-5 h-14 w-full pl-11 placeholder-gray-700"
        type={isVisiblePassword ? 'text' : 'password'}
        placeholder={placeholder || 'Senha'}
        value={password}
        id={id || 'inputPassword'}
        onChange={(event) => setPassword(event.target.value)}
      />
    </label>
  );
}
