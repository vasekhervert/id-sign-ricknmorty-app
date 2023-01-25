const Footer = () => {
  return (
    <footer className="text-center p-4 bg-dark text-light">
      R&M App @ {new Date(Date.now()).getFullYear()}
    </footer>
  );
};

export default Footer;
