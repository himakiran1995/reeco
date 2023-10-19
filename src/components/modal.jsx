import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import "../page.css";

import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { setModalStatusAndActiondata, updateOrderDetailsRequest } from '../store/actions';
function ModalComponent() {
    const dispatch = useDispatch()
    const reasons = [{ label: "Missing Product", id: 1 }, { label: "Quantity is not same", id: 2 }, { label: "Price is not same", id: 3 }, { label: "others", id: 4 }]

    const modalStatus = useSelector(state => state?.ordersReducer?.modalStatus);
    const modalActionData = useSelector(state => state?.ordersReducer?.modalActionData);
    const modalType = useSelector(state => state?.ordersReducer?.modalType);
    
    const [counter, setCounter] = useState(0)
    const [price, setPrice] = useState(modalActionData?.price || 0)
    const [selectedRreason, setSelectedReason] = useState(0)

    const handleApproval = (updatedStatus) => {
        const modalActionDataC = { ...modalActionData, status: updatedStatus }
        console.log('handleApproval', modalActionDataC);
        dispatch(updateOrderDetailsRequest(modalActionDataC))
    }

    const handleIncrement = () => {
        setCounter(counter + 1)
    }
    const handleDecrement = () => {
        if (counter > 0)
            setCounter(counter - 1)
    }
    
    useEffect(() => {
        modalActionData?.quantity && setCounter(modalActionData?.quantity)
        modalActionData?.price && setPrice(modalActionData?.price)
    }, [modalActionData])
    
    const handleUpdate = () => {
        const modalActionDataC = {
            ...modalActionData,
            price: +price, quantity: +counter,
            status: (modalActionData?.quantity !== counter && modalActionData?.price !== price) ? 'PRICE AND QUANTITY UPDATED' : (modalActionData?.quantity !== counter && modalActionData?.price === price) ? 'QUANTITY UPDATED' : (modalActionData?.quantity === counter && modalActionData?.price !== price) ? 'PRICE UPDATED' : modalActionData.status
        }
        console.log('handleApproval', modalActionDataC);
        dispatch(updateOrderDetailsRequest(modalActionDataC))
    }
    
    return (
        <div>

            <Modal isOpen={modalStatus && modalActionData} >
                {modalType === 'ApprovalStatus' ? <>
                    <div style={{ textAlign: "right" }} onClick={() => dispatch(setModalStatusAndActiondata(undefined, false, ''))}>X</div>
                    <ModalHeader >Missing Product</ModalHeader>
                    <ModalBody>
                        {`is ${modalActionData.productName} urgent ?`}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => handleApproval('MISSING')} >
                            No
                        </Button>{' '}
                        <Button color="primary" onClick={() => handleApproval('MISSING URGENT')}>
                            Yes
                        </Button>
                    </ModalFooter>
                </> : modalType === 'edit' ? <div style={{ margin: "16px" }}>
                    <div style={{ textAlign: "right" }} onClick={() => dispatch(setModalStatusAndActiondata(undefined, false, ''))}>X</div>
                    <div >
                        <h1 style={{ fontSize: "18px", fontWeight: "500" }}>{modalActionData.productName}</h1>
                        <p style={{ fontSize: "14px" }}>{modalActionData.brandName}</p>
                    </div>
                    <hr />
                    <div className="">
                        <div className="infobar">
                            <div className="infoElement">
                                <img src="https://picsum.photos/id/237/200/300" alt='' style={{ height: "100px", width: "100px", margin: "10px" }} />
                            </div>
                            <div className="infoElement">
                                <h1 className="infoElementHeading1" >Price($) :</h1>
                                <h1 className="infoElementHeading1" >Quantity :</h1>
                                <h1 className="infoElementHeading1" >Total :</h1>
                            </div>
                            <div className="infoElement">
                                <div>
                                    <input style={{ width: "80px", borderRadius: "4px" }} value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div>
                                    <h1 className="infoElementHeading" >
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                        }}>
                                            <button style={{
                                                fontSize: '60%',
                                                position: 'relative',
                                                marginRight: '5px',
                                                backgroundColor: 'green',
                                                borderRadius: '65%',
                                                color: 'white',
                                                height: "20px"
                                            }}
                                                onClick={() => { handleIncrement() }}>+</button>
                                            <div>
                                                <input style={{ width: "40px", borderRadius: "4px" }} value={counter} />
                                            </div>
                                            <button style={{
                                                fontSize: '60%',
                                                position: 'relative',
                                                marginLeft: '5px',
                                                backgroundColor: 'green',
                                                borderRadius: '65%',
                                                color: 'white',
                                                height: "20px"
                                            }}
                                                onClick={() => { handleDecrement() }}>-</button>
                                        </div>
                                    </h1>
                                </div><p>s</p>
                                <h1 className="infoElementHeading" >{price * counter}</h1>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div style={{ fontStyle: "bold", fontSize: "18px" }}>Choose Reason :<span style={{ color: 'GrayText', fontSize: "12px" }}>{'(optional)'}</span></div>
                            {reasons.map(x => { return (<button key={x.id} className={x.id === selectedRreason ? 'reasonButtonsSelected' : 'reasonButtons'} onClick={() => setSelectedReason(x.id)}>{x.label}</button>) })}
                        </div>
                        <div style={{ margin: "6px" }} >
                            <div className="modalButtons">
                                <div >
                                    <button className="button4" onClick={() => dispatch(setModalStatusAndActiondata(undefined, false, ''))}>Cancel</button>
                                    <button className="button2" onClick={() => { handleUpdate() }}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <></>
                }
            </Modal>
        </div>
    );
}

export default ModalComponent;
