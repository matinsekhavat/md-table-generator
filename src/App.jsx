import { useState } from "react";
import Header from "./components/Header";
import TableSizeCompute from "./components/TableSizeCompute";
import Button from "./components/Button";

function App() {
  const [tableSize, setTableSize] = useState({
    rows: 1,
    columns: 1,
  });
  const [tableData, setTableData] = useState([[""]]); // initialize with one empty cell

  function tableSizeHandler(e) {
    const { name, value } = e.target;
    setTableSize((size) => ({ ...size, [name]: Number(value) || 1 }));
  }
  function handleReset() {
    setTableSize({ rows: 1, columns: 1 });
    setTableData([[""]]);
  }

  return (
    <>
      <Header />
      <main className="container border-t-2 py-2">
        <TableSizeCompute
          placeholder="rows"
          name="rows"
          onTableSize={tableSizeHandler}
        />
        <TableSizeCompute
          placeholder="columns"
          name="columns"
          onTableSize={tableSizeHandler}
        />
        <div className="flex items-center justify-center gap-4">
          <Button action="generate" />
          <Button action="reset" onClick={handleReset} />
        </div>
      </main>
    </>
  );
}

export default App;
