async function readFileAs<T>(
  file: File,
  read: (reader: FileReader, file: File) => void,
  parse: (ev: ProgressEvent<FileReader>) => T
) {
  return new Promise<T>((resolve, reject) => {
    // Create new reader
    const reader = new FileReader();

    // Resolve failure on error and abort
    reader.onerror = () => reject(new Error("File reader failure"));
    reader.onabort = () => reject(new Error("File reader aborted"));

    // Resolve with parsed value
    reader.onload = (event) => resolve(parse(event));

    // Initialize read
    read(reader, file);
  });
}

export const readFile = {
  asArrayBuffer(file: File) {
    return readFileAs<ArrayBuffer>(
      file,
      (reader, file) => reader.readAsArrayBuffer(file),
      (ev) => {
        if (!ev.target || ev.target.result === null) {
          throw new Error("No event target from file reader");
        } else if (typeof ev.target.result === "string") {
          throw new Error("Invalid result type from file reader");
        } else {
          return ev.target.result;
        }
      }
    );
  },

  asText(file: File) {
    return readFileAs<string>(
      file,
      (reader, file) => reader.readAsText(file),
      (event) => {
        if (typeof event.target?.result === "string") {
          return event.target.result;
        } else if (!event.target) {
          throw new Error("No event target from file reader");
        } else {
          throw new Error("Invalid result type from file reader");
        }
      }
    );
  },

  asBase64(file: File) {
    return readFileAs<string>(
      file,
      (reader, file) => reader.readAsDataURL(file),
      (event) => {
        if (typeof event.target?.result === "string") {
          return event.target.result;
        } else if (!event.target) {
          throw new Error("No event target from file reader");
        } else {
          throw new Error("Invalid result type from file reader");
        }
      }
    );
  },
};
