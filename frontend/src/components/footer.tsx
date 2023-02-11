import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-700 w-full text-center p-2">
      <p className="text-base text-white-900">
        Desenvolvido com ❤️ por:{" "}
        <Link
          href="https://www.linkedin.com/in/edersonlucas/"
          className="font-semibold"
        >
          Ederson Lucas
        </Link>
      </p>
    </footer>
  );
}
