import { useState } from "react";
import Header from "./components/Header";
import TableSizeCompute from "./components/TableSizeCompute";

function App() {
  const [tableSize, setTableSize] = useState({
    rows: 1,
    columns: 1,
  });
  function tableSizeHandler(e) {
    const { name, value } = e.target;
    setTableSize((size) => ({ ...size, [name]: value }));
  }
  return (
    <>
      <Header />
      <main className="container bg-stone-100 border-t-2 py-2">
        <TableSizeCompute placeholder="rows" onTableSize={tableSizeHandler} />
        <TableSizeCompute
          placeholder="columns"
          onTableSize={tableSizeHandler}
        />
      </main>
    </>
  );
}

export default App;
