import { Typography, Box, Rating, ListItem } from "@mui/material";

export default function Review({ props }) {
  console.log(props);
  return (
    <>
      <ListItem className="shadow-sm rounded-xl flex flex-col items-start px-10 py-5">
        <Box className="flex gap-5 items-center">
          <Box className="rounded-full h-10 w-10 flex justify-center items-center">
            <img
              src={"http://127.0.0.1:8000/storage/" + props?.image}
              alt="profile"
              className="h-[90%] w-[90%] object-cover rounded-full"
            />
          </Box>
          <Typography>{props?.username}</Typography>
        </Box>
        <Box className="w-full flex my-5 justify-between">
          <Typography>{props?.content}</Typography>
         <Box className="flex gap-5"> <Typography>{props?.rating}.0</Typography> <Rating readOnly value={props?.rating} /></Box>
        </Box>
      </ListItem>
    </>
  );
}
