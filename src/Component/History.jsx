import {
  Typography,
  List,
  Box,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
} from "@mui/material";
import { useUser } from "../contexts/usercontext";
import { useSeller } from "../contexts/sellercontext";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
export default function History() {
  const { orderhistory, user } = useUser();
  let orders = [];
  if (user.role === 1) {
    orders = useSeller().orders;
  }

  return (
    <>
      {user.role == 0 ? (
        <TableContainer className="flex justify-center shadow-sm rounded-xl">
          <Table aria-label="simple table" className="w-[90%]">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Qte</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Seller</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderhistory.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.qte}</TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">
                    {item.accepted === 0 ? (
                      <>
                        {item.rejected === 0 ? (
                          <PendingRoundedIcon className="text-yellow-400" />
                        ) : (
                          <HighlightOffRoundedIcon className="text-red-500" />
                        )}
                      </>
                    ) : (
                      <CheckCircleOutlineRoundedIcon className="text-green-500" />
                    )}
                  </TableCell>
                  <TableCell align="right">{item.seller_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer className="flex justify-center shadow-sm rounded-xl m-5">
          <Table aria-label="simple table" className="w-[90%]">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Qte</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Buyer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.qte}</TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">
                    {item.accepted === 0 ? (
                      <>
                        {item.rejected === 0 ? (
                          <PendingRoundedIcon className="text-yellow-400" />
                        ) : (
                          <HighlightOffRoundedIcon className="text-red-500" />
                        )}
                      </>
                    ) : (
                      <CheckCircleOutlineRoundedIcon className="text-green-500" />
                    )}
                  </TableCell>
                  <TableCell align="right">{item.buyer.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
