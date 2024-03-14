import React from 'react'
import { useState } from 'react'
import "/node_modules/bootstrap/dist/css/bootstrap.css"
function Card({ list, deletetask, changestatus }) {

    const [dropdowntoggle, dropdown] = useState(false)
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card" style={{ width: "300px", backgroundColor: "#ccf5d3" }}>
                <div className="card-body">
                    <p className="card-text">Name:{list.title}</p>
                    <p className="card-text">Description:{list.description}</p>
                    <span>Status:<div className="btn-group">
                        <button type="button" className={`btn dropdown-toggle ${dropdowntoggle ? "show" : ""}`} data-bs-toggle="dropdown" aria-expanded="false" style={{ padding: 2, marginLeft: 8, backgroundColor: `${list.status == "completed" ? "#4ea87a" : "#d76e6f"}`, opacity: 1, width: 120, fontSize: 14, color: "white" }} onClick={() => dropdown(!dropdowntoggle)}>
                            {list.status == "completed" ? "Completed" : "Not Completed"}
                        </button>
                        <ul className={`dropdown-menu ${dropdowntoggle ? "show" : ""}`} style={dropdowntoggle ? { position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: "translate3d(0px, 40px, 0px)" } : {}}>
                            <li><a className="dropdown-item" onClick={() => {
                                changestatus("completed", list)
                                dropdown(false)
                            }} >Completed</a></li>
                            <li><a className="dropdown-item" onClick={() => {
                                changestatus("not completed", list)
                                dropdown(false)
                            }} >Not Completed</a></li>
                        </ul>
                    </div></span>
                    <span style={{ display: 'flex', justifyContent: "end" }}>
                        <button type="button" className="btn btn-success" style={{ padding: 3, margin: "6px 10px", opacity: 0.7, width: 80 }}>Edit</button>
                        <button type="button" className="btn btn-danger" style={{ padding: 3, margin: "6px 10px", opacity: 0.7, width: 80 }} onClick={() => deletetask(list)}>Delete</button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card