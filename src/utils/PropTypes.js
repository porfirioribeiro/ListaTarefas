/**
 * Created by porfirio on 15-07-2016.
 */
"use strict";
import React from "react";


const {number, bool, shape, string} = React.PropTypes;

//noinspection JSUnusedGlobalSymbols
export const taskShape = shape({
    title: string,
    color: string,
    date: number,
    done: bool
});
