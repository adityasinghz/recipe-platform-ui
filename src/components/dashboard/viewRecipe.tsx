import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Grid, Typography, Paper, useTheme } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ViewRecipeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
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
    ingredients: string[];
    tags: string[];
  };
}

export default function ViewRecipe({ open, setOpen, recipe }: ViewRecipeProps) {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const theme = useTheme();

  React.useEffect(() => {
    if (recipe.imageToken) {
      fetchImageAsFile(recipe.imageToken);
    }
  }, [recipe.imageToken]);

  const fetchImageAsFile = async (imageToken: string) => {
    try {
      const response = await fetch(imageToken);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"View Recipe"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Grid container direction="column" alignItems="center">
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //border: `2px  ${theme.palette.primary.main} solid`,
              }}
              component={Paper}
            >
              {imagePreview ? (
                <ImageListItem
                  sx={{
                    width: "100%",
                    padding: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Recipe Preview"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      border: `2px  ${theme.palette.primary.main} solid`,
                    }}
                  />
                </ImageListItem>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No image available
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              component={Paper}
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: 600,
                mt: 3,
                //border: `2px  ${theme.palette.primary.main} solid`,
              }}
            >
              <Grid container spacing={1} padding={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Name:
                    </span>{" "}
                    {recipe.recipeName}
                  </Typography>
                  <Typography variant="body1">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Cuisine:
                    </span>{" "}
                    {recipe.cuisine}
                  </Typography>
                  <Typography variant="body1">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Category:
                    </span>{" "}
                    {recipe.category}
                  </Typography>
                  <Typography variant="body1">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Cooking Time:
                    </span>{" "}
                    {recipe.cookingTime} minutes
                  </Typography>
                  <Typography variant="body1">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Difficulty:
                    </span>{" "}
                    {recipe.difficulty}
                  </Typography>
                  <Typography variant="body1">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Dietary Restrictions:
                    </span>{" "}
                    {recipe.dietaryRestrictions}
                  </Typography>
                  <Typography variant="body1">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Ingredients:
                    </span>{" "}
                    {recipe.ingredients.join(", ")}
                  </Typography>
                  <Typography variant="body1">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Tags:
                    </span>{" "}
                    {recipe.tags.join(", ")}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Description:
                    </span>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        maxWidth: "100%",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {recipe.recipeDescription}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
