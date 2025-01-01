import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <h4 style={styles.heading}>About</h4>
          <p style={styles.text}>Welcome to our blog! Here, we share insights, stories, and tips about various topics to inspire and inform.</p>
        </div>
        <div style={styles.column}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li><a href="/about" style={styles.link}>About Us</a></li>
            <li><a href="/contact" style={styles.link}>Contact</a></li>
            <li><a href="/privacy-policy" style={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>
        <div style={styles.column}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <i className="fa-brands fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <i className="fa-brands fa-x-twitter"></i> Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <i className="fa-brands fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <p style={styles.text}>© {currentYear} Your Blog Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  column: {
    flex: '1 1 300px',
    margin: '10px',
  },
  heading: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  socialIcons: {
    display: 'flex',
    gap: '10px',
  },
  icon: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  bottom: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default Footer;
