import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, IconButton, Popover } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { useNavigate } from 'react-router-dom';

function CreateRegularPostPage() {
  const navigate = useNavigate();
  const currentUser = 'Emilia';

  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [feeling, setFeeling] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  // State for Feeling popover
  const [feelingAnchorEl, setFeelingAnchorEl] = useState(null);
  const feelings = ['😊', '😢', '😡', '😮', '😂', '😍'];

  // State for Background colors popover
  const [bgAnchorEl, setBgAnchorEl] = useState(null);
  const colors = ['#ffffff', '#f5f5f5', '#ffebee', '#e8f5e9', '#e3f2fd'];

  // PHOTO/VIDEO handler
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  // Feeling popover handlers
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

  // Background colors popover handlers
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

  // Live video handler (simulate functionality)
  const handleLiveVideo = () => {
    alert('Live Video feature activated!');
  };

  // When the Post button is clicked, create a new regular post and store it in localStorage.
  const handleSubmitPost = () => {
    const newPost = {
      id: Date.now(),
      type: 'regular',
      content: postContent,
      feeling,
      backgroundColor,
      file: filePreview, // URL for the photo/video preview
      timestamp: Date.now(),
      authorName: currentUser,
      authorProfilePic: 'https://via.placeholder.com/40'
    };

    // Retrieve existing posts (if any) from localStorage, then add the new post
    const existingPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));

    // Navigate to the Community page (adjust route as needed)
    navigate('/community');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ p: 2, backgroundColor: backgroundColor, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create Post
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        {filePreview && (
          <Box sx={{ mt: 2 }}>
            <img
              src={filePreview}
              alt="Preview"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          </Box>
        )}
        {feeling && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Feeling: {feeling}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        <Button variant="outlined" component="label" startIcon={<PhotoCameraIcon />}>
          PHOTO/ VIDEO
          <input
            type="file"
            hidden
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </Button>
        <Button variant="outlined" startIcon={<VideocamIcon />} onClick={handleLiveVideo}>
          LIVE VIDEO
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
        <Button variant="contained" onClick={handleSubmitPost}>
          Post
        </Button>
      </Box>
    </Container>
  );
}

export default CreateRegularPostPage;