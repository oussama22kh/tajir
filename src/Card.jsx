import {
  Button,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Checkbox,
  Menu,
  Fab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardHeader,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import photo from "./assets/97915.jpg";
export default function Cardproduct(props) {
  return (
    <>
      <Grid item xs={12} sm={6} lg={3} md={4} className="my-5 p-3">
        <Card className="w-72">
          <CardMedia style={{ width:"90%" , height :"150px" , marginLeft : "5%" ,marginTop:"5%" }}
            component="img"
            height="100"
            width="100"
            image={`http://127.0.0.1:8000/storage/${props.product.photos[0]}`}
            alt="Paella dish"
          />
          <CardContent>
            <Typography> {props.product.name} </Typography>
          </CardContent>
          <CardActions>
            <Typography>$ {props.product.price}</Typography>
            <IconButton>
              <AddShoppingCartIcon />
            </IconButton>
            <IconButton>
              <VisibilityOutlinedIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
