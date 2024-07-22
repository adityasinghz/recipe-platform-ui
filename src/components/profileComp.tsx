import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// Sample data array
const profiles = [
  {
    name: 'Srinivas Basha',
    title: 'Team Lead (Full Stack)',
    image: '/images/basha.jpg',
    telescopeLink: 'https://telescope.epam.com/who/Srinivas_Basha?tab=cv',
    linkedInLink: 'https://www.linkedin.com/in/jane-smith'
  },
  {
    name: 'Anish Roshan',
    title: 'Backend Developer (Java)',
    image: '/images/anish.jpg',
    telescopeLink: 'https://telescope.epam.com/who/Anish_Roshan?tab=cv',
    linkedInLink: 'https://www.linkedin.com/in/anish-roshan-b5253a1a5/'
  },
  {
    name: 'Aditya Singh',
    title: 'Frontend Developer (React.js)',
    image: '/images/aditya.jpeg',
    telescopeLink: 'https://telescope.epam.com/who/Aditya_Singh2?tab=cv',
    linkedInLink: 'https://www.linkedin.com/in/adityasinghz/'
  },
  {
    name: 'Ali Abbas',
    title: 'Backend Developer (Java)',
    image: '/images/ali.jpg',
    telescopeLink: 'https://telescope.epam.com/who/Ali_Abbas?tab=cv',
    linkedInLink: 'https://www.linkedin.com/in/ali-abbas-644a37203/'
  },
  {
    name: 'Arunanshu Jena',
    title: 'Backend Developer (Java)',
    image: '/images/arunanshu.jpg',
    telescopeLink: 'https://telescope.epam.com/who/Arunanshu_Jena?tab=cv',
    linkedInLink: 'https://www.linkedin.com/in/arunanshu-jena/'
  },
  {
    name: 'Ashutosh Amartya',
    title: 'Automation (Java)',
    image: '/images/ashutosh.jpg',
    telescopeLink: 'https://telescope.epam.com/who/Ashutosh_Amartya?tab=cv',
    linkedInLink: 'https://www.linkedin.com/in/ashutosh-amartya-5720b5266/'
  },
  {
    name: 'Ayush Tyagi',
    title: 'Automation (Java)',
    image: '/images/tyagi.jpg',
    telescopeLink: 'https://telescope.epam.com/who/Ayush_Tyagi?tab=cv',
    linkedInLink: 'https://www.linkedin.com/in/ayush-tyagi-781746216/'
  },
  {
    name: 'Shashwat Swaraj',
    title: 'Backend Developer (Java)',
    image: '/images/swaraj.jpeg',
    telescopeLink: 'https://telescope.epam.com/who/Shashwat_Swaraj?tab=cv',
    linkedInLink: 'https://www.linkedin.com/in/shashwat-swaraj-903a0b196/'
  }
];

export default function Profile() {
  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
               Dev Team
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {profiles.map((profile, index) => (
        <Grid item xs={12} md={3} sx={{padding:4}}>
        <Card sx={{ maxWidth: 250}} key={index}>
          <CardMedia
            component="img"
            sx={{ 
              height: 200, 
              width: '100%',
              objectFit: 'cover' 
            }}
            image={profile.image}
            title={profile.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {profile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={profile.telescopeLink}>TeleScope</Button>
            <Button size="small" href={profile.linkedInLink}>LinkedIn</Button>
          </CardActions>
        </Card>
        </Grid>
      ))}
    </Grid>
  );
}
