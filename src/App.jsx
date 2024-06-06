import { useState } from "react";
import Header from "./components/Header";
import TableSizeCompute from "./components/TableSizeCompute";
import Button from "./components/Button";
import arrayToMarkdownTable from "./utils";

function App() {
  const [tableSize, setTableSize] = useState({
    rows: 1,
    columns: 1,
  });
  const [tableData, setTableData] = useState([[""]]); // initialize with one empty cell

  function tableSizeHandler(e) {
    const { name, value } = e.target;
    setTableSize((size) => ({ ...size, [name]: Number(value, 10) || 1 }));

    // Update tableData to match new size
    const newTableData = Array.from({
      length: Math.max(1, Number(value) || 1),
    }).map((_, i) =>
      Array.from({ length: Math.max(1, tableSize.columns) }).map(
        (_, j) => tableData[i]?.[j] || ""
      )
    );
    setTableData(newTableData);
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
        <table>
          <thead>
            <tr>
              {Array.from({ length: tableSize.columns }).map((_, index) => (
                <th key={index}>Column {index + 1}</th>
              ))}
            </tr>
          </thead>
          {/* <tbody>{createTableHandler()}</tbody> */}
        </table>
        <pre>{arrayToMarkdownTable(tableData)}</pre>
      </main>
    </>
  );
}

export default App;
