const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="flex gap-3">
        <a href="https://github.com/tongmaximewu" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="/assets/github.svg" alt="GitHub" className="w-1/2 h-1/2" />
        </a>
        <a href="https://www.linkedin.com/in/tong-maxime-wu-59392228a/" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="/assets/linkedin.svg" alt="LinkedIn" className="w-1/2 h-1/2" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
