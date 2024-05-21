import { useSeller } from "../contexts/sellercontext";
import { Typography, ListItem ,Box} from "@mui/material";

export default function Orders({ order }) {
  console.log(order);

  return (
    <>
      <ListItem>
        <Box className="w-full flex justify-between">
          <Typography>{order.name}</Typography>
          <Typography>{order.buyer.username}</Typography>
          <Typography>{order.buyer.phone}</Typography>
        </Box>
      </ListItem>
    </>
  );
}
