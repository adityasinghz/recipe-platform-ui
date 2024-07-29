import axios from 'axios';

const url = import.meta.env.RECIPE_BASE_URL || 'http://localhost:8081';
console.log("import.meta.env.RECIPE_BASE_URL ",import.meta.env.VITE_BASE_URL);

export const createRecipe = async (recipeData: { recipe: object; image: any }) => {
    try {
        const formData = new FormData();

        // Append JSON data as a string
        formData.append('recipe', JSON.stringify(recipeData.recipe));

        // Append the file (image) directly
        formData.append('image', recipeData.image);
        
        return await axios.post(`${url}/recipes`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => res);
    } catch (error) {
        console.error('Creation Failed:', error);
        throw error;
    }
};


export const updateRecipe = async (recipeId: any, recipeData: { recipe: object; image: any }) => {
    try {
        const formData = new FormData();

        // Append JSON data as a string
        formData.append('recipe', JSON.stringify(recipeData.recipe));

        // Append the file (image) directly
        formData.append('image', recipeData.image);
        
        return await axios.put(`${url}/recipes/${recipeId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => res);
    } catch (error) {
        console.error('Creation Failed:', error);
        throw error;
    }
};


export const getRecipes = async () => {
    try {
        return await axios.get(`${url}/recipes`).then((res) => res);
    } catch (error) {
        console.error('Fetching Failed:', error);
        throw error;
    }
};

export const deleteRecipe = async (recipeId: any) => {
    try {
        return await axios.delete(`${url}/recipes/${recipeId}`).then((res) => res);
    } catch (error) {
        console.error('Deletion Failed:', error);
        throw error;
    }
};

