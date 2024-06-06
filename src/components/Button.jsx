const Button = ({ action }) => {
  const buttonStyles = {
    generate:
      "border border-green-600 text-green-500 px-4 py-2 rounded-md hover:text-gray-100 hover:bg-green-500 transition duration-200",
    reset:
      "border border-red-600 text-red-500 px-4 py-2 rounded-md hover:text-gray-100 hover:bg-red-500 transition duration-200",
  };

  return (
    <button
      className={
        action === "generate" ? buttonStyles.generate : buttonStyles.reset
      }
    >
      {action === "generate" ? "Generate Table" : "Reset Colors"}
    </button>
  );
};

export default Button;
