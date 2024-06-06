function TableSizeCompute({ placeholder, onTableSize, tableSize }) {
  return (
    <div className="my-4">
      <p className="text-center my-2 font-bold">Number of {placeholder}</p>
      <input
        type="text"
        placeholder={placeholder}
        className="w-4/5 md:w-full mx-auto block p-2 rounded-md ring ring-stone-200
         focus:outline-2 focus:outline-stone-300"
        name={placeholder}
        onChange={(e) => onTableSize(e)}
        value={tableSize[placeholder]}
      />
    </div>
  );
}

export default TableSizeCompute;
