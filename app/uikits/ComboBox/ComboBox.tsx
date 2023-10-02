import React from "react";
import styles from "./Combobox.module.css";
const ComboBox = ({ label, id, name, value, onChange, options }) => {
  return (
    <div className={styles.label}>
      <label>{label}</label>
      <div>
        <select
          name={name}
          id={id}
          className={styles.select}
          onChange={onChange}
          value={value}
        >
          <option value="" disabled={true} aria-disabled>
            Select an option
          </option>
          {options &&
            options?.map((option) => (
              <option key={option?.id} value={option?.id}>
                {option?.title}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ComboBox;
