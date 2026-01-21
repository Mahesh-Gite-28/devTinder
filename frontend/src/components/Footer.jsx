import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content px-10 py-14">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Section */}
        <aside>
          <h2 className="text-2xl font-bold text-primary mb-4">
            DevTinder
          </h2>

          <p className="max-w-md leading-relaxed text-neutral-content/80">
            DevTinder is a platform built for developers to connect, collaborate,
            and build side projects together. Whether you're looking for a
            co-founder, mentor, or teammate — this is your space.
          </p>

          <p className="text-sm text-neutral-content/60 mt-6">
            © 2026 DevTinder. All rights reserved.
          </p>
        </aside>

        {/* Right Section */}
        <nav className="md:text-right">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Connect With Us
          </h3>

          <div className="space-y-3">

            <a
              href="mailto:maheshgite2811@gmail.com"
              className="flex md:justify-end items-center gap-2 link link-hover text-info"
            >
              <FaEnvelope />
              maheshgite2811@gmail.com
            </a>

            <a
              href="https://github.com/Mahesh-Gite-28"
              target="_blank"
              rel="noreferrer"
              className="flex md:justify-end items-center gap-2 link link-hover text-info"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/mahesh-gite"
              target="_blank"
              rel="noreferrer"
              className="flex md:justify-end items-center gap-2 link link-hover text-info"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex md:justify-end gap-5 mt-6 text-2xl">
            <a
              href="https://github.com/Mahesh-Gite-28"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/mahesh-gite"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
