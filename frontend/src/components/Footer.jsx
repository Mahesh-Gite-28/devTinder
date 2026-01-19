import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-10 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-indigo-500 mb-4">
            DevTinder
          </h2>

          <p className="text-gray-400 max-w-md leading-relaxed">
            DevTinder is a platform built for developers to connect, collaborate,
            and build side projects together. Whether you're looking for a
            co-founder, mentor, or teammate — this is your space.
          </p>

          <p className="text-sm text-gray-500 mt-6">
            © 2026 DevTinder.
          </p>
        </div>

        {/* Right Section */}
        <div className="md:text-right">
          <h3 className="text-xl font-semibold text-indigo-500 mb-4">
            Connect With Us
          </h3>

          <div className="space-y-3 text-gray-400">

            <p className="flex md:justify-end items-center gap-2">
              <FaEnvelope />
              <a
                href="mailto:maheshgite2811@gmail.com"
                className="text-blue-400 hover:underline"
              >
                maheshgite2811@gmail.com
              </a>
            </p>

            <p className="flex md:justify-end items-center gap-2">
              <FaGithub />
              <a
                href="https://github.com/Mahesh-Gite-28"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub
              </a>
            </p>

            <p className="flex md:justify-end items-center gap-2">
              <FaLinkedin />
              <a
                href="https://www.linkedin.com/in/mahesh-gite"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex md:justify-end gap-5 mt-6 text-2xl">
            <a
              href="https://github.com/Mahesh-Gite-28"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="hover:text-white transition" />
            </a>

            <a
              href="https://www.linkedin.com/in/mahesh-gite"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="hover:text-blue-500 transition" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
