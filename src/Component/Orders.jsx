import { useEffect } from "react";
import { useSeller } from "../contexts/sellercontext";
import {
  Typography,
  List,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  IconButton,
  Box,
} from "@mui/material";
import Order from "./Order";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";

export default function Orders() {
  const { waitingOrders, rejecttorder, accepetorder } = useSeller();

  const orders = waitingOrders?.orders || [];
 
  return (
    <>
      {orders.length == 0 ? (
        <Box className="h-[50vh] flex justify-center items-center w-[50vh]">
          <Typography>No orders</Typography>
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Buyer Name</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="left">Phone</TableCell>

                  <TableCell align="right">Response</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((item, index) => {
                  const handleaccept = () => {
                    accepetorder(item.id);
                  };
                  const handlereject = () => {
                    rejecttorder(item.id);
                  };
                  return (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="left">{item.buyer.username}</TableCell>
                      <TableCell align="left">{item.buyer.phone}</TableCell>

                      <TableCell align="right">
                        <IconButton onClick={handleaccept}>
                          <CheckCircleOutlineRoundedIcon className="text-green-500" />
                        </IconButton>
                        <IconButton onClick={handlereject}>
                          <HighlightOffRoundedIcon className="text-red-500" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
