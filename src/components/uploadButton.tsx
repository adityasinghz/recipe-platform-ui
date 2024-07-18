import { ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface InputFileUploadProps {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

export default function InputFileUpload({setSelectedImage }: InputFileUploadProps) {

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file); // Add this line to start reading the file
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{ backgroundColor: 'grey' }}
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
        <VisuallyHiddenInput type="file" onChange={handleImageChange} />
      </Button>
    </Box>
  );
}
