import { FaGithub, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-800 py-4 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm mb-2 md:mb-0">
          &#xa9; ZaharScript {new Date().getFullYear()}
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/zaharscript"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/zaharscript"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black text-xl"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
