import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  warningText?: string;
  buttonText: string;
}

const AuthForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  warningText,
  buttonText,
}) => (
  <form onSubmit={onSubmit}>
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
    <div className="flex flex-col items-center justify-center min-h-20 ">
      <div className="text-red-600 my-2">{warningText}</div>
      <Button className="w-full bg-sky-600" type="submit">
        {buttonText}
      </Button>
    </div>
  </form>
);

export default AuthForm;
