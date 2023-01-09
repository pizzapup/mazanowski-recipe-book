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
    <>
      <label className={`input-comp ${className}`}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        accept={accept}
      />
    </>
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
