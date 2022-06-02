import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommonPaper from "../components/common/CommonPaper/CommonPaper";
import CommonButton from "../components/common/CommonButton/CommonButton";
import { requestSignup } from "../app/features/signup/signupSlice";
import { accountAddress, accountRegistered } from "../app/features/account/accountSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const userAccount = useSelector(accountAddress);
  const getIfUserIsRegistered = useSelector(accountRegistered);

  const singUpButton = companyId =>
    <CommonButton
      variant="contained"
      onClick={() => dispatch(requestSignup(companyId))}
      color='primary'
      disabled={getIfUserIsRegistered || !userAccount}
      sx={{ width: 200, marginLeft: "0px", marginTop: "0px" }}
    >
      Sign Up
    </CommonButton>;

  return (
    <Box>
      <Grid container spacing={1} >
        <Grid item xs={12} xl={5} sx={{ mt: 4, mb: 4, ml: 4, mr:4 }}>
          <CommonPaper
            title={"CocaCola"}
          >
            {singUpButton(0)}
          </CommonPaper>

        </Grid>
        <Grid item xs={12} xl={5} sx={{ mt: 4, mb: 4, ml: 4, mr:4 }}>
          <CommonPaper
            title={"Pepsi Co."}
          >
            {singUpButton(1)}
          </CommonPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;