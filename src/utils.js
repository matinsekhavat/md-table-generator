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

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("copied");
  } catch (error) {
    throw new Error("sth wrong to save Table String into clipboard", error);
  }
}
export { arrayToMarkdownTable, copyToClipboard };
