import { TextInput, type TextInputProps } from "react-native"

/* Input */

interface InputProps extends TextInputProps {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <TextInput
      className={`h-yb-input rounded-yb-lg border-[1.5px] border-yb-border bg-yb-surface px-yb-4 text-yb-body-md text-yb-fg placeholder:text-yb-fg-disabled${className ? ` ${className}` : ""}`}
      placeholderTextColor="var(--yb-fg-disabled)"
      {...rest}
    />
  )
}

/* Textarea */

interface TextareaProps extends TextInputProps {}

export function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <TextInput
      className={`min-h-[160px] rounded-yb-lg border-[1.5px] border-yb-border bg-yb-surface p-yb-4 text-yb-body-md text-yb-fg placeholder:text-yb-fg-disabled${className ? ` ${className}` : ""}`}
      placeholderTextColor="var(--yb-fg-disabled)"
      multiline
      textAlignVertical="top"
      {...rest}
    />
  )
}
