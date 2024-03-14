import { useState } from 'react'
import "/node_modules/bootstrap/dist/css/bootstrap.css"
import './App.css'
import Navbar from './navbar'
import Card from './card'

function App() {
  const [todolist, addtodo] = useState([])
  const [title, titlechange] = useState("")
  const [description, descriptionchange] = useState("")
  const [id, setcount] = useState(0)
  const [status, setstatus] = useState("not completed")
  const [completed, setcompleted] = useState([])
  const [notcompleted, setnotcompleted] = useState([])
  const [screenstate, setscreenstate] = useState("All")
  let addlist = (content) => {
    addtodo([...todolist, content])
    setcount(id + 1)
  }

  let titleonchange = (titlevalue) => {
    titlechange(titlevalue.target.value)
  }
  let descriptiononchange = (descriptionvalue) => {
    descriptionchange(descriptionvalue.target.value)
  }
  let deletetask = (list) => {
    const newlist = todolist.filter((item) => item.id !== list.id);
    addtodo(newlist)
  }

  let changestatus = (change, list) => {
    setstatus(change)
    const changelist = todolist.map((item) => item.id == list.id ? list.status = change : "")
    // console.log(changelist)
    // console.log(todolist)
    // addtodo(changelist)
    // setstatus(changelist)
  }

  let getstate = (state) => {
    if (state == "completed") {
      let completedlist = todolist.filter((item) => item.status == "completed")
      setcompleted(completedlist)
      setscreenstate("Completed")
      // console.log([...completed])
    }
    else if(state == "not completed") {
      let notcompletedlist = todolist.filter((item) => item.status == "not completed")
      setnotcompleted(notcompletedlist)
      setscreenstate("Not Completed")
      // console.log([...notcompletedlist])
    }
    else{
      setscreenstate("All")
    }
  }


  return (
    <>
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <h3 style={{ color: "green" }}>Todo</h3>
        <div>
          <input type="text" placeholder='TodoName' style={{ margin: 20, width: 400 }} onChange={titleonchange} />
          <input type="text" placeholder='Description' style={{ margin: 20, width: 400 }} onChange={descriptiononchange} />
          <button type="button" className="btn btn-success" style={{ padding: 3, margin: "6px 10px", opacity: 0.7, width: 100 }} onClick={() => addlist({ id: id, title: title, description: description, status: "not completed" })}>Add To do</button>
        </div>
      </div>

      <div className="container">
        <Navbar getstate={getstate}  screenstate={screenstate}/>
        <div className="row">
          {screenstate === "All" && (
            todolist.map((list, index) => (
              <Card list={list} key={index} deletetask={deletetask} changestatus={changestatus} />
            ))
          )}
          {screenstate === "Completed" && (
            completed.map((list, index) => (
              <Card list={list} key={index} deletetask={deletetask} changestatus={changestatus} />
            ))
          )}
          {screenstate === "Not Completed" && (
            notcompleted.map((list, index) => (
              <Card list={list} key={index} deletetask={deletetask} changestatus={changestatus} />
            ))
          )}
        </div>
      </div>


    </>
  )
}

export default App
