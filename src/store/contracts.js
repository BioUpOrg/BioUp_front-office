import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = "/contract/getAllContracts";
const slice = createSlice({
  name: "contracts",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    ContractsRequested: (contracts, action) => {
      contracts.loading = true;
    },

    populateContracts(state, action) {
      state.contracts = action.payload;
    },
    ContractsReceived: (contracts, action) => {
      if (Array.isArray(action.payload)) {
        contracts.list = action.payload;
      } else {
        contracts.list = [];
      }
      contracts.loading = false;
      contracts.lastFetch = Date.now();
    },

    contractsRequestFailed: (contracts, action) => {
      contracts.loading = false;
    },

    contractAdded: (contracts, action) => {
      contracts.list.push(action.payload);
    },


      contractsUpdated: (contracts, action) => {
        const index = contracts.list.findIndex((contract) => contract._id === action.payload._id);
        if (index !== -1) {
          contracts.list[index] = action.payload;
        }
      },
    contractDeleted: (contracts, action) => {
      contracts.list = contracts.list.filter((contract) => contract._id !== action.payload);
    },


  }
});

export const {
    contractAdded,
    ContractsReceived,
    contractsUpdated,
    populateContracts,
    ContractsRequested,
    contractsRequestFailed,
    contractDeleted

} = slice.actions;
export default slice.reducer;



export const getContracts = () =>
  apiCallBegan({
       url,
    method: "get",
    onStart: ContractsRequested.type,
    onSuccess: ContractsReceived.type,
    onError: contractsRequestFailed.type
  });

 



export const acceptContract = (id) =>{
  return apiCallBegan({
    url: `/contract/acceptContract/${id}`,
    method: "put",
    onSuccess:contractsUpdated.type,   
    onError: contractsRequestFailed.type,
  });
}





