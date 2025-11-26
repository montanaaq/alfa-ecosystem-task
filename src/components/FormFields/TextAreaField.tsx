import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface TextAreaFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder: string;
  rows: number;
  error?: string;
  required?: boolean;
  register: UseFormRegister<T>;
}

const TextAreaField = <T extends FieldValues>({
  id,
  label,
  placeholder,
  rows,
  error,
  required,
  register
}: TextAreaFieldProps<T>) => (
  <div className='space-y-2'>
    <Label htmlFor={id as string}>
      {label}
      {required && <span className='text-red-500'>*</span>}
    </Label>
    <Textarea
      id={id as string}
      placeholder={placeholder}
      rows={rows}
      {...register(id)}
      className={error ? "border-red-500" : ""}
    />
    {error && <p className='text-sm text-red-500'>{error}</p>}
  </div>
);

export default TextAreaField;
