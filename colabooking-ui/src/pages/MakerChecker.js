import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommonPaper from "../components/common/CommonPaper/CommonPaper";
import CommonButton from "../components/common/CommonButton/CommonButton";
import CommonSelect from "../components/common/CommonSelect/CommonSelect";
import { fetchCocacolaPendingAddresses, fetchPepsiPendingAddresses, approvePendingAddress, cocacolaPendingAddresses, pepsiPendingAddresses } from "../app/features/makerchecker/makercheckerSlice";
import { accountIsAdmin } from "../app/features/account/accountSlice";

const MakerChecker = () => {
  const [cocacolaAddress, setCocacolaAddress] = useState(0);
  const [pepsiAddress, setPepsiAddress] = useState(0);

  const dispatch = useDispatch();
  const pepsiPendingAddressesList = useSelector(pepsiPendingAddresses);
  const cocacolaPendingAddressesList = useSelector(cocacolaPendingAddresses);
  const getIfUserIsAdmin = useSelector(accountIsAdmin);

  useEffect(() => {
    dispatch(fetchCocacolaPendingAddresses());
    dispatch(fetchPepsiPendingAddresses());
  }, []);

  const handleChange = (event, companyId) => {
    if (companyId) {
      setPepsiAddress(event.target.value);
    } else {
      setCocacolaAddress(event.target.value);
    }
  };

  const triggerApproveUser = (companyId) => {
    if (companyId) {
      const address = pepsiPendingAddressesList[pepsiAddress];
      dispatch(approvePendingAddress({ companyId, address }));
    } else {
      const address = cocacolaPendingAddressesList[cocacolaAddress];
      dispatch(approvePendingAddress({ companyId, address }));
    }
  };

  const makerCheckerPaper = (addressIndex, handleChange, list, companyId) =>
    <Box>
      <CommonSelect
        title='Address To Approve'
        value={addressIndex}
        handleChange={(e) => handleChange(e, companyId)}
        items={list}
        disabled={list.length === 0}
      />
      <CommonButton
        variant="contained"
        onClick={() => triggerApproveUser(companyId)}
        color='primary'
        disabled={list.length === 0 || !getIfUserIsAdmin}
        sx={{ width: 200, marginLeft: "10px", marginTop: "10px" }}
      >
        Approve
      </CommonButton>
    </Box>;

  return (
    <Box>
      <Grid container spacing={1} >
        <Grid item xs={12} xl={5} sx={{ mt: 4, mb: 4, ml: 4, mr:4 }}>
          <CommonPaper
            title={"CocaCola"}
          >
            {makerCheckerPaper(cocacolaAddress, handleChange, cocacolaPendingAddressesList, 0, )}
          </CommonPaper>
        </Grid>
        <Grid item xs={12} xl={5} sx={{ mt: 4, mb: 4, ml: 4, mr:4 }}>
          <CommonPaper
            title={"Pepsi Co."}
          >
            {makerCheckerPaper(pepsiAddress, handleChange, pepsiPendingAddressesList, 1,)}
          </CommonPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MakerChecker;