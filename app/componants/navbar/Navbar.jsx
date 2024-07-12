// components/Navbar.js
import Link from 'next/link';
import styles from './navbar.module.css';
import {CiUser,CiShoppingCart} from 'react-icons/ci'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <a href="#" className={styles.logo}>
          {/* <img src="logo.png" alt="Company Logo" width="30" height="30" /> */}
          Louvy
        </a>
      </div>
      <div className={styles.middle}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/review" className={styles.navLink}>
              Review
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/collection" className={styles.navLink}>
              Collection
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/order_summary" className={styles.navLink}>
              All orders
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/aboutus" className={styles.navLink}>
              About Us
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <ul className={styles.icons}>
          <li className={styles.iconItem}>
            <Link href="/cart" className={styles.iconLink}>
              <CiShoppingCart className="fas fa-shopping-cart" size={30}/>
            </Link>
            <span className={styles.cartItemNum}>1</span>
          </li>
          <li className={styles.iconItem}>
            <Link href="/profile" className={styles.iconLink}>
              <CiUser className="fas fa-list-alt" size={30}/>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;