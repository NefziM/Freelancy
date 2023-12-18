import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import {  useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Add = () => {
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [imageFile, setImageFile] = useState(null);
  const [imagesFiles, setImagesFiles] = useState([]);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/mygigs");
    try {
      const formData = new FormData();
      formData.append('title', state.title);
      formData.append('cat', state.cat);
      formData.append('desc', state.desc);
      formData.append('price', state.price);
      formData.append('cover', imageFile);

      imagesFiles.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      state.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });

      const response = await axios.post("/api/gigs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Service ajouté avec succès:", response.data);

      // Redirect to /mygigs after successful form submission
      navigate("/mygigs");

      // Reset the form after the creation is successful
      dispatch({ type: "RESET_FORM" });
      setImageFile(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du service:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    setImagesFiles([...files]);
  };

  const handleFeatureChange = (e, index) => {
    const { value } = e.target;
    dispatch({ type: 'CHANGE_FEATURE', payload: { value, index } });
  };

  const addFeature = () => {
    dispatch({ type: 'ADD_FEATURE', payload: '' });
  };

  const removeFeature = (index) => {
    dispatch({ type: 'REMOVE_FEATURE', payload: index });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_INPUT', payload: { name, value } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre:
        <input type="text" name="title" value={state.title} onChange={handleChange} />
      </label>
      <label>
        Catégorie:
        <input type="text" name="cat" value={state.cat} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="desc" value={state.desc} onChange={handleChange} />
      </label>
      <label>
        Prix:
        <input type="number" name="price" value={state.price} onChange={handleChange} />
      </label>
      <label>
        Image de couverture:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <label>
        Images:
        <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
      </label>
      <label>
        Fonctionnalités:
        {state.features.map((feature, index) => (
          <div key={index}>
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(e, index)}
            />
            <button type="button" onClick={() => removeFeature(index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={addFeature}>
          Ajouter une fonctionnalité
        </button>
      </label>
      <button type="submit">Ajouter un service</button>
    </form>
  );
};

export default Add;
