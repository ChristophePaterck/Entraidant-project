import styles from "./Footer.module.scss";


function Footer() {
  return (
    <footer
      className={`${styles.footer} ${styles.footerXs} d-flex align-items-center space-around justify-content-center p-20 `}
    >
      <p>Mention Légale &#169; Entraidant@Apothéose.project</p>
      {/* <p>Ce site est édité par [Entraidant]</p> */}
    </footer>
  );
}

export default Footer;
