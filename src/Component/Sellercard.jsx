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
  Rating,
} from "@mui/material";
import { useSeller } from "../contexts/sellercontext";

export default function Sellercard(props) {
  const { setOpenproduct } = useSeller();
  const handleOpenproduct = () => {
    setOpenproduct(true);
  };
  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
        md={4}
        className="my-5 flex justify-center  "
      >
        <Card
          className="min-w-60 p-3 shadow-sm rounded-2xl hover:bg-[#F8FAFD]"
          onClick={handleOpenproduct}
        >
          <CardMedia
            className="w-72 h-60 mx-auto p-5"
            component="img"
            image={`http://127.0.0.1:8000/storage/${props.product.photos[0]}`}
            alt="Paella dish"
          />
          <CardContent className="flex flex-col items-start gap-4">
            <Typography className="hover:underline cursor-pointer">
              {props.product.name}
            </Typography>
            <Rating
              name="read-only"
              value={props.product.rating_avg}
              readOnly
            />
          </CardContent>
          <CardActions className="flex justify-between">
            <Typography fontSize={"20px"}>$ {props.product.price}</Typography>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
