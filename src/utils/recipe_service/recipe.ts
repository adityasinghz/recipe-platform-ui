import axios from 'axios';

const url = import.meta.env.RECIPE_BASE_URL || 'http://localhost:8081';

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

