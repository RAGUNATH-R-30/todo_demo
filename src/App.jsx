import { useState } from 'react'
import "/node_modules/bootstrap/dist/css/bootstrap.css"
import './App.css'
import Navbar from './navbar'
import Card from './card'

function App() {
  //States
  const [todolist, addtodo] = useState([])
  const [title, titlechange] = useState("")
  const [description, descriptionchange] = useState("")
  const [id, setcount] = useState(0)
  const [status, setstatus] = useState("not completed")
  const [completed, setcompleted] = useState([])
  const [notcompleted, setnotcompleted] = useState([])
  const [screenstate, setscreenstate] = useState("All")
  const [listtoedit, setlisttoedit] = useState([])
  const [todoeditbuttonstate, setbuttonstate] = useState(true)

  //This is the function adds the new todo list.
  let addlist = (content) => {
    if (content.title == "" || content.description == "") {
      alert("The todos not to be empty")
    }
    else {
      addtodo([...todolist, content])
      setcount(id + 1)
      titlechange("")
      descriptionchange("")
    }


  }

  //This is the function which executes on the title change.
  let titleonchange = (titlevalue) => {
    titlechange(titlevalue.target.value)
  }

  //This is the function which executes on the description change.
  let descriptiononchange = (descriptionvalue) => {
    descriptionchange(descriptionvalue.target.value)
  }

  //This is the function which executes on deleting the task.
  let deletetask = (list) => {
    const newlist = todolist.filter((item) => item.id !== list.id);
    addtodo(newlist)
  }

  //This executes during the status change.
  let changestatus = (change, list) => {
    setstatus(change)
    const changelist = todolist.map((item) => item.id == list.id ? list.status = change : "")
  }

  //This is the function which display the filtered result.
  let getstate = (state) => {
    if (state == "completed") {
      let completedlist = todolist.filter((item) => item.status == "completed")
      setcompleted(completedlist)
      setscreenstate("Completed")
    }
    else if (state == "not completed") {
      let notcompletedlist = todolist.filter((item) => item.status == "not completed")
      setnotcompleted(notcompletedlist)
      setscreenstate("Not Completed")
    }
    else {
      setscreenstate("All")
    }
  }

  //This is the function for editing the todo tasks.
  let editlist = (list) => {
    titlechange(list.title)
    descriptionchange(list.description)
    setlisttoedit(list)
  }

  //This is where the edited tasks gets updated.
  let updatelist = (list) => {
    let neweditedlist = todolist
    let index = neweditedlist.indexOf(list)
    neweditedlist[index] = { id: list.id, title: title, description: description, status: list.status }
    addtodo(neweditedlist)
    titlechange("")
    descriptionchange("")
    setbuttonstate(true)
  }

  //This updates the button state.
  let buttonstate = (state) => {
    setbuttonstate(state)
  }

  //This updates the edit cross button.
  let crossbutton = () => {
    setbuttonstate(true)
    titlechange("")
    descriptionchange("")
  }
  return (
    <>
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <h4 style={{ color: "#13ad89" }}>My todo</h4>
        <div>
          <input type="text" placeholder='TodoName' style={{ margin: 20, width: 300 }} onChange={titleonchange} value={title} />
          <input type="text" placeholder='Description' style={{ margin: 20, width: 300 }} onChange={descriptiononchange} value={description} />
          {
            todoeditbuttonstate ?
              <button type="button" className="btn btn-success" style={{ padding: 3, margin: "6px 10px", width: 150, backgroundColor: "#13ad89" }} onClick={() => addlist({ id: id, title: title, description: description, status: "not completed" })}>Add To do</button>
              :
              <span>
                <button type="button" className="btn btn-success" style={{ padding: 3, margin: "6px 10px", width: 150, backgroundColor: "#13ad89" }} onClick={() => updatelist(listtoedit)}>Edit</button>
                <button type="button" className='btn btn-primary' style={{ borderRadius: 100, fontSize: 14, backgroundColor: "#cf5e20", border: "none" }} onClick={() => crossbutton()}>X</button>
              </span>
          }
        </div>
      </div>

      <div className="container">
        <Navbar getstate={getstate} screenstate={screenstate} />
        <div className="row">
          {screenstate === "All" && (
            todolist.map((list, index) => (
              <Card list={list} key={index} deletetask={deletetask} changestatus={changestatus} editlist={editlist} updatelist={updatelist} buttonstate={buttonstate} />
            ))
          )}
          {screenstate === "Completed" && (
            completed.map((list, index) => (
              <Card list={list} key={index} deletetask={deletetask} changestatus={changestatus} editlist={editlist} updatelist={updatelist} buttonstate={buttonstate} />
            ))
          )}
          {screenstate === "Not Completed" && (
            notcompleted.map((list, index) => (
              <Card list={list} key={index} deletetask={deletetask} changestatus={changestatus} editlist={editlist} updatelist={updatelist} buttonstate={buttonstate} />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default App;
