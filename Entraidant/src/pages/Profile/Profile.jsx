import styles from "./Profile.module.scss";

function Profile() {
  return (
    <div className="flex-fill d-flex justify-content-center align-items-center">
      <div className={`${styles.profileContainer} card p-20`}>
        <ul>
          <li>Username : </li>
          <li>Firstname</li>
          <li>Lasttname</li>
          <li>Email : </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
