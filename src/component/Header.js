import React from 'react'

export const Header = () => {
    return (
            <div className="lcb_card bg-dark text-white d-flex">
                <img
                    src="/assets/Images/Logo.png"
                    className="lcb_card-img"
                    alt="Background"
                    style={{width: 100}}
                />
                <div className="lcb_ d-flex flex-column justify-content-center">
                    <div className="lcb_container">
                        <h5 className="lcb_card-title display-3 fw-bolder mb-0">
                            NEW SEASON ARRIVALS
                        </h5>
                        <p className="lcb_card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
                    </div>
                </div>
            </div>
    )
}
