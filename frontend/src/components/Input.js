import React from "react";
import { prototype } from "events";

export default function Input(props) {
  const {value,placeholder,name,style,fun} = props
  return (
    <input
            onChange={fun}
            value={value}
            type="text"
            placeholder={placeholder}
            name={name}
            className={style}
          />
  );
  }

