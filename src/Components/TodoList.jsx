/* eslint-disable no-unused-vars */
import { useState } from "react"
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import { TbTriangleFilled } from "react-icons/tb";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";




function TodoList(){

    const [tasks,setTasks] = useState([]);
    const [newTask,setNewTask] = useState("");
    const [chars,setChars] = useState(Number);

    const toggleCheck = (index) => {
        const newTasks = [...tasks];

        newTasks[index].checked = !newTasks[index].checked;

        const [task] = newTasks.splice(index,1);

        if(task.checked)
        {
            newTasks.push(task);
        }
        else
        {
            newTasks.unshift(task);
        }

        setTasks(newTasks);
    };

    function handleInputChange(event){
        const NewTask = event.target.value;
        setNewTask(NewTask);
        setChars(NewTask.length);
    }

    function addTask() {
        if (newTask.trim() !== "" && newTask.length <= 130) {
            setTasks(currentTasks => [...currentTasks, { text: newTask, checked: false }]);
            setNewTask("");
            setChars(0);
        }
        setNewTask("");
        setChars(0);
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_,i) => i!== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index-1]] =
            [updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index+1]] =
            [updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
    <div className = "to-do-list">
        <h1>To-Do List</h1>
        <div>
            <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
            />
            <button
            className={chars>130? "add-button-error add-button" : "add-button"}
            onClick={addTask}
            disabled={chars > 130}
            >
                Add
            </button>
        </div>
            <div className="char-counter" style={{color: chars > 130? "red" : "white"}}>
                <h2>{chars} / 130</h2>
            </div>

        <ol>
            {tasks.map((task,index) =>
                <li key={index}>
                    {task.checked ? <ImCheckboxChecked color="green" onClick={() => toggleCheck(index)}/> : <ImCheckboxUnchecked onClick={() => toggleCheck(index)}/>}
                    <span className={task.checked? "task-checked text" : "text"}>{task.text}</span>
                    <button
                    className="move-button"
                    onClick={() => moveTaskUp(index)}
                    ><TbTriangleFilled  style={{verticalAlign:"middle"}}/></button>
                    <button
                    className="move-button"
                    onClick={() => moveTaskDown(index)}
                    ><TbTriangleInvertedFilled  style={{verticalAlign:"middle"}}/></button>
                    <div className="vertical-line">
                        <hr></hr>
                    </div>
                    <button
                    className="delete-button"
                    onClick={() => deleteTask(index)}
                    ><FaTrashCan style={{verticalAlign:"middle"}}/></button>
                </li>
            )}
        </ol>
    </div>)
}

export default TodoList