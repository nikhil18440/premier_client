import React from 'react'
import Navbar from '../componants/navbar/Navbar'
import Footer from '../componants/footer/Footer'
import Image from 'next/image'
import tshirt from '../../public/tshirt.jpg'
import styles from './aboutus.module.css'

export default function page() {
  return (
    <>
    <Navbar/>
      <Image src={tshirt} height={200} className={styles.aboutusImg}/>
      <div className={styles.aboutus}>
      <div className={styles.aboutusDiv}>
      <h3>Welcome to Louvy!</h3>
      <p>At Louvy, we believe that fashion is more than just clothing—it's a way of expressing yourself and embracing your individuality. Our mission is to empower women through stylish, high-quality apparel that makes you feel confident, beautiful, and ready to take on the world.</p>

      <h4>Our Story</h4>
      <p>Louvy was founded with a passion for fashion and a vision to create a brand that celebrates the unique style and spirit of every woman. Our journey began with a simple idea: to offer a curated collection of women's clothing that combines elegance, comfort, and affordability. Today, we are proud to be a go-to destination for fashion-forward women who appreciate timeless classics and contemporary trends alike.</p>

      <h4>Our Collections</h4>
      <p>Our collections are thoughtfully designed and meticulously crafted to suit a variety of tastes and occasions. Whether you're looking for chic office wear, casual weekend outfits, or glamorous evening dresses, Louvy has something for every moment in your life. We take pride in using high-quality fabrics and paying attention to every detail to ensure that our pieces are not only stylish but also durable and comfortable.</p>

      <h4>Our Commitment</h4>
      <p>At Louvy, we are committed to providing an exceptional shopping experience. From the moment you visit our website to the time you receive your order, we strive to exceed your expectations. Our customer service team is always here to assist you, and we offer easy returns and exchanges to make your shopping experience as seamless as possible.</p>

      <h4>Sustainability and Ethics</h4>
      <p>We believe in responsible fashion. Louvy is dedicated to sustainable and ethical practices, ensuring that our products are made with care for both people and the planet. We work closely with our suppliers to promote fair labor practices and environmentally friendly production methods.</p>

      <h4>Join the Louvy Community</h4>
      <p>Fashion is more fun when shared! Join our community of fashion enthusiasts and stay updated on the latest trends, new arrivals, and exclusive offers. Follow us on social media and sign up for our newsletter to be a part of the Louvy family.</p>

      <h4>Thank You</h4>
      <p>Thank you for choosing Louvy. We are excited to be a part of your fashion journey and look forward to helping you express your unique style with confidence and grace.</p>
      </div>
      </div>
    <Footer/>
    </>
  )
}
