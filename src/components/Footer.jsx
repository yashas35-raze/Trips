import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
// Removed CSS import: import '../styles.css'; 

// --- Styles Object ---
// All CSS rules are converted to inline styles here.
// WARNING: Media queries are not supported.
const styles = {
  siteFooter: {
    backgroundColor: '#222',
    color: '#aaa',
    padding: '3rem 2rem 0',
    fontSize: '0.9rem',
    marginTop: '4rem',
  },
  footerContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
    display: 'grid',
    // --- RESPONSIVENESS LOST ---
    // This is locked to the 3-column desktop layout.
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '2rem',
    // The mobile 'grid-template-columns: 1fr' is not possible.
  },
  footerSection: {
    // This style is applied by default to the divs
  },
  footerSectionHeading: { // for h4
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#f4f4f4', // --light-text
    marginBottom: '1rem',
  },
  footerLogo: { // for h3
    fontSize: '1.8rem',
    fontWeight: 900,
    letterSpacing: '-1px',
    color: '#f4f4f4', // --light-text
    marginBottom: '1rem',
  },
  footerAboutP: {
    color: '#aaa',
    lineHeight: 1.7,
    margin: 0, // Reset paragraph margin
  },
  footerLinksUl: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLinksLi: {
    marginBottom: '0.75rem',
  },
  footerLink: {
    color: '#aaa',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  footerLinkHover: {
    color: '#E63946', // --primary-color
  },
  socialIcons: {
    display: 'flex',
    gap: '1.5rem',
  },
  socialIcon: {
    color: '#aaa',
    fontSize: '1.5rem',
    transition: 'color 0.3s ease',
  },
  socialIconHover: {
    color: '#E63946', // --primary-color
  },
  footerBottom: {
    textAlign: 'center',
    padding: '1.5rem 0',
    marginTop: '2rem',
    borderTop: '1px solid #444',
    fontSize: '0.85rem',
    color: '#888',
  },
  footerBottomP: {
    margin: 0, // Reset paragraph margin
  }
};

// --- Data ---
const footerLinksData = [
  { name: 'Blog', href: '#' },
  { name: 'About TRIPREVIEW', href: '#' },
  { name: 'Contact Us', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

const socialIconsData = [
  { href: '#', label: 'Facebook', icon: <FaFacebook /> },
  { href: '#', label: 'Twitter', icon: <FaTwitter /> },
  { href: '#', label: 'Instagram', icon: <FaInstagram /> },
  { href: '#', label: 'LinkedIn', icon: <FaLinkedin /> },
];

// --- Helper Component for Link Hover ---
function FooterLink({ href, name }) {
  const [isHovered, setIsHovered] = useState(false);
  const style = {
    ...styles.footerLink,
    ...(isHovered ? styles.footerLinkHover : null),
  };
  return (
    <li style={styles.footerLinksLi}>
      <Link 
        to={href} 
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </Link>
    </li>
  );
}

// --- Helper Component for Icon Hover ---
function SocialIcon({ href, label, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  const style = {
    ...styles.socialIcon,
    ...(isHovered ? styles.socialIconHover : null),
  };
  return (
    <a 
      href={href} 
      aria-label={label} 
      target="_blank" 
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </a>
  );
}

// --- Main Footer Component ---
export default function Footer() {
  return (
    <footer style={styles.siteFooter}>
      <div style={styles.footerContainer}>
        
        {/* Section 1: Branding/About */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerLogo}>tripVIEW</h3>
          <p style={styles.footerAboutP}>
            World's 1st visual platform for Summer vacations. 
            Get inspired, explore places, and plan your next trip with us.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div style={styles.footerSection}>
          <h4 style={styles.footerSectionHeading}>Quick Links</h4>
          <ul style={styles.footerLinksUl}>
            {footerLinksData.map((link) => (
              <FooterLink key={link.name} href={link.href} name={link.name} />
            ))}
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div style={styles.footerSection}>
          <h4 style={styles.footerSectionHeading}>Follow Us</h4>
          <div style={styles.socialIcons}>
            {socialIconsData.map((icon) => (
              <SocialIcon key={icon.label} href={icon.href} label={icon.label} icon={icon.icon} />
            ))}
          </div>
        </div>

      </div>
      
      {/* Bottom Bar: Copyright */}
      <div style={styles.footerBottom}>
        <p style={styles.footerBottomP}>
          &copy; {new Date().getFullYear()} tripVIEW. All rights reserved.
        </p>
      </div>
    </footer>
  );
}