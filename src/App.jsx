import { useRef, useState } from "react";
import Header from "./components/Header";
import TableSizeCompute from "./components/TableSizeCompute";
import Button from "./components/Button";
import { arrayToMarkdownTable, copyToClipboard } from "./utils";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [tableSize, setTableSize] = useState({
    rows: 1,
    columns: 3,
  });
  const [tableData, setTableData] = useState([[""]]); // initialize with one empty cell
  const preResultRef = useRef(null);
  function tableSizeHandler(e) {
    const { name, value } = e.target;
    setTableSize((size) => ({ ...size, [name]: Number(value) }));

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
  function createTableHandler() {
    const rows = [];
    for (let i = 0; i < tableSize.rows; i++) {
      const columns = [];
      for (let j = 0; j < tableSize.columns; j++) {
        columns.push(
          <td key={j}>
            <input
              type="text"
              value={tableData[i]?.[j] || ""}
              onChange={(e) => handleInputChange(i, j, e.target.value)}
            />
          </td>
        );
      }
      rows.push(<tr key={i}>{columns}</tr>);
    }
    return rows;
  }

  function handleInputChange(rowIndex, columnIndex, value) {
    setTableData((prevData) => {
      const newData = [...prevData];
      if (!newData[rowIndex]) newData[rowIndex] = [];
      newData[rowIndex][columnIndex] = value;
      return newData;
    });
  }
  function handleReset() {
    setTableSize({ rows: 1, columns: 1 });
    setTableData([[""]]);
    toast.success("reset table sizes");
  }

  return (
    <>
      <Toaster position="top-right" />
      <Header />
      <main className="container border-t-2 py-2">
        <div className="md:grid md:grid-cols-2 gap-3 ">
          <TableSizeCompute
            placeholder="rows"
            name="rows"
            onTableSize={tableSizeHandler}
            tableSize={tableSize}
          />
          <TableSizeCompute
            placeholder="columns"
            name="columns"
            onTableSize={tableSizeHandler}
            tableSize={tableSize}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          {/* <Button action="generate" /> */}
          <Button action="reset" onClick={handleReset} />
          <Button
            action="generate"
            onClick={() => copyToClipboard(preResultRef?.current?.innerHTML)}
          />
        </div>
        <div className="overflow-x-auto mt-4">
          <div className="flex justify-end"></div>
          <table>
            <thead>
              <tr>
                {Array.from({ length: tableSize.columns }).map((_, index) => (
                  <th key={index}>Column {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>{createTableHandler()}</tbody>
          </table>
        </div>
        <pre ref={preResultRef}>{arrayToMarkdownTable(tableData)}</pre>
      </main>
    </>
  );
}

export default App;
