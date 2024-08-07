import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Grid,
  CssBaseline,
  Box,
  Paper,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import InputFileUpload from "./uploadButton";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import { updateRecipe } from "../../utils/recipe_service/recipe";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = z.object({
  recipeName: z
    .string()
    .min(1, "Name is required")
    .refine(
      (name) => /^[a-zA-Z\s]*$/g.test(name),
      "Name should not contain numbers"
    ),
  recipeDescription: z
    .string()
    .min(50, "Description should contain at least 50 characters"),
  cuisine: z.string().min(1, "Cuisine is required"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  ingredients: z
    .array(z.string())
    .nonempty("At least one ingredient is required"),
  cookingTime: z.number().min(1, "Cooking time is required"),
  difficulty: z.string().min(1, "Difficulty level is required"),
  dietaryRestrictions: z.string().min(1, "Dietary restrictions are required"),
  category: z.string().min(1, "Category is required"),
  imageToken: z.string().optional(),
});

type FormInputs = z.infer<typeof schema>;

interface UpdateRecipeProps {
  addItem: boolean; // Controls whether the dialog is open or not
  setItem: React.Dispatch<React.SetStateAction<boolean>>; // Function to change the dialog state
  recipe: {
    recipeId: string;
    imageToken: string;
    recipeName: string;
    cuisine: string;
    recipeDescription: string;
    category: string;
    cookingTime: number;
    dietaryRestrictions: string;
    difficulty: string;
    ingredients: string[]; // Changed from any to string[]
    tags: string[]; // Changed from any to string[]
  };
  fetchData: () => void; // Function to refresh the recipe list
}

const ingredients = [
  "Flour",
  "Sugar",
  "Salt",
  "Butter",
  "Eggs",
  "Milk",
  "Water",
  "Baking Powder",
  "Vanilla Extract",
  "Olive Oil",
  "Garlic",
  "Onion",
  "Tomato",
  "Lemon",
  "Pepper",
  "Carrots",
  "Potatoes",
  "Bell Peppers",
  "Cheese",
  "Chicken",
  "Bacon",
  "Pasta",
  "Rice",
  "Yeast",
  "Cinnamon",
  "Honey",
  "Soy Sauce",
  "Mushrooms",
  "Parsley",
  "Thyme",
  "Rosemary",
  "Basil",
  "Cocoa Powder",
  "Cream",
  "Coconut Oil",
  "Almonds",
  "Walnuts",
  "Maple Syrup",
  "Mustard",
  "Vinegar",
  "Chili Powder",
  "Paprika",
  "Nutmeg",
  "Beans",
  "Lettuce",
  "Corn",
  "Broccoli",
  "Spinach",
  "Cucumber",
];

const recipeTags = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Keto",
  "Paleo",
  "Low Carb",
  "Dairy-Free",
  "Healthy",
  "Quick Meals",
  "Comfort Food",
  "Desserts",
  "Baked Goods",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Soup",
  "Salad",
  "Appetizer",
  "Beverage",
  "Cocktail",
  "Smoothie",
  "Italian",
  "Mexican",
  "Asian",
  "American",
  "French",
  "Indian",
  "Middle Eastern",
  "Mediterranean",
  "Chinese",
  "Japanese",
  "Thai",
  "Seafood",
  "Chicken",
  "Spicy",
  "Sweet",
  "Savory",
  "Holiday",
  "BBQ",
  "Vegan-Friendly",
  "Family-Friendly",
  "Single-Serving",
  "Batch-Cooking",
  "Slow Cooker",
  "Pressure Cooker",
  "Stir-Fry",
  "Fermented",
];

