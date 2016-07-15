/**
 * Created by porfirio on 06-07-2016.
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router'


import './index.scss'

import TaskList from './components/TaskList'
import Footer from './components/Footer'
import TaskListCol from './models/TaskList'


class TasksApp extends React.Component {

    constructor(props) {
        super(props);
        this.taskList = this.props.routes[0].tasks;
        // this.taskList=this.props.tasks;
    }
    componentDidMount(){
        //Update & Re-Render the list
        this.taskList.on('add remove change', this.forceUpdate.bind(this, null));
        this.taskList.fetch();
    }
    componentWillUnmount(){
        //Clean the events
        this.taskList.off(null, null, this);
    }
    newTask_onKeyDown(e) {
        if (e.which == 13) {//enter: Add new Task
            var title=this._addNewTask.value.trim();
            if (title){
                console.log("Add new Task with title: "+title);
                this.tasks.create({
                    title: title,
                    color: "#000",
                    timestamp: Date.now(),
                    done:false
                });
                this._addNewTask.value="";
            }
            e.preventDefault();
        }
        else if (e.which==27){ //escape: Cancel and clean input
            this._addNewTask.value="";
            this._addNewTask.blur();
        }
    }

    render() {
        this.tasks = this.props.routes[0].tasks;
        this.filter=this.props.routes[0].path.substr(1);
        return (<div>
            <header>
                <h1>Lista de Tarefas</h1>
                <div className="logo"></div>
                <div className="link-bar">
                    <Link to={`/`} activeClassName="active">Todas</Link>
                    <Link to={'/done'} activeClassName="active">Completas</Link>
                    <Link to={'/remaining'} activeClassName="active">Por realizar</Link>
                </div>
                <input type="text"
                       placeholder="Nova Tarefa..."
                       ref={(el)=>this._addNewTask=el}
                       onKeyDown={(e)=>this.newTask_onKeyDown(e)}/>
            </header>
            <TaskList tasks={this.tasks} filter={this.filter}/>

            <Footer
                remaining = {this.tasks.remaining().length}
                done = {this.tasks.done().length}
                all = {this.tasks.length}
                onDeleteAllDone={()=>this.tasks.deleteAllDone()}
                onMarkAllAsDone={()=>this.tasks.markAllAsDone()}
            />
        </div>);
    }
}
var tasks = new TaskListCol();
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" tasks={tasks} component={TasksApp}/>
        <Route path="/done" tasks={tasks} component={TasksApp}/>
        <Route path="/remaining" tasks={tasks} component={TasksApp}/>
    </Router>
    ,
    document.getElementById('container')
);