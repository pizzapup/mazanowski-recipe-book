import "./Input.css";
export default function Input({
  type,
  name,
  value,
  onChange,
  label,
  className,
  accept,
}) {
  return (
    <div className={`input-container ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
}
export function InputGroup({ legend, children, className }) {
  return (
    <fieldset className={`fieldset-comp ${className}`}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
export function TextArea({
  type,
  name,
  value,
  onChange,
  label,
  className,
  accept,
}) {
  return (
    <div className={`input-container ${className}`}>
      <label>{label}</label>
      <textarea
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
}
