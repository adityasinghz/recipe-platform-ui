import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Make sure the path is correct
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Grid, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomAppBar from "../common/AppBar";
import RecipeReviewCard from "./recipeCard";
import Cuisines from "./countryCuisines";
import SubmitRecipe from "./submitRecipe";
import DashboardSkeleton from "./dashboardSkeleton";
import { getRecipes } from "../../utils/recipe_service/recipe";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashBoard() {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [data, setData] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    //localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
    toast.error("Logged Out Successfully!");
  };
  const handleSubmitRecipe = async () => {
    setSubmit(true);
    setDialogOpen(true);
  };
  const handleViewRecipe = () => {
    setSubmit(false);
    {
      /*VIEW API*/
    }
  };
  const handleFavoriteRecipe = () => {
    setSubmit(false);
    {
      /*FAV API*/
    }
  };
  const fetchData = async () => {
    try {
      const response = await getRecipes();
      setData(response["data"]); // Assuming `response` is the data you need
    } catch (error) {
      toast.error("Failed to fetch Recipes!");
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  console.log("data length : ", data.length);
  return !loading ? (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar
          open={open}
          isSubmit={isSubmit}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            <ListItem key={"submit"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleSubmitRecipe}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Add Your Recipe"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={"favorite"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleFavoriteRecipe}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <StarRateIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Favorite Recipe"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={"view"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleViewRecipe}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"View My Recipe"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={"logout"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Log Out"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {/* IS Submit? New UI : SameUI*/}
          <Grid container spacing={6}>
            <Grid item xs={12} md={12} sm={12} lg={12} sx={{ display: "flex" }}>
              <Cuisines />
            </Grid>
            {data.map((recipe: any, index: number) => (
              <Grid item xs={12} md={3} sm={3} lg={3} key={index}>
                <RecipeReviewCard recipe={recipe} fetchData={fetchData} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <SubmitRecipe
          addItem={dialogOpen}
          setItem={setDialogOpen}
          fetchData={fetchData}
        />
      </Box>
    </>
  ) : (
    <DashboardSkeleton />
  );
}
