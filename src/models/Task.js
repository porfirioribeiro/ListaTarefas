/**
 * Created by porfirio on 07-07-2016.
 */
"use strict";
import Backbone from "backbone";
/**
 * Task is a simple Model that contains the `title`, `done` state and the `timestamp`
 */
export default class Task extends Backbone.Model {
    /**
     * Get the default values for this Model
     * @returns {{title: string, date: number, done: boolean}}
     */
    static defaults() {
        return {
            title: "empty task...",
            color: "#000",
            date: Date.now(),
            done: false
        };
    }

    /**
     * Toggle the `done` state of this Task.
     */
    toggle() {
        this.save({done: !this.get("done")});
    }


}
