import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export const getAddress = async () => {
  let response;
  try {
    response = await axios({ method: "get", url: process.env.REACT_APP_FETCHING_SC_ADDRESS_FROM_REMOTE, headers });
    console.log("response axios: ", response);
  } catch (error) {
    console.log("project delete error", error);
  }

  return response.address;
};