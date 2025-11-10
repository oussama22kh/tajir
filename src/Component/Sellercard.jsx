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
import { getStorageUrl } from "../config/api.js";

export default function Sellercard(props) {
  const { setOpenproduct, getproduct } = useSeller();
  const handleOpenproduct = () => {
    setOpenproduct(true);
    getproduct(props.product.id);
  };
  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="my-5 flex justify-center"
      >
        <Card
          className="w-full max-w-sm p-3 shadow-md rounded-2xl hover:bg-[#F8FAFD] cursor-pointer"
          onClick={handleOpenproduct}
        >
          <CardMedia
            className="w-full h-48 sm:h-56 md:h-60 mx-auto p-3 sm:p-5 object-contain"
            component="img"
            image={getStorageUrl(props.product.photos[0])}
            alt="Product image"
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
            <Typography fontSize={"20px"}>{props.product.price} DA</Typography>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