export default function UpdateRecipe({
  addItem,
  setItem,
  recipe,
  fetchData,
}: UpdateRecipeProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const options = React.useMemo(() => countryList().getData(), []);

  React.useEffect(() => {
    if (recipe) {
      reset({
        recipeName: recipe.recipeName,
        recipeDescription: recipe.recipeDescription,
        cuisine: recipe.cuisine,
        tags: recipe.tags || [],
        ingredients: recipe.ingredients || [],
        cookingTime: recipe.cookingTime,
        difficulty: recipe.difficulty,
        dietaryRestrictions: recipe.dietaryRestrictions,
        category: recipe.category,
        imageToken: recipe.imageToken || "",
      });
      if (recipe.imageToken) {
        fetchImageAsFile(recipe.imageToken); // Use URL directly if provided
      }
    }
  }, [recipe, reset]);

  React.useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null); // Clear preview if no image is selected
    }
  }, [selectedImage]);

  const fetchImageAsFile = async (imageToken: string) => {
    try {
      const response = await fetch(imageToken); // Use the image token as URL
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formDataWithImageToken = {
      recipe: data,
      image: selectedImage, // Use imagePreview or adjust as needed
    };

    console.log("formDataWithImageToken ", formDataWithImageToken);
    try {
      const response = await updateRecipe(
        recipe.recipeId,
        formDataWithImageToken
      ); // Adjust this based on your API
      if (response.status == 200) {
        toast.success("Your Recipe Has Been Updated!");
        await fetchData();
        handleClose();
      }
    } catch (error) {
      toast.error("Failed to update recipe");
      console.error("Cannot Update:", error);
    }
  };

  const handleImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleClose = () => {
    //reset(); // Reset form fields
    setItem(false); // Close dialog
  };

  //console.log("recipe ",recipe, "isValid ",isValid);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={addItem}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              disabled={!isValid || !selectedImage}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update Your Recipe
            </Typography>
            <Button
              type="submit"
              color="inherit"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || !selectedImage}
            >
              Update
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container component="main">
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            {imagePreview ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : (
              <InputFileUpload
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Paper}
            sx={{ height: "100vh" }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Grid
                container
                spacing={3}
                sx={{
                  p: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Recipe Name"
                    {...register("recipeName")}
                    error={!!errors.recipeName}
                    helperText={
                      errors.recipeName ? errors.recipeName.message : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.difficulty}
                  >
                    <InputLabel>Difficulty</InputLabel>
                    <Controller
                      name="difficulty"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Difficulty"
                          renderValue={(selected) =>
                            selected || "Select a Difficulty"
                          }
                        >
                          <MenuItem value="Easy">Easy</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Hard">Hard</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {errors.difficulty ? errors.difficulty.message : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.category}
                  >
                    <InputLabel>Category</InputLabel>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Category"
                          renderValue={(selected) =>
                            selected || "Select a category"
                          }
                        >
                          <MenuItem value="Appetizer">Appetizer</MenuItem>
                          <MenuItem value="Main Course">Main Course</MenuItem>
                          <MenuItem value="Dessert">Dessert</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {errors.category ? errors.category.message : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.cuisine}
                  >
                    <InputLabel>Cuisine</InputLabel>
                    <Controller
                      name="cuisine"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Cuisine"
                          renderValue={(selected) =>
                            selected || "Select a cuisine"
                          }
                        >
                          {options.map((option, index) => (
                            <MenuItem key={index} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {errors.cuisine ? errors.cuisine.message : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Dietary Restrictions"
                    {...register("dietaryRestrictions")}
                    error={!!errors.dietaryRestrictions}
                    helperText={
                      errors.dietaryRestrictions
                        ? errors.dietaryRestrictions.message
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    label="Cooking Time (mins)"
                    {...register("cookingTime", {
                      valueAsNumber: true,
                    })}
                    error={!!errors.cookingTime}
                    helperText={
                      errors.cookingTime ? errors.cookingTime.message : ""
                    }
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth error={!!errors.tags}>
                    <InputLabel id="tags-label">Tags</InputLabel>
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="tags-label"
                          multiple
                          renderValue={(selected) =>
                            ((selected as string[]) || []).join(", ")
                          }
                        >
                          {recipeTags.map((tag) => (
                            <MenuItem key={tag} value={tag}>
                              {tag}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>{errors.tags?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth error={!!errors.ingredients}>
                    <InputLabel id="ingredients-label">Ingredients</InputLabel>
                    <Controller
                      name="ingredients"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="ingredients-label"
                          multiple
                          renderValue={(selected) =>
                            ((selected as string[]) || []).join(", ")
                          }
                        >
                          {ingredients.map((ingredient) => (
                            <MenuItem key={ingredient} value={ingredient}>
                              {ingredient}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {errors.ingredients?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Recipe Description"
                    {...register("recipeDescription")}
                    error={!!errors.recipeDescription}
                    helperText={
                      errors.recipeDescription
                        ? errors.recipeDescription.message
                        : ""
                    }
                    multiline
                    rows={4}
                  />
                </Grid>
                {selectedImage ? (
                  <Grid item xs={12} sm={6} md={12}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleImage}
                    >
                      Remove Image
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
