import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { SHIPMENT_ENDPOINT } from "../endpoints";

const slice = createSlice({
    name: "shipment",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        shipmentRequested: (shipment, action) => {
            shipment.loading = true;
        },
        shipmentReceived: (shipment, action) => {
            if (Array.isArray(action.payload)) {
                shipment.list = action.payload;
              } else {
                shipment.list = [];
              }
              shipment.loading = false;
              shipment.lastFetch = Date.now();
        },
        shipmentRequestFailed: (shipment, action) => {
            shipment.loading = false;
        },
        shipmentAdded: (shipment, action) => {
            shipment.list.push(action.payload);
        },
        shipmentUpdated: (shipment, action) => {
            const index = shipment.list.findIndex((shipment) => shipment._id === action.payload._id);
            if (index !== -1) {
                shipment.list[index] = action.payload;
            }
        },
        shipmentDeleted: (shipment, action) => {
            shipment.list = shipment.list.filter((shipment) => shipment._id !== action.payload);
        }
    }
});

export const {
    shipmentAdded,
    shipmentReceived,
    shipmentUpdated,
    shipmentRequested,
    shipmentDeleted,
    shipmentRequestFailed
} = slice.actions;

// Action Creator
export const loadShipment = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url:SHIPMENT_ENDPOINT+'/listnotDelivred', // backend API url
            onStart: shipmentRequested.type,
            onSuccess: shipmentReceived.type,
            onError: shipmentRequestFailed.type
          
        })
    );
};
const handleMyMissionResponse = (response, dispatch) => {
    console.log(response);
    dispatch(shipmentReceived(response));
  };
  
  export const getMyMission = id => dispatch => {
    dispatch(
      apiCallBegan({
        url: SHIPMENT_ENDPOINT+`/MyMission/${id}`,
        onStart: shipmentRequested.type,
        onSuccess: response => handleMyMissionResponse(response, dispatch), // Pass dispatch as a parameter
        onError: shipmentRequestFailed.type
      })
    );
  };

export const addShipment = shipment => apiCallBegan({
    url: SHIPMENT_ENDPOINT+'/addnewShipment',
    method: "post",
    data: shipment,
    onSuccess: shipmentAdded.type
});

export const updateShipment = shipment => apiCallBegan({
    url: SHIPMENT_ENDPOINT+`/makeEndOfMission/${shipment._id}`,
    method: "put",
    data: shipment,
    onSuccess: shipmentUpdated.type
});

export const deleteShipment = shipment => apiCallBegan({
    url:SHIPMENT_ENDPOINT+ `/${shipment._id}`,
    method: "delete",
    data: shipment,
    onSuccess: shipmentDeleted.type
});

export default slice.reducer;
