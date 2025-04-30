import React, { useState, useEffect, useRef } from 'react';
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
  Button,
  Menu,
  MenuItem,
  Popover,
  InputBase
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

// MUI Icons
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';      // For "View Report" button
import DownloadIcon from '@mui/icons-material/Download';             // For download inside modal

// jsPDF for PDF generation
import jsPDF from 'jspdf';

/////////////////////////////////////////////
// SIDEBAR COMPONENT
/////////////////////////////////////////////
const Sidebar = () => {
  return (
    <Box
      sx={{
        width: '240px',
        backgroundColor: '#f4f8fb',
        height: '100vh',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '64px',
          px: 2,
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          <span style={{ color: '#3f51b5' }}>A</span>
        </Typography>
      </Box>
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
                '&:hover': { backgroundColor: '#324ea8' }
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            mb: 1
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
              <ListItemText primary="123 Main St" primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box
        sx={{
          borderTop: '1px solid #e0e0e0',
          p: 2,
          display: 'flex',
          alignItems: 'center'
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

/////////////////////////////////////////////
// MAIN COMMUNITY COMPONENT
/////////////////////////////////////////////
function Community() {
  const navigate = useNavigate();
  const currentUser = 'Emilia';

  // Stories
  const [stories, setStories] = useState([
    { id: 1, author: 'Rahul', avatar: 'https://via.placeholder.com/40', storyImage: null, text: 'Beautiful day!' }
  ]);
  const [openStoryModal, setOpenStoryModal] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [storyFile, setStoryFile] = useState(null);
  const [openViewStory, setOpenViewStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  // Posts from localStorage
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const storedPosts = localStorage.getItem('communityPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);
  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('communityPosts', JSON.stringify(newPosts));
  };

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
    const storyImage = storyFile ? URL.createObjectURL(storyFile) : null;
    const newStory = {
      id: Date.now(),
      author: currentUser,
      avatar: 'https://via.placeholder.com/40',
      storyImage,
      text: storyText
    };
    setStories([newStory, ...stories]);
    handleCloseStoryModal();
  };
  const handleViewStory = (story) => {
    setSelectedStory(story);
    setOpenViewStory(true);
  };
  const handleCloseViewStory = () => {
    setOpenViewStory(false);
    setSelectedStory(null);
  };
  const handleDeleteStory = (storyId) => {
    const updatedStories = stories.filter((s) => s.id !== storyId);
    setStories(updatedStories);
    setOpenViewStory(false);
  };

  // CREATE POST / DONATION CHOICE modal
  const [openChoiceModal, setOpenChoiceModal] = useState(false);
  const handleOpenChoiceModal = () => setOpenChoiceModal(true);
  const handleCloseChoiceModal = () => setOpenChoiceModal(false);
  const handleChooseRegularPost = () => {
    handleCloseChoiceModal();
    navigate('/create-post');
  };
  const handleChooseDonation = () => {
    handleCloseChoiceModal();
    navigate('/donation-request');
  };

  // Reaction Picker
  const [reactionPickerAnchorEl, setReactionPickerAnchorEl] = useState(null);
  const [reactionPostId, setReactionPostId] = useState(null);
  const reactionOptions = [
    { label: 'Like', emoji: '👍' },
    { label: 'Love', emoji: '❤️' },
    { label: 'Haha', emoji: '😂' },
    { label: 'Wow', emoji: '😮' },
    { label: 'Sad', emoji: '😢' },
    { label: 'Angry', emoji: '😡' }
  ];
  const handleOpenReactionPicker = (event, postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post || !post.reactions || !post.reactions[currentUser]) {
      setReactionPickerAnchorEl(event.currentTarget);
      setReactionPostId(postId);
    }
  };
  const handleCloseReactionPicker = () => {
    setReactionPickerAnchorEl(null);
    setReactionPostId(null);
  };
  const handleSelectReaction = (emoji) => {
    const updatedPosts = posts.map((p) => {
      if (p.id === reactionPostId) {
        const currentReactions = p.reactions || {};
        if (currentReactions[currentUser] === emoji) {
          delete currentReactions[currentUser];
        } else {
          currentReactions[currentUser] = emoji;
        }
        return { ...p, reactions: currentReactions };
      }
      return p;
    });
    savePosts(updatedPosts);
    handleCloseReactionPicker();
  };

  // Comment dialog
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedPostForComments, setSelectedPostForComments] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const handleOpenCommentDialog = (post) => {
    setSelectedPostForComments(post);
    setNewCommentText('');
    setCommentDialogOpen(true);
  };
  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setSelectedPostForComments(null);
    setEditingCommentId(null);
    setEditingCommentText('');
  };
  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const existingComments = Array.isArray(selectedPostForComments.comments)
      ? selectedPostForComments.comments
      : [];
    const newComment = {
      id: Date.now(),
      author: currentUser,
      text: newCommentText,
      timestamp: Date.now()
    };
    const updatedPost = { ...selectedPostForComments, comments: [...existingComments, newComment] };
    const updatedPosts = posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
    savePosts(updatedPosts);
    setSelectedPostForComments(updatedPost);
    setNewCommentText('');
  };
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text);
  };
  const handleSaveEditedComment = (commentId) => {
    const existingComments = Array.isArray(selectedPostForComments.comments)
      ? selectedPostForComments.comments
      : [];
    const updatedComments = existingComments.map((c) => {
      if (c.id === commentId) {
        return { ...c, text: editingCommentText };
      }
      return c;
    });
    const updatedPost = { ...selectedPostForComments, comments: updatedComments };
    const updatedPosts = posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
    savePosts(updatedPosts);
    setSelectedPostForComments(updatedPost);
    setEditingCommentId(null);
    setEditingCommentText('');
  };
  const handleDeleteComment = (commentId) => {
    const existingComments = Array.isArray(selectedPostForComments.comments)
      ? selectedPostForComments.comments
      : [];
    const updatedComments = existingComments.filter((c) => c.id !== commentId);
    const updatedPost = { ...selectedPostForComments, comments: updatedComments };
    const updatedPosts = posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
    savePosts(updatedPosts);
    setSelectedPostForComments(updatedPost);
  };

  // Post Edit/Delete Menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuPostId, setMenuPostId] = useState(null);

  const handleOpenMenu = (event, postId) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuPostId(postId);
  };
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setMenuPostId(null);
  };

  const handleEditPost = () => {
    handleCloseMenu();
    const postToEdit = posts.find((p) => p.id === menuPostId);
    if (!postToEdit) return;

    if (postToEdit.isDonationRequest) {
      navigate(`/edit-donation-request/${postToEdit.id}`);
    } else {
      navigate(`/edit-regular-post/${postToEdit.id}`);
    }
  };

  const handleDeletePost = () => {
    handleCloseMenu();
    const updatedPosts = posts.filter((p) => p.id !== menuPostId);
    savePosts(updatedPosts);
  };

  // "X hrs. ago" utility
  const getHoursAgoText = (timestamp) => {
    const hoursAgo = Math.floor((Date.now() - timestamp) / 3600000);
    if (hoursAgo <= 0) return 'Just now';
    if (hoursAgo === 1) return '1 hr. ago';
    return `${hoursAgo} hrs. ago`;
  };

  // Like toggling
  const handleLike = (postId) => {
    handleCloseReactionPicker();
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const currentReactions = p.reactions || {};
        if (currentReactions[currentUser]) {
          delete currentReactions[currentUser];
        } else {
          currentReactions[currentUser] = '👍';
        }
        return { ...p, reactions: currentReactions };
      }
      return p;
    });
    savePosts(updated);
  };

  // Share
  const handleShare = (postId) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, shares: (p.shares || 0) + 1 };
      }
      return p;
    });
    savePosts(updated);
  };

  // Donate
  const handleDonate = (postId) => {
    const amountStr = prompt('Enter donation amount (USD):');
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) return;
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const newDonation = (p.currentDonation || 0) + amount;
        return { ...p, currentDonation: newDonation };
      }
      return p;
    });
    savePosts(updated);
  };

  // DROPDOWN + SEARCH for post filtering
  const [searchFilter, setSearchFilter] = useState('All Posts');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredPosts = () => {
    let filtered = [...posts];

    // Filter by dropdown
    if (searchFilter === 'Donation Request Posts') {
      filtered = filtered.filter((p) => p.isDonationRequest);
    } else if (searchFilter === 'Regular Post') {
      filtered = filtered.filter((p) => p.type === 'regular');
    }

    // Filter by searchTerm (owner name)
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        (p.authorName || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Example logic: filter out donation posts by "Danny Kruso"
    filtered = filtered.filter((p) => !(p.isDonationRequest && p.authorName === 'Danny Kruso'));

    return filtered;
  };

  const finalPosts = getFilteredPosts();

  /////////////////////////////////////////////////////////////////////
  // REPORT GENERATION: Donation Request Posts of the current user
  /////////////////////////////////////////////////////////////////////
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Filter out only the donation posts by the current user
  const userDonationPosts = posts.filter(
    (p) => p.isDonationRequest && p.authorName === currentUser
  );

  // Open the modal to view the "report"
  const handleOpenReport = () => {
    setReportModalOpen(true);
  };
  const handleCloseReport = () => {
    setReportModalOpen(false);
  };

  // Generate PDF & Download
  const handleDownloadPdf = () => {
    const doc = new jsPDF('p', 'pt', 'letter'); // (orientation, unit, size)

    // Basic styling values
    const leftMargin = 40;
    let yPos = 40; // vertical start

    // Title top
    doc.setFontSize(20);
    doc.text('Pocket pulse.', leftMargin, yPos);
    yPos += 30;

    doc.setFontSize(16);
    doc.text('Donation Request Details.', leftMargin, yPos);
    yPos += 30;

    // Loop over user's donation posts
    userDonationPosts.forEach((post, index) => {
      const fd = post.formData || {};
      // Some spacing before each post
      if (index !== 0) {
        yPos += 20;
      }
      // Render each donation post info
      doc.setFontSize(12);

      // We'll show event name and date in bold style
      doc.setFont(undefined, 'bold');
      doc.text(`${fd.eventName} - ${fd.eventDate}`, leftMargin, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 15;

      // Then text lines for each item
      const lines = [
        `Event Location: ${fd.eventLocation}`,
        `Organization Name: ${fd.organizationName}`,
        `Mission: ${fd.missionStatement}`,
        `Address: ${fd.addressLine1}, ${fd.addressLine2}`,
        `Phone: ${fd.phoneNo}`,
        `E-mail: ${fd.email}`,
        `Website: ${fd.website}`,
        `Amount (USD): ${fd.amountItemsRequest}`,
        `Donation Type: ${fd.typeOfDonation}`,
        `Purpose: ${fd.purposeDonation}`,
        `Attendees: ${fd.expectedAttendees}`,
        `Sponsor Benefits: ${fd.areSponsorBenefits === 'Yes' ? fd.describeBenefits : 'None'}`
      ];

      lines.forEach((line) => {
        doc.text(line, leftMargin, yPos);
        yPos += 15;
      });

      // If the user has multiple posts and the text might go off page, do a basic check
      if (yPos > 700) {
        doc.addPage();
        yPos = 40;
      }
    });

    // Footer
    yPos += 40;
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('Pocket pulse.', leftMargin, yPos);

    // Save
    doc.save('DonationReport.pdf');
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
                fontWeight: 'bold'
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

        {/* SEARCH BAR & REPORT ICON (below top banner, above Stories) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {/* Standard Dropdown for filtering */}
          <TextField
            select
            label="Filter By"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            size="small"
            sx={{ width: 200 }}
          >
            <MenuItem value="All Posts">All Posts</MenuItem>
            <MenuItem value="Donation Request Posts">Donation Request Posts</MenuItem>
            <MenuItem value="Regular Post">Regular Post</MenuItem>
          </TextField>

          {/* Custom Rounded Search Bar */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '24px',
              border: '1px solid #ccc',
              width: '100%'
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by Owner Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Paper>

          {/* REPORT GENERATION ICON (only if user has donation posts) */}
          {userDonationPosts.length > 0 && (
            <IconButton
              onClick={handleOpenReport}
              sx={{ color: '#1e407c' }}
              title="View My Donation Report"
            >
              <PictureAsPdfIcon />
            </IconButton>
          )}
        </Box>

        {/* STORIES SECTION */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Stories
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
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
                cursor: 'pointer'
              }}
              onClick={handleOpenStoryModal}
            >
              <Avatar sx={{ bgcolor: '#2f4ebc', width: 40, height: 40, mb: 1 }}>
                <AddIcon />
              </Avatar>
              <Typography variant="caption">Add to Story</Typography>
            </Box>
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
                  cursor: 'pointer'
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
                  <Avatar src={story.avatar} alt={story.author} sx={{ mb: 1, width: 40, height: 40 }} />
                )}
                <Typography variant="caption">{story.author}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* CREATE POST BUTTON */}
        <Box sx={{ mb: 3, textAlign: 'left' }}>
          <Button variant="contained" onClick={handleOpenChoiceModal} sx={{ backgroundColor: '#283593' }}>
            Create Posts
          </Button>
        </Box>

        {/* POSTS FEED */}
        {finalPosts.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No posts yet.
          </Typography>
        ) : (
          finalPosts.map((post) => {
            const hoursAgoText = post.timestamp ? getHoursAgoText(post.timestamp) : '';
            const likeCount = post.reactions ? Object.keys(post.reactions).length : 0;

            // REGULAR POST
            if (post.type === 'regular') {
              return (
                <Paper key={post.id} sx={{ p: 2, mb: 2, backgroundColor: post.backgroundColor || '#ffffff' }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box display="flex" alignItems="center">
                      <Avatar src={post.authorProfilePic} sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {post.authorName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {hoursAgoText}
                        </Typography>
                      </Box>
                    </Box>
                    {post.authorName === currentUser && (
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, post.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </Box>
                  {post.feeling && (
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Feeling: {post.feeling}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {post.content}
                  </Typography>
                  {post.file && (
                    <Box sx={{ mt: 2 }}>
                      <img
                        src={post.file}
                        alt="Post media"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>
                  )}
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="caption">{likeCount} Likes</Typography>
                    <Typography variant="caption">
                      {Array.isArray(post.comments) ? post.comments.length : 0} Comments
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ mt: 1 }}>
                    <Button
                      startIcon={
                        post.reactions && post.reactions[currentUser] ? (
                          <span style={{ fontSize: '24px' }}>{post.reactions[currentUser]}</span>
                        ) : (
                          <ThumbUpOffAltIcon />
                        )
                      }
                      onMouseEnter={(e) => {
                        if (!(post.reactions && post.reactions[currentUser])) {
                          handleOpenReactionPicker(e, post.id);
                        }
                      }}
                      onClick={() => handleLike(post.id)}
                    >
                      {post.reactions && post.reactions[currentUser] ? '' : 'Like'}
                    </Button>
                    <Button startIcon={<ModeCommentOutlinedIcon />} onClick={() => handleOpenCommentDialog(post)}>
                      Comment
                    </Button>
                    <Button startIcon={<ShareOutlinedIcon />} onClick={() => handleShare(post.id)}>
                      Share
                    </Button>
                  </Box>
                </Paper>
              );
            }

            // DONATION REQUEST POST
            else if (post.isDonationRequest && post.formData) {
              const fd = post.formData;
              const donationSoFar = post.currentDonation || 0;
              return (
                <Paper key={post.id} sx={{ p: 2, mb: 2 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box display="flex" alignItems="center">
                      <Avatar src={post.authorProfilePic} sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {post.authorName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {hoursAgoText}
                        </Typography>
                      </Box>
                    </Box>
                    {post.authorName === currentUser && (
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, post.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {fd.eventName} - {fd.eventDate}
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <li>Event Location: {fd.eventLocation}</li>
                    <li>Organization: {fd.organizationName}</li>
                    <li>Mission: {fd.missionStatement}</li>
                    <li>Address: {fd.addressLine1}, {fd.addressLine2}</li>
                    <li>Phone: {fd.phoneNo}</li>
                    <li>Email: {fd.email}</li>
                    <li>Website: {fd.website}</li>
                    <li>Amount (USD): {fd.amountItemsRequest}</li>
                    <li>Donation Type: {fd.typeOfDonation}</li>
                    <li>Purpose: {fd.purposeDonation}</li>
                    <li>Attendees: {fd.expectedAttendees}</li>
                    <li>
                      Sponsor Benefits:{' '}
                      {fd.areSponsorBenefits === 'Yes' ? fd.describeBenefits : 'None'}
                    </li>
                  </Box>
                  {donationSoFar > 0 && (
                    <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                      Total Donations So Far: ${donationSoFar}
                    </Typography>
                  )}
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="caption">{likeCount} Likes</Typography>
                    <Typography variant="caption">
                      {Array.isArray(post.comments) ? post.comments.length : 0} Comments
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ mt: 1 }}>
                    <Button
                      startIcon={
                        post.reactions && post.reactions[currentUser] ? (
                          <span style={{ fontSize: '24px' }}>{post.reactions[currentUser]}</span>
                        ) : (
                          <ThumbUpOffAltIcon />
                        )
                      }
                      onMouseEnter={(e) => handleOpenReactionPicker(e, post.id)}
                      onClick={() => handleLike(post.id)}
                    >
                      {post.reactions && post.reactions[currentUser] ? '' : 'Like'}
                    </Button>
                    <Button startIcon={<ModeCommentOutlinedIcon />} onClick={() => handleOpenCommentDialog(post)}>
                      Comment
                    </Button>
                    <Button startIcon={<ShareOutlinedIcon />} onClick={() => handleShare(post.id)}>
                      Share
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleDonate(post.id)}>
                      Donate
                    </Button>
                  </Box>
                </Paper>
              );
            }

            // FALLBACK: treat as regular post
            else {
              return (
                <Paper key={post.id} sx={{ p: 2, mb: 2, backgroundColor: post.backgroundColor || '#ffffff' }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box display="flex" alignItems="center">
                      <Avatar src={post.authorProfilePic} sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {post.authorName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {hoursAgoText}
                        </Typography>
                      </Box>
                    </Box>
                    {post.authorName === currentUser && (
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, post.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </Box>
                  {post.feeling && (
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Feeling: {post.feeling}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {post.content}
                  </Typography>
                  {post.file && (
                    <Box sx={{ mt: 2 }}>
                      <img
                        src={post.file}
                        alt="Post media"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>
                  )}
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="caption">{likeCount} Likes</Typography>
                    <Typography variant="caption">
                      {Array.isArray(post.comments) ? post.comments.length : 0} Comments
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ mt: 1 }}>
                    <Button
                      startIcon={
                        post.reactions && post.reactions[currentUser] ? (
                          <span style={{ fontSize: '24px' }}>{post.reactions[currentUser]}</span>
                        ) : (
                          <ThumbUpOffAltIcon />
                        )
                      }
                      onMouseEnter={(e) => {
                        if (!(post.reactions && post.reactions[currentUser])) {
                          handleOpenReactionPicker(e, post.id);
                        }
                      }}
                      onClick={() => handleLike(post.id)}
                    >
                      {post.reactions && post.reactions[currentUser] ? '' : 'Like'}
                    </Button>
                    <Button startIcon={<ModeCommentOutlinedIcon />} onClick={() => handleOpenCommentDialog(post)}>
                      Comment
                    </Button>
                    <Button startIcon={<ShareOutlinedIcon />} onClick={() => handleShare(post.id)}>
                      Share
                    </Button>
                  </Box>
                </Paper>
              );
            }
          })
        )}

        {/* 3-DOT MENU */}
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleEditPost}>Edit</MenuItem>
          <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
        </Menu>

        {/* COMMENT DIALOG */}
        <Dialog open={commentDialogOpen} onClose={handleCloseCommentDialog} fullWidth maxWidth="sm">
          <DialogTitle>Comments</DialogTitle>
          <DialogContent>
            {selectedPostForComments &&
            Array.isArray(selectedPostForComments.comments) &&
            selectedPostForComments.comments.length > 0 ? (
              selectedPostForComments.comments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 1, p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {comment.author}
                    </Typography>
                    {comment.author === currentUser && (
                      <Box>
                        <Button
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditingCommentText(comment.text);
                          }}
                          size="small"
                        >
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteComment(comment.id)} size="small" color="error">
                          Delete
                        </Button>
                      </Box>
                    )}
                  </Box>
                  {editingCommentId === comment.id ? (
                    <Box>
                      <InputBase
                        fullWidth
                        multiline
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        sx={{ mb: 1, border: '1px solid #ddd', borderRadius: 1, p: 1 }}
                      />
                      <Button variant="contained" onClick={() => handleSaveEditedComment(comment.id)} size="small">
                        Save
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="body2">{comment.text}</Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments yet.
              </Typography>
            )}
            <Box sx={{ mt: 2 }}>
              <InputBase
                fullWidth
                placeholder="Add a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                sx={{ border: '1px solid #ddd', borderRadius: 1, p: 1 }}
              />
              <Button variant="contained" onClick={handleAddComment} sx={{ mt: 1 }}>
                Add Comment
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* CHOICE MODAL for Creating a Post */}
        <Dialog open={openChoiceModal} onClose={handleCloseChoiceModal}>
          <DialogTitle>Choose Post Type</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Button variant="contained" onClick={handleChooseRegularPost}>
                Regular Post
              </Button>
              <Button variant="outlined" onClick={handleChooseDonation}>
                Donation Request
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* ADD STORY MODAL */}
        <Dialog open={openStoryModal} onClose={handleCloseStoryModal} fullWidth maxWidth="sm">
          <DialogTitle>Add to Story</DialogTitle>
          <DialogContent>
            <InputBase
              fullWidth
              multiline
              minRows={3}
              placeholder="Say something..."
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              sx={{ mb: 2, border: '1px solid #ddd', borderRadius: 1, p: 1 }}
            />
            <Button variant="outlined" component="label" startIcon={<PhotoCameraIcon />}>
              Upload Image/Video
              <input hidden accept="image/*,video/*" type="file" onChange={handleStoryFileChange} />
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
                <img src={selectedStory.storyImage} alt="Story" style={{ width: '100%', borderRadius: 8 }} />
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

        {/* REACTION PICKER POPOVER */}
        <Popover
          open={Boolean(reactionPickerAnchorEl) && reactionPostId !== null}
          anchorEl={reactionPickerAnchorEl}
          onClose={handleCloseReactionPicker}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          disableRestoreFocus
        >
          <Box sx={{ display: 'flex', p: 1 }} onMouseEnter={() => {}} onMouseLeave={handleCloseReactionPicker}>
            {reactionOptions.map((option) => (
              <IconButton key={option.label} onClick={() => handleSelectReaction(option.emoji)}>
                <Typography variant="h5">{option.emoji}</Typography>
              </IconButton>
            ))}
          </Box>
        </Popover>

        {/* REPORT MODAL (Preview) */}
        <Dialog open={reportModalOpen} onClose={handleCloseReport} fullWidth maxWidth="md">
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">My Donation Report Preview</Typography>
              <IconButton onClick={handleDownloadPdf} title="Download PDF">
                <DownloadIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {userDonationPosts.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                You have not created any donation requests yet.
              </Typography>
            ) : (
              <Box>
                {/* We'll mimic the style from your reference image */}
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Pocket pulse.
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Donation Request Details.
                </Typography>
                {userDonationPosts.map((post, idx) => {
                  const fd = post.formData || {};
                  return (
                    <Paper key={post.id} sx={{ p: 2, mb: 2, backgroundColor: '#f8f8f8' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {fd.eventName} - {fd.eventDate}
                      </Typography>
                      <Typography variant="body2">Event Location: {fd.eventLocation}</Typography>
                      <Typography variant="body2">Organization Name: {fd.organizationName}</Typography>
                      <Typography variant="body2">Mission: {fd.missionStatement}</Typography>
                      <Typography variant="body2">
                        Address: {fd.addressLine1}, {fd.addressLine2}
                      </Typography>
                      <Typography variant="body2">Phone: {fd.phoneNo}</Typography>
                      <Typography variant="body2">E-mail: {fd.email}</Typography>
                      <Typography variant="body2">Website: {fd.website}</Typography>
                      <Typography variant="body2">
                        Amount (USD): {fd.amountItemsRequest}
                      </Typography>
                      <Typography variant="body2">Donation Type: {fd.typeOfDonation}</Typography>
                      <Typography variant="body2">Purpose: {fd.purposeDonation}</Typography>
                      <Typography variant="body2">
                        Attendees: {fd.expectedAttendees}
                      </Typography>
                      <Typography variant="body2">
                        Sponsor Benefits:{' '}
                        {fd.areSponsorBenefits === 'Yes' ? fd.describeBenefits : 'None'}
                      </Typography>
                    </Paper>
                  );
                })}
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 4 }}>
                  Pocket pulse.
                </Typography>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Community;