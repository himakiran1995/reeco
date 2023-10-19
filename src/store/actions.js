import * as types from './actionTypes';

export const getOrderDetailsRequest = () => ({
    type: types.GET_ORDER_DETAILS_REQUEST
});
export const updateOrderDetailsRequest = (orderDetails) => ({
    type: types.UPDATE_ORDER_DETAILS_REQUEST,
    payload: orderDetails
});
export const setModalStatusAndActiondata = (modalActionData, modalStatus, modalType) => ({
    type: types.SET_MODAL_STATUS_AND_ACTION_DATA,
    payload: {modalActionData, modalStatus, modalType}
});