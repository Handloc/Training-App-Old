function FormInput(props) {
  return (
    <>
      <input
        className={
          "w-4/5 h-10 mt-3 border-b-4 border-transparent rounded-md focus:outline-none focus:border-b-4 focus:border-fuchsia-600 p-3 bg-slate-500 text-white " +
          `${props.valid ? "border-none" : "border-red-600"}`
        }
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      <p
        className={`${
          props.valid ? "hidden" : "block"
        } text-red-600 w-4/5 text-justify`}
      >
        {props.errorMessage}
      </p>
    </>
  );
}

export default FormInput;
