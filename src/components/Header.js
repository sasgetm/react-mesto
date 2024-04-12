import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <a href="https://sasgetm.github.io/mesto-react/" className="header__logo">
          <img className="header__logo-image" src={logo} alt="Место" />
        </a>
      </div>
    </header>
  );
}

export default Header;