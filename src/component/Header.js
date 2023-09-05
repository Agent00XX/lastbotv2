import React from 'react'

export const Header = () => {
    return (
            <div className="card bg-dark text-white d-flex">
                <img
                    src="/assets/Images/Logo.png"
                    className="card-img"
                    alt="Background"
                    style={{width: 100}}
                />
                <div className=" d-flex flex-column justify-content-center">
                    <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">
                            NEW SEASON ARRIVALS
                        </h5>
                        <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
                    </div>
                </div>
            </div>
    )
}
