import { Link } from 'react-router-dom';
import Icon from './Icon'
import '../styles/Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/welcome" className="brand-link">goalpp</Link>
      </div>

      <nav className="header__center">
        <Link to="/daily">Daily</Link>
        <Link to="/month">Month View</Link>
        <Link to="/overview">Overview</Link>
      </nav>

      <div className="header__right">
      <Link to="/edit"><Icon name="edit" size={28} /></Link>
      <Link to="/login"><Icon name="user" size={28} /></Link>
      </div>
    </header>
  );
}
