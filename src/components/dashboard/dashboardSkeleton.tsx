import { styled } from "@mui/material/styles";
import { Grid, Skeleton, Box } from "@mui/material";

const SkeletonDrawer = styled(Skeleton)({
  height: "100vh", // Ensure the drawer covers full height
  width: "123%",
});

const SkeletonAppBar = styled(Skeleton)({
  height: 64, // Typical height for app bar
  width: "100wh",
});

export default function DashboardSkeleton() {
  return (
    <Box sx={{ display: "flex" }}>
      <Grid container spacing={6}>
        <Grid item xs={2} sx={{ height: "100vh", p: 0 }}>
          <SkeletonDrawer variant="rectangular" height="100%" />
        </Grid>
        <Grid item xs={10} sx={{ p: 0 }}>
          <SkeletonAppBar variant="rectangular" width="100vw" />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={6}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Grid item xs={12} md={2} lg={2} key={index}>
                    <Skeleton
                      variant="circular"
                      width={200}
                      height={200}
                      key={index}
                    />
                  </Grid>
                ))}
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <Grid item xs={12} md={3} lg={3} key={index}>
                    <Skeleton
                      variant="rectangular"
                      width={250}
                      height={300}
                      key={index}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
