function arrayToMarkdownTable(arr) {
  if (!arr || arr.length === 0) {
    return "";
  }

  let result = arr
    .map((row, i) => {
      if (!row || row.length === 0) {
        return "";
      }

      if (i === 0) {
        let separatorRow = row.map(() => "---").join(" | ");
        separatorRow = `\n| ${separatorRow} |`;
        return `\n| ${row.join(" | ")} |${separatorRow}`;
      } else {
        return `\n| ${row.join(" | ")} |`;
      }
    })
    .join("");

  return result;
}

export default arrayToMarkdownTable;
