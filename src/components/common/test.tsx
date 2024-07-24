import { useTheme, Button } from '@mui/material';
import { useThemeContext } from '../../ThemeContextProvider';

const SomeComponent = () => {
  const { toggleTheme, mode } = useThemeContext();
  const theme = useTheme();

  return (
    <div>
      <Button onClick={toggleTheme}>
        Toggle to {mode === 'light' ? 'dark' : 'light'} mode
      </Button>
      <p>Current primary color: {theme.palette.primary.main}</p>
    </div>
  );
};

export default SomeComponent;
