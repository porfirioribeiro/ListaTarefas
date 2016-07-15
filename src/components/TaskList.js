/**
 * Created by porfirio on 07-07-2016.
 */
import React from "react";
import Task from "./Task";
import TaskListCol from "../models/TaskList";
import "./TaskList.scss";
/**
 * todo separate logic from presentation
 * @param tasks
 * @param filter
 */
export default function TaskList({tasks, filter}) {
    var tasksToRender = tasks.filter(function (task) {
        switch (filter) {
            case "done":
                return task.get('done');
            case "remaining":
                return !task.get('done');
            default:
                return true;
        }
    }, this);
    return (<ul className="task-list">{
        tasksToRender.map((task)=>
            <Task
                key={task.get("timestamp")}
                task={task.toJSON()}
                onDestroy={()=>task.destroy()}
                onToggle={(done)=>task.save({done})}
                onEditTitle={(title)=>task.save({title})}
                onEditColor={(color)=>task.save({color})}
            />)
    }</ul>);
}
//Todo Probably should not pass tasks as a prop, and use a different approach...
TaskList.propTypes = {
    tasks: React.PropTypes.instanceOf(TaskListCol).isRequired,
    filter: React.PropTypes.oneOf(['done', 'remaining', '']).isRequired
};