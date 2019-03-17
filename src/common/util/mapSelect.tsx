import {MenuItem} from "@material-ui/core"
import React from "react"

export default function mapSelect(values, defaultValue) {
    const mapped = values.map(value => (
        <MenuItem key={value.value} value={value.value}>
            {value.text}
        </MenuItem>
    ))
    if(defaultValue) {
        mapped.unshift(
            <MenuItem key="default" value="default">
                {defaultValue}
            </MenuItem>
        )
    }
    return mapped
}
