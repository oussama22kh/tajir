import { Typography, Box, TextField } from "@mui/material";
import { useUser } from "../contexts/usercontext";

export default function Profiledetail() {
  const { user } = useUser();

  return (
    <>
      <Box className="flex justify-center items-center w-screen h-full gap-10 self-center">
        <Box className="w-[30%] h-[60vh] bg-white shadow-md rounded-lg flex flex-col justify-between p-14 items-center">
          <Typography>Profile Detail </Typography>
          <Box className=" flex justify-center items-center rounded-full h-52 w-52 overflow-hidden border-4 shadow-md border-white">
            <img
              src={"http://127.0.0.1:8000/storage/" + user?.image}
              alt="profile photo"
              className="h-full w-full object-cover"
            />
          </Box>
          <Box className="flex flex-col items-center justify-between h-[20%]">
            <Typography className="text-black font-medium text-2xl cursor-default">
              {user?.username}
            </Typography>
            <Typography className="text-black text-sm">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Box className="w-[40%] h-[80%] bg-white shadow-md rounded-lg p-10 flex flex-col gap-10">
          <TextField
            value={user?.username}
            fullWidth
            label="User name"
            InputProps={{ readOnly: true }}
          />
          <TextField
            value={user.phone ? user.phone : ""}
            fullWidth
            label="Phone number"
            InputProps={{ readOnly: true }}
          />
          <TextField
            value={user.address ? user.address : ""}
            fullWidth
            label="Address"
            InputProps={{ readOnly: true }}
          />
          <TextField
            value={user?.email}
            fullWidth
            label="Email"
            InputProps={{ readOnly: true }}
          />
          <TextField
            value={user?.role === 0 ? "Buyer 🛒" : "Seller 🤝"}
            fullWidth
            label="Account"
            InputProps={{ readOnly: true }}
          />
        </Box>
      </Box>
    </>
  );
}
