import { Paper, styled } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  borderWidth: 0,
  borderRadius: 0,
  boxShadow: "none"
}));
