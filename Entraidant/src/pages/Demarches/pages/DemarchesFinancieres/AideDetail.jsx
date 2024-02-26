import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "../../../../data/aides.json";
import styles from "./AideDetail.module.scss";
import { NavLink } from "react-router-dom";

function fetchData(id) {
  try {
    // Find the demarche with the matching ID
    const foundAide = data.find((aide) => aide.id === id);

    if (foundAide) {
      return foundAide;
    } else {
      console.error(`Aide with ID ${id} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function AideDetail() {
  const { id } = useParams();
  const [aide, setDemarche] = useState(null);

  useEffect(() => {
    const idToFind = parseInt(id);

    try {
      // Fetch data when the component mounts or when the ID changes
      const fetchedAide = fetchData(idToFind);

      if (fetchedAide) {
        setDemarche(fetchedAide);
      } else {
        console.error(`Demarche with ID ${idToFind} not found`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  if (!aide) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <div className={`${styles.form} d-flex flex-column card p-20`}>
        <h3 className="mb-20">{aide.titre}</h3>
        <h4>description</h4>
        <p>{aide.description}</p>
        <h4>Pour qui ?</h4>
        <p>{aide.conditions}</p>
        <h4>Condition de revenu</h4>
        <p>{aide.montant}</p>
        <NavLink to="/demarches/aides">
          <div className="mt-30 d-flex justify-content-center align-items-center">
            <button className="btn btn-reverse-primary">
              Retour au aides
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default AideDetail;
