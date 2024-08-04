import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';
import { createRecipe, updateRecipe, getRecipes, deleteRecipe } from '../../utils/recipe_service/recipe';
//import { createRecipe, updateRecipe, getRecipes, deleteRecipe } from './api'; // Adjust the import path


vi.mock('axios');

const mockedAxios = axios as vi.Mocked<typeof axios>;

describe('API Functions', () => {
  
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should call createRecipe with correct parameters and return response', async () => {
    const recipeData = {
      recipe: { name: 'Recipe Name', ingredients: [] },
      image: new Blob(),
    };
    const response = { data: 'Success' };
    
    mockedAxios.post.mockResolvedValue(response);
    
    const result = await createRecipe(recipeData);
    
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${import.meta.env.RECIPE_BASE_URL || 'http://localhost:8081'}/recipes`,
      expect.any(FormData),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    expect(result).toEqual(response);
  });

  it('should call updateRecipe with correct parameters and return response', async () => {
    const recipeId = '123';
    const recipeData = {
      recipe: { name: 'Updated Recipe', ingredients: [] },
      image: new Blob(),
    };
    const response = { data: 'Success' };

    mockedAxios.put.mockResolvedValue(response);
    
    const result = await updateRecipe(recipeId, recipeData);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${import.meta.env.RECIPE_BASE_URL || 'http://localhost:8081'}/recipes/${recipeId}`,
      expect.any(FormData),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    expect(result).toEqual(response);
  });

  it('should call getRecipes and return response', async () => {
    const response = { data: ['Recipe1', 'Recipe2'] };

    mockedAxios.get.mockResolvedValue(response);

    const result = await getRecipes();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${import.meta.env.RECIPE_BASE_URL || 'http://localhost:8081'}/recipes`
    );
    expect(result).toEqual(response);
  });

  it('should call deleteRecipe with correct parameters and return response', async () => {
    const recipeId = '123';
    const response = { data: 'Deleted Successfully' };

    mockedAxios.delete.mockResolvedValue(response);

    const result = await deleteRecipe(recipeId);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `${import.meta.env.RECIPE_BASE_URL || 'http://localhost:8081'}/recipes/${recipeId}`
    );
    expect(result).toEqual(response);
  });

  it('should handle errors for createRecipe', async () => {
    const recipeData = {
      recipe: { name: 'Recipe Name', ingredients: [] },
      image: new Blob(),
    };
    const error = new Error('Creation Failed');
    
    mockedAxios.post.mockRejectedValue(error);
    
    await expect(createRecipe(recipeData)).rejects.toThrow('Creation Failed');
  });

  it('should handle errors for updateRecipe', async () => {
    const recipeId = '123';
    const recipeData = {
      recipe: { name: 'Updated Recipe', ingredients: [] },
      image: new Blob(),
    };
    const error = new Error('Update Failed');
    
    mockedAxios.put.mockRejectedValue(error);
    
    await expect(updateRecipe(recipeId, recipeData)).rejects.toThrow('Update Failed');
  });

  it('should handle errors for getRecipes', async () => {
    const error = new Error('Fetching Failed');
    
    mockedAxios.get.mockRejectedValue(error);
    
    await expect(getRecipes()).rejects.toThrow('Fetching Failed');
  });

  it('should handle errors for deleteRecipe', async () => {
    const recipeId = '123';
    const error = new Error('Deletion Failed');
    
    mockedAxios.delete.mockRejectedValue(error);
    
    await expect(deleteRecipe(recipeId)).rejects.toThrow('Deletion Failed');
  });
});
