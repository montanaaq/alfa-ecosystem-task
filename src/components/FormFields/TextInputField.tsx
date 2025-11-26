import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface TextInputFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  required?: boolean;
  register: UseFormRegister<T>;
}

const TextInputField = <T extends FieldValues>({
  id,
  label,
  placeholder,
  type = "text",
  error,
  required,
  register
}: TextInputFieldProps<T>) => (
  <div className='space-y-2'>
    <Label htmlFor={id as string}>
      {label}
      {required && <span className='text-red-500'>*</span>}
    </Label>
    <Input
      id={id as string}
      type={type}
      placeholder={placeholder}
      {...register(id)}
      className={error ? "border-red-500" : ""}
    />
    {error && <p className='text-sm text-red-500'>{error}</p>}
  </div>
);

export default TextInputField;
