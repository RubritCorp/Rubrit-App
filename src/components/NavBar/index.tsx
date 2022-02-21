import Link from "next/link";
// styles
import style from "../../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={style.navContainer}>
      <span><Link href="/">Home</Link></span>
      <ul>
        <li><Link href="/findservices">Find services</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
