import * as types from './actionTypes';
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

const initialState = {
    orderDetailsData: [],
    modalStatus: false,
    modalActionData: null,
    modalType: ''
}

const ordersReducer = (state = initialState, action) => {
    let undefinedData;
    switch (action.type) {
        case types.GET_ORDER_DETAILS_REQUEST:
            state = {
                ...state,
                orderDetailsData: [
                    {
                        id: 1,
                        productName: "Chicken Breat Fillets, Boneless matuuma marinated 6 ounce raw,Invivid 1",
                        brandName: "Hormel Black Labelmany1",
                        price: 20,
                        quantity: 7,
                        status: "MISSING URGENT"
                    }, {
                        id: 2,
                        productName: "Chicken Breat Fillets, Boneless matuuma marinated 6 ounce raw,Invivid 2",
                        brandName: "Hormel Black Labelmany2",
                        price: 25,
                        quantity: 5,
                        status: "MISSING"
                    }, {
                        id: 3,
                        productName: "Chicken Breat Fillets, Boneless matuuma marinated 6 ounce raw,Invivid 3",
                        brandName: "Hormel Black Labelmany3",
                        price: 12,
                        quantity: 8,
                        status: "PRICE AND QUANTITY UPDATED"
                    }, {
                        id: 4,
                        productName: "Chicken Breat Fillets, Boneless matuuma marinated 6 ounce raw,Invivid 4",
                        brandName: "Hormel Black Labelmany4",
                        price: 20,
                        quantity: 5,
                        status: "NONE"
                    }, {
                        id: 5,
                        productName: "Chicken Breat Fillets, Boneless matuuma marinated 6 ounce raw,Invivid 5",
                        brandName: "Hormel Black Labelmany5",
                        price: 25,
                        quantity: 5,
                        status: "NONE"
                    }, {
                        id: 6,
                        productName: "Chicken Breat Fillets, Boneless matuuma marinated 6 ounce raw,Invivid 6",
                        brandName: "Hormel Black Labelmany6",
                        price: 100,
                        quantity: 3,
                        status: "NONE"
                    }, {
                        id: 7,
                        productName: "Chicken Breat Fillets, Boneless matuuma marinated 6 ounce raw,Invivid 7",
                        brandName: "Hormel Black Labelmany7",
                        price: 120,
                        quantity: 2,
                        status: "NONE"
                    },

                ]
            }
            break;
        case types.SET_MODAL_STATUS_AND_ACTION_DATA:
            const { modalActionData, modalStatus, modalType } = action.payload
            state = {
                ...state,
                modalStatus: modalStatus,
                modalActionData: modalActionData,
                modalType: modalType
            }
            break;
        case types.UPDATE_ORDER_DETAILS_REQUEST: {
            let index = state.orderDetailsData.findIndex(x => x.id === action.payload.id)
            console.log('index_update', index, action.payload);
            state = {
                ...state,
                orderDetailsData: [
                    ...state.orderDetailsData,
                    // state.orderDetailsData[index] = action.payload
                ],
                modalStatus: false,
                modalActionData: undefinedData,
                modalType: ''
            }
            state.orderDetailsData[index] = {...action.payload}
        }
            break;
        default:
            state = {
                ...state
            }
            break;

    }
    return state
}
const rootReducer = combineReducers({
    ordersReducer
})

const store = configureStore(
    { reducer: rootReducer }
)
export default store;
