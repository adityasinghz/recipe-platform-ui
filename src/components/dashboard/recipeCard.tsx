import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteRecipe } from "../../utils/recipe_service/recipe";
import { toast } from "react-toastify";
import UpdateRecipe from "./updateRecipe";
import { ButtonBase, Rating, useTheme } from "@mui/material";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import ViewRecipe from "./viewRecipe";

interface RecipeData {
  recipe: {
    recipeId: string;
    imageToken: string;
    recipeName: string;
    cuisine: string;
    recipeDescription: string;
    category: string;
    cookingTime: number;
    countOfRatings: number;
    dietaryRestrictions: string;
    difficulty: string;
    ingredients: any;
    ratings: number;
    reviews: any;
    tags: any;
  };
  fetchData: () => void; // Add fetchData as a prop
}
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

export default function RecipeReviewCard({ recipe, fetchData }: RecipeData) {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [ratings, setRatings] = React.useState<number | null>(0);
  const theme = useTheme();

  const handleDelete = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
      toast.success("Deleted Recipe Successfully");
      fetchData(); // Call fetchData to refresh the list
    } catch (error) {
      toast.error("Failed to Delete!");
    }
  };

  const handleViewRecipe = () => {
    setOpen(true);
  };

  const updateRecipe = async () => {
    setDialogOpen(true);
  };
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: theme.palette.primary.main }}
            aria-label="recipe"
          >
            <RamenDiningIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={"User"}
        subheader={"Chef"}
      />
      <ImageButton
        focusRipple
        key={recipe.recipeId}
        style={{
          width: "100%",
        }}
        onClick={handleViewRecipe}
      >
        <ImageSrc style={{ backgroundImage: `url(${recipe.imageToken})` }} />
      </ImageButton>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {recipe.recipeName}{" "}
        </Typography>
        <Rating
          name="simple-controlled"
          value={recipe.ratings || ratings}
          onChange={(event, newValue) => {
            console.log("event ", event.target);
            setRatings(newValue);
          }}
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(recipe.recipeId)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={updateRecipe}>
          <EditIcon />
        </IconButton>
      </CardActions>
      <UpdateRecipe
        addItem={dialogOpen}
        setItem={setDialogOpen}
        recipe={recipe}
        fetchData={fetchData}
      />
      <ViewRecipe open={open} setOpen={setOpen} recipe={recipe} />
    </Card>
  );
}
