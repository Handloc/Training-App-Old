function FormInput(props) {
  return (
    <input
      className="w-4/5 h-10 mb-3 border-b-4 border-transparent rounded-md focus:outline-none focus:border-b-4 focus:border-fuchsia-600 p-3 bg-slate-500 text-white "
      placeholder={props.placeholder}
    />
  );
}

export default FormInput;
