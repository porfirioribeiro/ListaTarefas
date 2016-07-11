/**
 * Created by porfirio on 07-07-2016.
 */

import Backbone from 'backbone'
import Backbone_LocalStorage from 'backbone.localstorage'
import Task from './Task'

/**
 * TaskList is a collection os Task's
 */
export default class TaskList extends Backbone.Collection {

    constructor() {
        super();
        this.model=Task;
        //Use localStorage as storing method
        this.localStorage = new Backbone_LocalStorage("TaskList");
        //Use the timestamp stamp of the Task item to sort and reverse it
        this.comparator = function (task) {
            return -task.get('timestamp');
        };
    }

    /**
     * Return the list with the items that have been marked as "done"
     * @returns {*}
     */
    done() {
        return this.where({done: true});
    }

    /**
     * Return the list with the items that have not been marked as "done"
     * @returns {*}
     */
    remaining() {
        return this.where({done: false});
    }

    markAllAsDone(){
        this.remaining().forEach((task)=>task.toggle());
    }

    deleteAllDone(){
        this.done().forEach((task)=>task.destroy());
    }

};