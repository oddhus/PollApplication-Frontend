import React from "react";
import {Button} from "@material-ui/core";

export const ThemeButton = (props) => {
    return <Button variant="contained" color="primary" type="submit">{props.text.toString()}</Button>;
}