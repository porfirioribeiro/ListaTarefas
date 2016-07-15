/**
 * Created by porfirio on 15-07-2016.
 */
"use strict";
import {PropTypes} from "react";


const {number, bool, shape, string} = PropTypes;

export const taskShape = shape({
    title: string,
    color: string,
    date: number,
    done: bool
});
