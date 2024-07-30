import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteRecipe } from "../../utils/recipe_service/recipe";
import { toast } from "react-toastify";
import UpdateRecipe from "./updateRecipe";
import { Rating, useTheme } from "@mui/material";
import RamenDiningIcon from "@mui/icons-material/RamenDining";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

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
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ recipe, fetchData }: RecipeData) {
  const [expanded, setExpanded] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [ratings, setRatings] = React.useState<number | null>(0);
  const theme = useTheme();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
      toast.success("Deleted Recipe Successfully");
      fetchData(); // Call fetchData to refresh the list
    } catch (error) {
      toast.error("Failed to Delete!");
    }
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
      <CardMedia
        component="img"
        height="194"
        image={recipe.imageToken}
        alt="Dish Image"
      />
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
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Recipe Description :</Typography>
          <Typography paragraph>{recipe.recipeDescription}</Typography>
          <Typography paragraph>Category : {recipe.category}</Typography>
          <Typography paragraph>
            Cooking Time : {recipe.cookingTime}{" "}
            {recipe.cookingTime <= 1 ? "min" : "mins"}
          </Typography>
          <Typography paragraph>
            Count of Ratings : {recipe.countOfRatings}
          </Typography>
          <Typography paragraph>
            Dietary Restrictions : {recipe.dietaryRestrictions}
          </Typography>
          <Typography paragraph>Difficulty : {recipe.difficulty}</Typography>
          <Typography paragraph>
            Ingredients : {recipe.ingredients.join(" , ")}
          </Typography>
          <Typography paragraph>Tags : {recipe.tags.join(" , ")}</Typography>
        </CardContent>
      </Collapse>
      <UpdateRecipe
        addItem={dialogOpen}
        setItem={setDialogOpen}
        recipe={recipe}
        fetchData={fetchData}
      />
    </Card>
  );
}
