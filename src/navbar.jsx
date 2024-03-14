import React, { useState } from 'react'
import "/node_modules/bootstrap/dist/css/bootstrap.css"
function Navbar({getstate,screenstate}) {

    const [dropdowntoggle, dropdown] = useState(false)
    return (
        <div>
            <span style={{ display: "flex", justifyContent: "space-between" }}>My Todos: <span>Status Filter:
                <div className="btn-group">
                    <button type="button" className={`btn btn-danger dropdown-toggle ${dropdowntoggle ? "show" : ""}`} data-bs-toggle="dropdown" aria-expanded="false"style={{ padding:3,margin:"6px 10px",opacity:0.7,fontSize:14,width:120}} onClick={() => dropdown(!dropdowntoggle)}>
                        {screenstate}
                    </button>
                    <ul className={`dropdown-menu ${dropdowntoggle ? "show" : ""}`} style={dropdowntoggle ? { position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: "translate3d(0px, 40px, 0px)" } :{} }>
                        <li><a className="dropdown-item" onClick={()=>{getstate("all");dropdown(false)}}>All</a></li>
                        <li><a className="dropdown-item"onClick={()=>{getstate("completed");dropdown(false)}} >Completed</a></li>
                        <li><a className="dropdown-item"onClick={()=>{getstate("not completed");dropdown(false)}} >Not Completed</a></li>
                    </ul>
                </div>
            </span>
            </span>
        </div>

    )
}

export default Navbar;