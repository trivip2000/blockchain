interface InputProps {
  label?: string;
  // add other properties as needed
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
  name?: string;
}
function Input(props: InputProps) {
  console.log(props, '123213props');
  return (
    <>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <input
        // type="text"
        className="transition-all duration-500 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      />
    </>
  );
}

export default Input;
