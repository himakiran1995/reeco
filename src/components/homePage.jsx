import React, { useState, useEffect } from "react";
import "../page.css";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetailsRequest, setModalStatusAndActiondata, updateOrderDetailsRequest } from "./../store/actions";
import ModalComponent from "./modal";

const HomePage = () => {

    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state?.ordersReducer?.orderDetailsData);
    const [searchKey, setSearchKey] = useState('')
    useEffect(() => {
        dispatch(getOrderDetailsRequest())
    }, [])

    const handleSearch = (e) => {
        setSearchKey(e.target.value)
    }

    const totalBill = orderDetails.map(x => x.price * x.quantity).reduce((total, currentValue) => total + currentValue, 0)
    const filteredOrders = (searchKey && searchKey !== '') ? orderDetails.filter(x => (x.productName.toLowerCase().includes(searchKey.toLowerCase()) || (x.brandName.toLowerCase().startsWith(searchKey.toLowerCase())))) : orderDetails;

    console.log('orderDetails', orderDetails, totalBill);
    const getstatusButton = (status) => {
        switch (status) {
            case 'APPROVED':
                return <button style={{ backgroundColor: "#32bf40", borderRadius: "16px", color: 'white', fontSize: '14px', border: 'none' }}>Approved</button>
            case 'PRICE UPDATED':
                return <button style={{ backgroundColor: "#32bf40", borderRadius: "16px", color: 'white', fontSize: '14px', border: 'none' }}>Price Updated</button>
            case 'QUANTITY UPDATED':
                return <button style={{ backgroundColor: "#32bf40", borderRadius: "16px", color: 'white', fontSize: '14px', border: 'none' }}>Quantity Updated</button>
            case 'PRICE AND QUANTITY UPDATED':
                return <button style={{ backgroundColor: "#32bf40", borderRadius: "16px", color: 'white', fontSize: '14px', border: 'none' }}>Price and Quantity Updated</button>
            case 'MISSING':
                return <button style={{ backgroundColor: "#d57a2f", borderRadius: "16px", color: 'white', fontSize: '14px', border: 'none' }}>Missing</button>
            case 'MISSING URGENT':
                return <button style={{ backgroundColor: "#eb1212", borderRadius: "16px", color: 'white', fontSize: '14px', border: 'none' }}>Missing Urgent</button>
            default: return <></>
        }
    }
    return (
        <>
            <div className="topnav">
                <a href="#" style={{ fontStyle: "serif", fontSize: "25px" }}>Reeco</a>
                <a href="#">Store</a>
                <a href="#">Orders</a>
                <a href="#">Analytics</a>
                <a href="#" style={{ float: "right" }}> Hello,James<i className="fa fa-solid fa-v"></i> </a>
                <a href="#" style={{ float: "right" }}> <i className="fa fa-shopping-cart" ></i> </a>
            </div>
            <div className="navDetails">
                <h1 style={{ fontSize: "14px", color: "grey" }}>Orders &gt; Order32457ABC</h1>
                <div className="orderDetails">
                    <div>
                        <h1 style={{ fontSize: "24px", fontStyle: 'bold' }}>Order32457ABC</h1>
                    </div>
                    <div >
                        <button className="button1">Back</button>
                        <button className="button2">Approve Order</button>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="infobar">
                    <div className="infoElement">
                        <h1 className="infoElementHeading" >Supplier</h1>
                        <p className="infoElementBody">East Coast fruits & vegetables</p>
                    </div>
                    <div class="vl"></div>
                    <div className="infoElement">
                        <h1 className="infoElementHeading" >Shipping date</h1>
                        <p className="infoElementBody">Thu, FEB 10</p>
                    </div>
                    <div class="vl"></div>
                    <div className="infoElement">
                        <h1 className="infoElementHeading" >Total</h1>
                        <p className="infoElementBody">{totalBill}</p>
                    </div>
                    <div class="vl"></div>
                    <div className="infoElement">
                        <h1 className="infoElementHeading" >category</h1>
                        <p className="infoElementBody">FMCG</p>
                    </div>
                    <div class="vl"></div>
                    <div className="infoElement">
                        <h1 className="infoElementHeading" >Department</h1>
                        <p className="infoElementBody">300-444-678</p>
                    </div>
                    <div class="vl"></div>
                    <div className="infoElement">
                        <h1 className="infoElementHeading" >Status</h1>
                        <p className="infoElementBody">Awaiting your approval</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="searchTab" >
                    <input className="search" placeholder="Search" onChange={(e) => { handleSearch(e) }}></input>
                    <div>
                        <button className="button1">Add Item</button>
                        <i className="fa fa-print"></i>
                    </div>
                </div>
                <table>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                    {
                        filteredOrders?.map(x => {
                            return (
                                <React.Fragment>
                                    <tr>
                                        <td>{x.productName}</td>
                                        <td>{x.brandName}</td>
                                        <td>{`${x.price}/6*1LB`}</td>
                                        <td>{`${x.quantity}x6*1LB`}</td>
                                        <td>{x.price*x.quantity}</td>
                                        {/* <td>{getstatusButton(x.status)}<i className="fa fa-check" onClick={() => { dispatch(updateOrderDetailsRequest({ ...x, status: 'APPROVED' })) }} /><i className="fa fa-times" onClick={() => { dispatch(setModalStatusAndActiondata(x, true, 'ApprovalStatus')) }} />  Edit</td> */}
                                        <td>
                                            <div className="statusColumn">
                                                <div>{getstatusButton(x.status)}</div>
                                                <div>
                                                    <i className="fa fa-check" onClick={() => { dispatch(updateOrderDetailsRequest({ ...x, status: 'APPROVED' })) }} />
                                                    <i className="fa fa-times" onClick={() => { dispatch(setModalStatusAndActiondata(x, true, 'ApprovalStatus')) }} />
                                                    <span onClick={() => { dispatch(setModalStatusAndActiondata(x, true, 'edit')) }}> Edit</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }

                </table>
            </div>
            <ModalComponent />

        </>
    );
};

export default HomePage;
