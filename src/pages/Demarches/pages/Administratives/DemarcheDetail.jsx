import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "../../../../data/demarchesdata.json";
import styles from "./DemarcheDetail.module.scss";
import { NavLink } from "react-router-dom";

function fetchData(id) {
  try {
    // Find the demarche with the matching ID
    const foundDemarche = data.find((demarche) => demarche.id === id);

    if (foundDemarche) {
      return foundDemarche;
    } else {
      console.error(`Demarche with ID ${id} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function DemarcheDetail() {
  const { id } = useParams();
  const [demarche, setDemarche] = useState(null);

  useEffect(() => {
    const idToFind = parseInt(id);

    try {
      // Fetch data when the component mounts or when the ID changes
      const fetchedDemarche = fetchData(idToFind);

      if (fetchedDemarche) {
        setDemarche(fetchedDemarche);
      } else {
        console.error(`Demarche with ID ${idToFind} not found`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  if (!demarche) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <div className={`${styles.form} d-flex flex-column p-20`}>
        <h3>{demarche.titre}</h3>
        <p>{demarche.details}</p>
        <NavLink aria-label='démarches_administrative' to="/demarches/administratives">
          <div className="mt-30 d-flex justify-content-center align-items-center">
            <button className="btn btn-reverse-primary">
              Retour au démarches
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default DemarcheDetail;
