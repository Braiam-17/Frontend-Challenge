import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { PostService } from '../services/api';
import CommentSection from '../components/CommentSection';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: '', body: '' });

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const fetchPostDetails = async () => {
    try {
      const postData = await PostService.getPost(id);
      setPost(postData);
      setEditedPost({ title: postData.title, body: postData.body });

      const [userData, commentsData] = await Promise.all([
        PostService.getUser(postData.userId),
        PostService.getPostComments(id)
      ]);

      setAuthor(userData);
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching post details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
      try {
        await PostService.deletePost(id);
        // En una aplicación real, aquí se eliminaría el post del estado
        // JSONPlaceholder no elimina realmente el recurso en su API
        alert("Post eliminado correctamente (simulado)");
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEditOpen = () => {
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditSave = async () => {
    try {
      const updatedPost = await PostService.updatePost(id, {
        ...post,
        title: editedPost.title,
        body: editedPost.body
      });
      
      // JSONPlaceholder no actualiza realmente el recurso, pero simularemos que sí
      setPost({
        ...post,
        title: editedPost.title,
        body: editedPost.body
      });
      
      setOpenEditDialog(false);
      alert("Post actualizado correctamente (simulado)");
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Error Post no encontrado.
        </Typography>       
        </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {post.title}
        </Typography>
        <Box>
          <IconButton color="primary" onClick={handleEditOpen}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          {author && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Por: {author.name}
            </Typography>
          )}
          <Typography variant="body1" paragraph>
            {post.body}
          </Typography>
        </CardContent>
      </Card>

      {/* Usamos el componente con Tailwind aquí */}
      <CommentSection comments={comments} />

      {/* Dialog para editar */}
      <Dialog open={openEditDialog} onClose={handleEditClose} fullWidth maxWidth="md">
        <DialogTitle>Editar publicación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Contenido"
            multiline
            rows={6}
            fullWidth
            value={editedPost.body}
            onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PostDetail;