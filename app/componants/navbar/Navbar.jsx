// components/Navbar.js
import Link from 'next/link';
import styles from './navbar.module.css';
import {CiUser,CiShoppingCart} from 'react-icons/ci'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <a href="#" className={styles.logo}>
          <img src="logo.png" alt="Company Logo" width="30" height="30" />
        </a>
      </div>
      <div className={styles.middle}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              Home
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              Review
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              Drops
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              All orders
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              About Us
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <ul className={styles.icons}>
          <li className={styles.iconItem}>
            <Link href="/cart" className={styles.iconLink}>
              <CiShoppingCart className="fas fa-shopping-cart" />
            </Link>
          </li>
          <li className={styles.iconItem}>
            <Link href="/profile" className={styles.iconLink}>
              <CiUser className="fas fa-list-alt" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;