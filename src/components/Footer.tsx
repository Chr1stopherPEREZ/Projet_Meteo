import React from "react";
import { CloudSun } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <CloudSun className="icon" />
        <p>
          Projet Météo{" "}
          <a
            href="https://github.com/Chr1stopherPEREZ"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            Christopher PEREZ
          </a>{" "}
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

/* Footer.tsx */
