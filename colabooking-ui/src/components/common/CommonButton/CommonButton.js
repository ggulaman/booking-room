import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CommonButton = ({ id, children, color, disabled, size, variant, sx, onClick }) => {
  return (
    <Button
      id={id}
      color={color}
      disabled={disabled}
      size={size}
      variant={variant}
      sx={sx}
      onClick={onClick}
    >
      <Typography
        component="h5"
        variant="h8"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default CommonButton;