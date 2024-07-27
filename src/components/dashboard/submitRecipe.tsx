import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Grid, CssBaseline, Box, Paper, FormControl, InputLabel, FormHelperText } from '@mui/material';
import InputFileUpload from './uploadButton';
import { createRecipe } from '../../utils/recipe_service/recipe';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const schema = z.object({
  recipeName: z
    .string()
    .min(1, 'Name is required')
    .refine(name => /^[a-zA-Z\s]*$/g.test(name), 'Name should not contain numbers'),
  recipeDescription: z.string().min(50, 'Description should contain at least 50 characters'),
  cuisine: z.string().min(1, 'Cuisine is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  cookingTime: z.number().min(1, 'Cooking time is required'),
  difficulty: z.string().min(1, 'Difficulty level is required'),
  dietaryRestrictions: z.string().min(1, 'Dietary restrictions are required'),
  category: z.string().min(1, 'Category is required'),
  imageToken: z.string().optional(),
});

type FormInputs = z.infer<typeof schema>;

interface CreateRecipeProps {
  addItem: boolean;
  setItem: (value: boolean) => void;
}

export default function SubmitRecipe({ addItem, setItem }: CreateRecipeProps) {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const options = React.useMemo(() => countryList().getData(), []);

  React.useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
    }
  }, [selectedImage]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formDataWithImageToken = {
      recipe: data,
      image: selectedImage, // Use imagePreview or adjust as needed
    };
    // Handle form submission with the image
    console.log("formDataWithImageToken ",formDataWithImageToken);
    try {
      await createRecipe(formDataWithImageToken); // Update to handle formData
      toast.success("Your Recipe Has Been Created!");
      handleClose();
    } catch (error) {
      toast.error("Invalid Details");
      console.error("Cannot Create:", error);
    }
  };

  const handleClose = () => {
    reset(); // Reset form fields
    setSelectedImage(null); // Clear image selection
    setImagePreview(null); // Clear image preview
    setItem(false); // Close dialog
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={addItem}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Your Recipe
            </Typography>
            <Button
              type="submit"
              color="inherit"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container component="main">
          <CssBaseline />
          <Grid item xs={12} sm={8} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {imagePreview ? (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
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
          <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square sx={{height:'100vh'}}>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Grid container spacing={3} sx={{ p: 2, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Recipe Name"
                    {...register('recipeName')}
                    error={!!errors.recipeName}
                    helperText={errors.recipeName ? errors.recipeName.message : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth margin="normal" required error={!!errors.difficulty}>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                      {...register('difficulty')}
                      defaultValue=""
                      label="Difficulty"
                      renderValue={(selected) => selected || 'Select a Difficulty'}
                    >
                      <MenuItem value="Easy">Easy</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Hard">Hard</MenuItem>
                    </Select>
                    <FormHelperText>{errors.difficulty ? errors.difficulty.message : ''}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth margin="normal" required error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      {...register('category')}
                      defaultValue=""
                      label="Category"
                      renderValue={(selected) => selected || 'Select a category'}
                    >
                      <MenuItem value="appetizer">Appetizer</MenuItem>
                      <MenuItem value="main">Main Course</MenuItem>
                      <MenuItem value="dessert">Dessert</MenuItem>
                    </Select>
                    <FormHelperText>{errors.category ? errors.category.message : ''}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth margin="normal" required error={!!errors.category}>
                    <InputLabel>Cuisine</InputLabel>
                    <Select
                      {...register('cuisine')}
                      defaultValue=""
                      label="Cuisine"
                      renderValue={(selected) => selected || 'Select a category'}
                    >
                       {options.map((option:any) => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.category ? errors.category.message : ''}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Dietary Restrictions"
                    {...register('dietaryRestrictions')}
                    error={!!errors.dietaryRestrictions}
                    helperText={errors.dietaryRestrictions ? errors.dietaryRestrictions.message : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type='number'
                    label="Cooking Time (mins)"
                    {...register('cookingTime', {
                      valueAsNumber: true,
                    })}
                    error={!!errors.cookingTime}
                    helperText={errors.cookingTime ? errors.cookingTime.message : ''}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Tags (comma separated)"
                    {...register('tags', {
                      setValueAs: (value: any) => {
                        if (typeof value === 'string') {
                          return value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
                        }
                        return [];
                      },
                    })}
                    error={!!errors.tags}
                    helperText={errors.tags ? errors.tags.message : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Ingredients (comma separated)"
                    {...register('ingredients', {
                      setValueAs: (value: any) => {
                        if (typeof value === 'string') {
                          return value.split(',').map(ingredient => ingredient.trim()).filter(ingredient => ingredient !== '');
                        }
                        return [];
                      },
                    })}
                    error={!!errors.ingredients}
                    helperText={errors.ingredients ? errors.ingredients.message : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Recipe Description"
                    {...register('recipeDescription')}
                    error={!!errors.recipeDescription}
                    helperText={errors.recipeDescription ? errors.recipeDescription.message : ''}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
