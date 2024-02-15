import { useState } from 'react';

function ServiceForm({ onSubmit, initialValues }) {
  // Déclaration des états pour la catégorie et la description du service
  const [category, setCategory] = useState(initialValues?.category || '');
  const [description, setDescription] = useState(initialValues?.description || '');

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    // Appelle la fonction de soumission fournie avec les valeurs actuelles de la catégorie et de la description
    if (typeof onSubmit === 'function') {
      // Appelle onSubmit avec les valeurs actuelles de la catégorie et de la description
      onSubmit({ category, description });
    } else {
      console.error('onSubmit n\'est pas une fonction');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ pour la catégorie */}
      <label>
        Catégorie:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Met à jour la catégorie lorsque la valeur du champ change
          required // Champ obligatoire
        />
      </label>
      {/* Champ pour la description */}
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Met à jour la description lorsque la valeur du champ change
          required // Champ obligatoire
        />
      </label>
      {/* Bouton de soumission du formulaire */}
      <button type="submit">Enregistrer</button>
    </form>
  );
}

export default ServiceForm;



