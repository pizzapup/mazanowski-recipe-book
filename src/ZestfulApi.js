import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";

function NewRecipeForm() {
    const [file, setFile] = useState("");
    const [recipeImg, setRecipeImg] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [recipeCategory, setRecipeCategory] = useState("");
    const [ingredients, setIngredients] = useState([
        {
            name: "",
            amount: "",
            unit: "",
            preparation: "",
        },
    ]);
    const subject = [];
    function addSubjects() {
        if (userinput.includes(',') == true) {
            userinput.split(',').forEach(function (item) {
                subject.push(item.trim());
            });
            console.log(subject);
        } else {
            subject.push(userinput);
        }
        return subject
    }
    const [userinput, setUserInput] = useState();
    function handleUserInput(e) {
        setUserInput(e.target.value);
    }
    function submitUserInput(e) {
        e.preventDefault();
        console.log('text', addSubjects())
    }
    const [ingData, setIngData] = useState({})
    const handleIngredientSubmit = (e) => {
        e.preventDefault();
        const testdata = { "ingredients": addSubjects() };
        const options = {
            method: 'POST',
            url: 'https://zestful.p.rapidapi.com/parseIngredients',
            headers: {
                'content-type': 'application/json',
                // 'X-RapidAPI-Key': 'd34fbad9damsh82dd8ff206f6231p1a950djsn8c6b8c7ab9c9',
                'X-RapidAPI-Host': 'zestful.p.rapidapi.com'
            },
            data: testdata
        };
        axios.request(options).then(function (response) {
            console.log(response.data);
            setIngData(response.data)
        }).catch(function (error) {
            console.error(error);
        });
        console.log(ingData)
    }
    const [instructions, setInstructions] = useState([
        {
            text: "",
        },
    ]);
    function handleImageChange(e) {
        setFile(e.target.files[0]);
    }
    function handleUpload() {
        const storageRef = ref(storage, `/recipe-imgs/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setRecipeImg(url);
                });
                !file &&
                    setRecipeImg(
                        "gs://recipe-book-d5784.appspot.com/files/food-img-placeholder.jpg"
                    );
            }
        );
    }
    function handleRecipeNameChange(e) {
        setRecipeName(e.target.value);
    }
    function handleRecipeCatChange(e) {
        setRecipeCategory(e.target.value);
    }
    function handleIngredientChange(e) {
        let idx = parseInt(e.target.id.split("-")[2]);
        let inputType = e.target.id.split("-")[1];
        if (inputType === "name") {
            const newIngredients = ingredients.map((ingredient, index) => {
                if (idx !== index) {
                    return ingredient;
                }
                return { ...ingredient, name: e.target.value };
            });
            setIngredients(newIngredients);
        } else if (inputType === "amt") {
            const newIngredients = ingredients.map((ingredient, index) => {
                if (idx !== index) {
                    return ingredient;
                }
                return { ...ingredient, amount: e.target.value };
            });
            setIngredients(newIngredients);
        } else if (inputType === "preparation") {
            const newIngredients = ingredients.map((ingredient, index) => {
                if (idx !== index) {
                    return ingredient;
                }
                return { ...ingredient, preparation: e.target.value };
            });
            setIngredients(newIngredients);
        }
    }

    function handleIngredientRemove(e) {
        console.log(e.target.id);
        let idx = parseInt(e.target.id.split("-")[2]);
        console.log("Removing ingredient " + idx);
        let newIngredients = ingredients.filter(
            (ingredient, index) => idx !== index
        );
        setIngredients(newIngredients);
    }
    function handleIngredientAdd(e) {
        let newIngredients = ingredients.concat({ name: "", amount: "" });
        setIngredients(newIngredients);
    }
    function handleInstructionChange(e) {
        let idx = parseInt(e.target.id.split("-")[1]);
        const newInstructions = instructions.map((instruction, index) => {
            if (idx !== index) {
                return instruction;
            }
            return { ...instruction, text: e.target.value };
        });
        setInstructions(newInstructions);
    }
    function handleInstructionRemove(e) {
        console.log(e.target.id);
        let idx = parseInt(e.target.id.split("-")[2]);
        console.log("Removing instruction " + idx);
        let newinstructions = instructions.filter(
            (instruction, index) => idx !== index
        );
        setInstructions(newinstructions);
    }
    function handleInstructionAdd(e) {
        let newInstructions = instructions.concat({ text: "" });
        setInstructions(newInstructions);
    }

    const submitRecipe = async (e) => {
        e.preventDefault();
        handleUpload();
        const values = {
            name: recipeName,
            category: recipeCategory,
            ingredients: ingredients,
            instructions: instructions,
            img: recipeImg,
        };
        try {
            const docRef = await addDoc(collection(db, "recipes"), values);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    return (
        <>
            <label>userinput: <input type='text' value={userinput} name='userinput' onChange={handleUserInput} /></label><button type='button' onClick={handleIngredientSubmit}>click to submit userinput</button>
            <form onSubmit={submitRecipe}>
                <label>
                    Recipe Name
                    <input
                        type="text"
                        name="recipe-name"
                        value={recipeName}
                        onChange={handleRecipeNameChange}
                    />
                </label>
                <label>
                    Recipe Category
                    <input
                        type="text"
                        name="recipe-category"
                        value={recipeCategory}
                        onChange={handleRecipeCatChange}
                    />
                </label>
                <fieldset className="fieldset-ingredients">
                    <legend>Ingredients</legend>
                    <ul>   <li className="ing"><div>Ingredient Name</div><div>Amount</div><div>Measurement Unit</div></li>{ingredients.map((ing, idx) => {
                        return (
                            <li key={idx}><div><svg className='ing-icon' viewBox="0 0 512 512" width='25px'><path d="M346.7 6C337.6 17 320 42.3 320 72c0 40 15.3 55.3 40 80s40 40 80 40c29.7 0 55-17.6 66-26.7c4-3.3 6-8.2 6-13.3s-2-10-6-13.2c-11.4-9.1-38.3-26.8-74-26.8c-32 0-40 8-40 8s8-8 8-40c0-35.7-17.7-62.6-26.8-74C370 2 365.1 0 360 0s-10 2-13.3 6zM244.6 136c-40 0-77.1 18.1-101.7 48.2l60.5 60.5c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-55.3-55.3 0 .1L2.2 477.9C-2 487-.1 497.8 7 505s17.9 9 27.1 4.8l134.7-62.4-52.1-52.1c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L199.7 433l100.2-46.4c46.4-21.5 76.2-68 76.2-119.2C376 194.8 317.2 136 244.6 136z" /></svg></div>
                                <label className="ing-name">
                                    <span className="sr-only">Ingredient Name</span>
                                    <input
                                        type="text"
                                        id={"ing-name-" + idx}
                                        name={"ing-name-" + idx}
                                        value={ing.name}
                                        onChange={handleIngredientChange}
                                    />
                                </label>
                                <label className="ing-amt">
                                    <span className="sr-only">Ingredient Amount</span>
                                    <input
                                        type="text"
                                        id={"ing-amt-" + idx}
                                        name={"ing-amt-" + idx}
                                        value={ing.amount}
                                        onChange={handleIngredientChange}
                                    />
                                </label>
                                <label className="ing-unit">
                                    <span className="sr-only">Measurement Unit</span>
                                    <input
                                        type="text"
                                        id={"ing-unit-" + idx}
                                        name={"ing-unit-" + idx}
                                        value={ing.unit}
                                        onChange={handleIngredientChange}
                                    />
                                </label>       <label className="ing-prep">
                                    <span className="sr-only">Preparation</span>
                                    <input
                                        type="text"
                                        id={"ing-prep-" + idx}
                                        name={"ing-prep-" + idx}
                                        value={ing.prep}
                                        onChange={handleIngredientChange}
                                    />
                                </label>
                                <button
                                    id={"ing-remove-" + idx}
                                    type="button"
                                    onClick={handleIngredientRemove}
                                >
                                    remove
                                </button>
                            </li>
                        );
                    })}</ul>
                    <button
                        type="button"
                        onClick={handleIngredientAdd}
                    >
                        add another ingredient
                    </button>
                </fieldset>

                <fieldset>
                    <legend>Instructions</legend>
                    {instructions.map((instr, idx) => {
                        return (
                            <div key={idx}>
                                <label>
                                    Instruction
                                    <input
                                        type="text"
                                        id={"instr-" + idx}
                                        name={"instr-" + idx}
                                        value={instr.text}
                                        onChange={handleInstructionChange}
                                    />
                                </label>
                                <button
                                    id={"instr-remove-" + idx}
                                    type="button"
                                    onClick={handleInstructionRemove}
                                >
                                    remove
                                </button>
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        onClick={handleInstructionAdd}
                    >
                        add another instruction
                    </button>
                </fieldset>
                <label>
                    Upload image (optional)
                    <input
                        type="file"
                        accept="/image/*"
                        onChange={handleImageChange}
                    />
                </label>
                <button type="submit">Submit Recipe</button>
            </form>
            <div>
                <div></div>
            </div>
        </>
    );
}

export default NewRecipeForm;
