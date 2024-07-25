import * as React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const images = [
  {
    url: '/images/indian.jpg',
    title: 'Indian',
  },
  {
    url: '/images/american.jpg',
    title: 'American',
  },
  {
    url: '/images/chinese.jpg',
    title: 'Chinese',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: 200, // Adjust as needed
  height: 200, // Ensure height equals width for a perfect circle
  borderRadius: '50%', // Make the button circular
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: 100, // Adjust for smaller screens
    height: 100, // Ensure height matches width
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '50%', // Ensure the image respects the circular border-radius
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  borderRadius: '50%', // Ensure the overlay respects the circular border-radius
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
  borderRadius: '50%', // Ensure the backdrop respects the circular border-radius
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function Cuisines() {
  return (
    <>
      {images.map((image) => (
        <Grid item xs={12} md={2} lg={2} key={image.title} sx={{ p: 0 }}>
          <ImageButton focusRipple>
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 2,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </Grid>
      ))}
    </>
  );
}
