import * as fs from "fs/promises";

/**
 * Reads content from a file or uses the provided string
 * @param filePath Path to the file to read from
 * @param customString Optional string to use instead of reading from file
 * @returns Array of strings, split by newlines
 */
export async function readFile(filePath: string, customString?: string): Promise<string[]> {
  try {
    const content = customString ?? (await fs.readFile(filePath, "utf-8"));
    return content.trim().split("\n");
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return [];
  }
}

/**
 * Reads content from a file as a single string
 * @param filePath Path to the file to read from
 * @returns File content as a string
 */
export async function readFileAsString(filePath: string, customString?: string): Promise<string> {
  try {
    const content = customString ?? (await fs.readFile(filePath, "utf-8"));
    return content.trim();
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return "";
  }
}

/**
 * Writes content to a file
 * @param filePath Path to write the file to
 * @param content Content to write to the file
 * @returns True if successful, false otherwise
 */
export async function writeFile(filePath: string, content: string): Promise<boolean> {
  try {
    await fs.writeFile(filePath, content, "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing to file ${filePath}:`, err);
    return false;
  }
}
