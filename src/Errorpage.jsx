import { useRouteError } from "react-router-dom";
import svg from "./assets/404-page-not-found-1-24.svg";
import { Container, Typography } from "@mui/material";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <Container maxWidth="sm">
        <img src={svg} alt="error" />
      </Container>
    </>
  );
}
