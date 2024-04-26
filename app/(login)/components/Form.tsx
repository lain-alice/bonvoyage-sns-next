import React from "react";
import { Input } from "@/components/ui/input";

interface Field {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

interface FormProps {
  fields: Field[];
}

const Form: React.FC<FormProps> = ({ fields }) => (
  <form>
    {fields.map((field, index) => (
      <div key={index}>
        <label>{field.label} </label>
        <Input
          type={field.type}
          value={field.value}
          name={field.name}
          onChange={field.onChange}
          required={field.required}
        />
      </div>
    ))}
  </form>
);

export default Form;
