import React from "react";
import styles from "./Combobox.module.css";
import { useController } from "react-hook-form";
import { ComboBoxType } from "@/app/Types/global";

const ComboBox = React.forwardRef(
  (
    {
      label,
      id,
      name,
      value,
      options,
      control,
      onChange,
      disabled,
    }: ComboBoxType,
    ref
  ) => {
    const {
      field: { ref: selectRef, ...fieldProps },
    } = useController({
      name: name,
      control,
      defaultValue: value || "", // Set the default value from the prop
    });

    return (
      <div className={styles.label}>
        <label>{label}</label>
        <div>
          <select
            id={id}
            className={styles.select}
            {...fieldProps}
            ref={(e) => {
              // Ensure that the ref prop is a callback function
              if (typeof ref === "function") {
                ref(e);
              } else if (ref && typeof ref === "object") {
                // Then assign the DOM element to the ref's current property
                ref.current = e;
              }
              // Also, assign the DOM element to the field's ref if available
              if (selectRef) {
                selectRef(e);
              }
            }}
            value={fieldProps.value}
            onChange={(e) => {
              fieldProps.onChange(e);
              const selectedValue = e.target.value;
              onChange(e, selectedValue);
            }}
            disabled={disabled}
          >
            <option value="" disabled={true} aria-disabled>
              Select an option
            </option>
            {options &&
              options.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    );
  }
);

export default ComboBox;
