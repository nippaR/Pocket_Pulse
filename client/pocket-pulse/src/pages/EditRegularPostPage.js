import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  Popover,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

function EditRegularPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams(); // Ensure the route is defined like "/edit-regular-post/:postId"
  const id = Number(postId);

  // Post state variables
  const [content, setContent] = useState('');
  const [feeling, setFeeling] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // State for Feeling popover
  const [feelingAnchorEl, setFeelingAnchorEl] = useState(null);
  const feelings = ['😊', '😢', '😡', '😮', '😂', '😍'];

  // State for Background Colors popover
  const [bgAnchorEl, setBgAnchorEl] = useState(null);
  const colors = ['#ffffff', '#f5f5f5', '#ffebee', '#e8f5e9', '#e3f2fd'];

  // Load regular post data on mount
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    const regularPost = posts.find((post) => post.id === id && post.type === 'regular');

    if (regularPost) {
      setContent(regularPost.content || '');
      setFeeling(regularPost.feeling || '');
      setBackgroundColor(regularPost.backgroundColor || '#ffffff');
      setFilePreview(regularPost.file || '');
    } else {
      alert('Regular post not found.');
      navigate('/community');
    }
  }, [id, navigate]);

  // Handlers for Feeling popover
  const handleOpenFeelingPopover = (e) => {
    setFeelingAnchorEl(e.currentTarget);
  };
  const handleCloseFeelingPopover = () => {
    setFeelingAnchorEl(null);
  };
  const handleSelectFeeling = (emo) => {
    setFeeling(emo);
    handleCloseFeelingPopover();
  };

  // Handlers for Background Colors popover
  const handleOpenBgPopover = (e) => {
    setBgAnchorEl(e.currentTarget);
  };
  const handleCloseBgPopover = () => {
    setBgAnchorEl(null);
  };
  const handleSelectBackground = (color) => {
    setBackgroundColor(color);
    handleCloseBgPopover();
  };

  // File change handler
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!content.trim()) newErrors.content = 'Post content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission to update regular post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedPost = {
      id,
      type: 'regular',
      content,
      feeling,
      backgroundColor,
      file: filePreview, // storing the preview URL for simplicity
      timestamp: Date.now(),
      // For simplicity, author fields remain unchanged
      authorName: 'Emilia',
      authorProfilePic: 'https://via.placeholder.com/40'
    };

    // Update the post in localStorage
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    const updatedPosts = posts.map((post) => {
      if (post.id === id && post.type === 'regular') {
        return { ...post, ...updatedPost };
      }
      return post;
    });
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));

    // Show success message and navigate back
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate('/community');
    }, 1500);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, backgroundColor }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={!!errors.content}
            helperText={errors.content}
            sx={{ mb: 2 }}
          />
          {filePreview && (
            <Box sx={{ mb: 2 }}>
              <img
                src={filePreview}
                alt="Preview"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
            </Box>
          )}
          {feeling && (
            <Typography variant="h6" sx={{ mb: 2 }}>
              Feeling: {feeling}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
            <Button variant="outlined" component="label" startIcon={<PhotoCameraIcon />}>
              PHOTO/VIDEO
              <input
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </Button>
            <Button variant="outlined" startIcon={<EmojiEmotionsIcon />} onClick={handleOpenFeelingPopover}>
              FEELING
            </Button>
            <Button variant="outlined" startIcon={<FormatColorFillIcon />} onClick={handleOpenBgPopover}>
              BACKGROUND
            </Button>
          </Box>

          {/* Feeling Popover */}
          <Popover
            open={Boolean(feelingAnchorEl)}
            anchorEl={feelingAnchorEl}
            onClose={handleCloseFeelingPopover}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Box sx={{ display: 'flex', p: 1 }}>
              {feelings.map((emo) => (
                <IconButton key={emo} onClick={() => handleSelectFeeling(emo)}>
                  <Typography variant="h5">{emo}</Typography>
                </IconButton>
              ))}
            </Box>
          </Popover>

          {/* Background Colors Popover */}
          <Popover
            open={Boolean(bgAnchorEl)}
            anchorEl={bgAnchorEl}
            onClose={handleCloseBgPopover}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Box sx={{ display: 'flex', p: 1 }}>
              {colors.map((color) => (
                <IconButton key={color} onClick={() => handleSelectBackground(color)}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: color,
                      borderRadius: '50%',
                      border: '1px solid #ccc'
                    }}
                  />
                </IconButton>
              ))}
            </Box>
          </Popover>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="text" sx={{ mr: 1 }} onClick={() => navigate('/community')}>
              Back
            </Button>
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        message="Post updated successfully!"
      />
    </Container>
  );
}

export default EditRegularPostPage;