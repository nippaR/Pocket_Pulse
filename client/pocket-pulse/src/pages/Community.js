import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

// MUI Icons
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

////////////////////////////////////////////////////////////////////////////////
// SIDEBAR
////////////////////////////////////////////////////////////////////////////////
const Sidebar = () => {
  return (
    <Box
      sx={{
        width: '240px',
        backgroundColor: '#f4f8fb',
        height: '100vh',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
      }}
    >
      {/* Logo/Brand area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '64px',
          px: 2,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          <span style={{ color: '#3f51b5' }}>A</span>
        </Typography>
      </Box>

      {/* Navigation List */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                backgroundColor: '#2f4ebc',
                '&:hover': { backgroundColor: '#324ea8' },
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
                    Community
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Investment planning" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Transactions" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Incomes" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Properties Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            mb: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#777' }}>
            PROPERTIES
          </Typography>
          <IconButton size="small" sx={{ color: '#777' }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <List disablePadding>
          <ListItem disablePadding sx={{ pl: 2 }}>
            <ListItemButton sx={{ py: 0.5 }}>
              <ListItemText
                primary="123 Main St"
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          borderTop: '1px solid #e0e0e0',
          p: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Badge
          color="success"
          badgeContent="New"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ '& .MuiBadge-badge': { transform: 'scale(0.8) translate(50%, -50%)' } }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            My Referrals
          </Typography>
        </Badge>
      </Box>
    </Box>
  );
};

////////////////////////////////////////////////////////////////////////////////
// MAIN COMMUNITY COMPONENT
////////////////////////////////////////////////////////////////////////////////
function Community() {
  const currentUser = 'Emilia';

  // Minimal "Stories" state
  const [stories, setStories] = useState([
    {
      id: 1,
      author: 'Rahul',
      avatar: 'https://via.placeholder.com/40',
      storyImage: null,
      text: 'Beautiful day!',
    },
  ]);

  // For adding a new story
  const [openStoryModal, setOpenStoryModal] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [storyFile, setStoryFile] = useState(null);

  // For viewing/deleting a story
  const [openViewStory, setOpenViewStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  // Minimal posts feed
  const [posts, setPosts] = useState([
    { id: 101, author: 'Emilia', content: 'Hello community! Excited to be here.' },
    { id: 102, author: 'Adam', content: 'Check out my new project!' },
  ]);

  // CREATE POST MODAL
  const [openPostModal, setOpenPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');

  // STORY MODAL handlers
  const handleOpenStoryModal = () => setOpenStoryModal(true);
  const handleCloseStoryModal = () => {
    setOpenStoryModal(false);
    setStoryText('');
    setStoryFile(null);
  };
  const handleStoryFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setStoryFile(e.target.files[0]);
    }
  };
  const handlePostStory = () => {
    if (!storyText.trim() && !storyFile) return;
    let storyImage = null;
    if (storyFile) {
      storyImage = URL.createObjectURL(storyFile);
    }
    const newStory = {
      id: Date.now(),
      author: currentUser,
      avatar: 'https://via.placeholder.com/40',
      storyImage,
      text: storyText,
    };
    setStories([newStory, ...stories]);
    handleCloseStoryModal();
  };

  // VIEW STORY
  const handleViewStory = (story) => {
    setSelectedStory(story);
    setOpenViewStory(true);
  };
  const handleCloseViewStory = () => {
    setOpenViewStory(false);
    setSelectedStory(null);
  };
  const handleDeleteStory = (storyId) => {
    setStories((prev) => prev.filter((s) => s.id !== storyId));
    handleCloseViewStory();
  };

  // CREATE POST (via modal)
  const handleOpenPostModal = () => setOpenPostModal(true);
  const handleClosePostModal = () => {
    setOpenPostModal(false);
    setPostContent('');
  };
  const handleSubmitPost = () => {
    if (!postContent.trim()) return;
    const newPost = {
      id: Date.now(),
      author: currentUser,
      content: postContent,
    };
    setPosts([newPost, ...posts]);
    handleClosePostModal();
  };

  return (
    <Box display="flex" width="100%">
      <Sidebar />

      <Container sx={{ flexGrow: 1, py: 3 }}>
        {/* TOP BANNER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2, backgroundColor: '#1e407c', color: '#fff', p: 2, borderRadius: 1 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Community
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                backgroundColor: '#ffeb99',
                color: '#000',
                px: 2,
                py: 0.5,
                borderRadius: 4,
                fontWeight: 'bold',
              }}
            >
              500 credit balance
            </Box>
            <IconButton sx={{ color: '#fff' }}>
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton>
              <Avatar src="https://via.placeholder.com/40" alt="Profile" />
            </IconButton>
          </Box>
        </Box>

        {/* STORIES SECTION */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Stories
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
            {/* Add to Story */}
            <Box
              sx={{
                minWidth: 80,
                height: 130,
                backgroundColor: '#eee',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleOpenStoryModal}
            >
              <Avatar sx={{ bgcolor: '#2f4ebc', width: 40, height: 40, mb: 1 }}>
                <AddIcon />
              </Avatar>
              <Typography variant="caption">Add to Story</Typography>
            </Box>

            {/* Existing stories */}
            {stories.map((story) => (
              <Box
                key={story.id}
                sx={{
                  minWidth: 80,
                  height: 130,
                  backgroundColor: '#ccc',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#555',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => handleViewStory(story)}
              >
                {story.storyImage ? (
                  <img
                    src={story.storyImage}
                    alt="Story"
                    style={{ width: '100%', height: '70%', objectFit: 'cover' }}
                  />
                ) : (
                  <Avatar
                    src={story.avatar}
                    alt={story.author}
                    sx={{ mb: 1, width: 40, height: 40 }}
                  />
                )}
                <Typography variant="caption">{story.author}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* CREATE POST BUTTON (LEFT-ALIGNED) */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={handleOpenPostModal}
            sx={{ backgroundColor: '#283593' }}
          >
            Create Post
          </Button>
        </Box>

        {/* POSTS FEED */}
        {posts.map((post) => (
          <Paper key={post.id} sx={{ p: 2, mb: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ bgcolor: '#1976d2', mr: 1 }}>
                {post.author.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="subtitle2">{post.author}</Typography>
            </Box>
            <Typography variant="body1">{post.content}</Typography>
          </Paper>
        ))}

        {/* ADD STORY MODAL */}
        <Dialog open={openStoryModal} onClose={handleCloseStoryModal} fullWidth maxWidth="sm">
          <DialogTitle>Add to Story</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Say something..."
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" component="label" startIcon={<PhotoCameraIcon />}>
              Upload Image/Video
              <input
                hidden
                accept="image/*,video/*"
                type="file"
                onChange={handleStoryFileChange}
              />
            </Button>
            {storyFile && (
              <Typography sx={{ mt: 1 }} variant="body2">
                Selected: {storyFile.name}
              </Typography>
            )}
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button onClick={handleCloseStoryModal} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handlePostStory}>
                Post Story
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* VIEW/DELETE STORY MODAL */}
        {selectedStory && (
          <Dialog open={openViewStory} onClose={handleCloseViewStory} fullWidth maxWidth="sm">
            <DialogTitle>{selectedStory.author}'s Story</DialogTitle>
            <DialogContent>
              {selectedStory.storyImage && (
                <img
                  src={selectedStory.storyImage}
                  alt="Story"
                  style={{ width: '100%', borderRadius: 8 }}
                />
              )}
              {selectedStory.text && (
                <Typography sx={{ mt: 2 }}>{selectedStory.text}</Typography>
              )}
              {selectedStory.author === currentUser && (
                <Box sx={{ textAlign: 'right', mt: 2 }}>
                  <IconButton color="error" onClick={() => handleDeleteStory(selectedStory.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </DialogContent>
          </Dialog>
        )}

        {/* CREATE POST MODAL */}
        <Dialog open={openPostModal} onClose={handleClosePostModal} fullWidth maxWidth="sm">
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder={`What's on your mind, ${currentUser}?`}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button onClick={handleClosePostModal} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmitPost}>
                Post
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Community;