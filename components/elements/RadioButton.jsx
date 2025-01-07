function RadioButton({ title, name, status, setStatus, children }) {
  return (
    <div className={name}>
      <label htmlFor={name}>
        {children}
        {title}
      </label>
      <input
        type="radio"
        id={name}
        value={name}
        checked={status === name}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}

export default RadioButton;
