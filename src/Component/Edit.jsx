import { Typography, Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/usercontext";

export default function Edit() {
  const { user, updateProfile, updateimage } = useUser();

  const [username, setUsername] = useState(user?.username || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "http://127.0.0.1:8000/storage/" + user?.image || ""
  );

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("address", address);
    formData.append("phone", phone);

    await updateProfile(formData);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    await updateimage(formData);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Box className="h-full w-full flex justify-center items-center">
        <form
          onSubmit={handleImageSubmit}
          className="h-full w-[40%] self-center"
        >
          <Box className="m-10 bg-white shadow-md rounded-lg p-10 flex flex-col gap-10 items-center">
            {imagePreview && (
              <Box className=" flex justify-center items-center rounded-full h-52 w-52 overflow-hidden border-4 shadow-md border-white">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-full w-full object-cover "
                />
              </Box>
            )}
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/jpg,image/gif,image/svg"
              onChange={handleImageChange}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              className="bg-orange-400 font-medium text-lg rounded-full h-12"
              style={{ textTransform: "none" }}
            >
              Update Image
            </Button>
          </Box>
        </form>
        <form
          onSubmit={handleProfileSubmit}
          className="h-full w-[40%] self-center"
        >
          <Box className="m-10 bg-white shadow-md rounded-lg p-10 flex flex-col gap-10">
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              label="User name"
            />
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              label="Phone number"
            />
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              label="Address"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email"
              disabled
            />
            <TextField
              value={user?.role === 0 ? "Buyer 🛒" : "Seller 🤝"}
              disabled
              fullWidth
              label="Account"
            />
            <Button
              type="submit"
              variant="contained"
              className="bg-orange-400 font-medium  text-lg rounded-full  h-12"
              style={{ textTransform: "none" }}
            >
              Update Profile
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
