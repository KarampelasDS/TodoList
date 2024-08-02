/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";

// Images
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";

function TodoList() {
    const [cookies, setCookie] = useCookies(['user']);
    
    // Initialize tasks from cookies
    const initialTasks = () => {
        try {
            if (cookies.user) {
                // Check if cookie is a string and parse it, else use it directly
                const cookieData = typeof cookies.user === 'string' ? JSON.parse(cookies.user) : cookies.user;
                if (Array.isArray(cookieData)) {
                    return cookieData;
                } else {
                    console.log("Cookie data is not an array.");
                }
            }
        } catch (error) {
            console.error("Error parsing tasks from cookies:", error);
        }
        return [];
    };

    const [tasks, setTasksState] = useState(initialTasks);
    const [newTask, setNewTask] = useState("");
    const [chars, setChars] = useState(0);

    // Save tasks to cookies
    const saveTasksToCookies = useCallback((tasks) => {
        try {
            setCookie('user', JSON.stringify(tasks), { path: '/' });
            console.log("Saved cookies");
        } catch (error) {
            console.error("Error saving tasks to cookies:", error);
        }
    }, [setCookie]);

    // Update tasks state and cookies
    const setTasks = (newTasks) => {
        setTasksState(newTasks);
        saveTasksToCookies(newTasks);
    };

    // Toggle task completion
    const toggleCheck = (index) => {
        const newTasks = [...tasks];
        newTasks[index].checked = !newTasks[index].checked;
        const [task] = newTasks.splice(index, 1);
        if (task.checked) {
            newTasks.push(task);
        } else {
            newTasks.unshift(task);
        }
        setTasks(newTasks);
    };

    // Handle input change
    function handleInputChange(event) {
        const NewTask = event.target.value;
        setNewTask(NewTask);
        setChars(NewTask.length);
    }

    // Add new task
    function addTask() {
        if (newTask.trim() !== "" && newTask.length <= 130) {
            const updatedTasks = [...tasks, { text: newTask, checked: false }];
            setTasks(updatedTasks);
            setNewTask("");
            setChars(0);
        }
    }

    // Delete task
    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // Move task up
    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // Move task down
    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div className="Heading">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className={chars > 130 ? "add-button-error add-button" : "add-button"}
                    onClick={addTask}
                    disabled={chars > 130}
                >
                    Add
                </button>
            </div>
            <div className="char-counter" style={{ color: chars > 130 ? "red" : "white" }}>
                <h2>{chars} / 130</h2>
            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        {task.checked
                            ? <ImCheckboxChecked color="green" onClick={() => toggleCheck(index)} />
                            : <ImCheckboxUnchecked onClick={() => toggleCheck(index)} />
                        }
                        <span className={task.checked ? "task-checked text" : "text"}>{task.text}</span>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}
                        >
                            <TbTriangleFilled style={{ verticalAlign: "middle" }} />
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}
                        >
                            <TbTriangleInvertedFilled style={{ verticalAlign: "middle" }} />
                        </button>
                        <div className="vertical-line">
                            <hr />
                        </div>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}
                        >
                            <FaTrashCan style={{ verticalAlign: "middle" }} />
                        </button>
                    </li>
                )}
            </ol>
        </div>
    );
}

export default TodoList;