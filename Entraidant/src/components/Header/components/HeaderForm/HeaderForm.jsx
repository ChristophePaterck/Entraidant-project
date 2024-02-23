import styles from "./HeaderForm.module.scss"

function HeaderForm() {
  return (
    <form action="" className={`${styles.formXs} ${styles.form} ml-30`}>
      <input type="text" placeholder="mail" className={`${styles.inputMail} ${styles.headerInput}`} />
      <input type="text" placeholder="password" id="password" className={styles.headerInput}/>
      <button className={`btn-primary ${styles.buttonLogin}`}>connexion</button>
    </form>
  );
}

export default HeaderForm;