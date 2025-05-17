# Bleregex

@reliverse/bleregex: a collection of various useful regexes for javascript and typescript

```bash
bun add @reliverse/bleregex
```

## Usage Example

```ts
import { VERSION_PATTERNS } from "@reliverse/bleregex";

/**
 * Updates version strings in a file's content.
 */
async function updateVersionInContent(
  filePath: string,
  content: string,
  oldVersion: string,
  newVersion: string,
): Promise<boolean> {
  let updatedContent = content;
  let changed = false;

  // Debug: Log which file is being checked and what patterns are being used
  relinka("verbose", `[updateVersionInContent] Checking file: ${filePath}`);

  if (/\.(json|jsonc|json5)$/.test(filePath)) {
    const jsonPattern = VERSION_PATTERNS.find((p) => p.id === "json-version");
    if (jsonPattern && content.includes(`"version": "${oldVersion}"`)) {
      relinka(
        "verbose",
        `[updateVersionInContent] JSON pattern matched in: ${filePath}`,
      );
      updatedContent = content.replace(
        jsonPattern.pattern(oldVersion),
        `"version": "${newVersion}"`,
      );
      changed = true;
    }
  } else if (filePath.endsWith(".ts")) {
    const tsPatterns = VERSION_PATTERNS.filter((p) => p.id.startsWith("ts-"));
    for (const { id, pattern } of tsPatterns) {
      const regex = pattern(oldVersion);
      if (regex.test(updatedContent)) {
        relinka(
          "verbose",
          `[updateVersionInContent] Pattern '${id}' matched in: ${filePath}`,
        );
        updatedContent = updatedContent.replace(regex, `$1${newVersion}$2`);
        changed = true;
      } else {
        relinka(
          "verbose",
          `[updateVersionInContent] Pattern '${id}' did NOT match in: ${filePath}`,
        );
      }
    }
  }

  if (changed) {
    relinka(
      "verbose",
      `[updateVersionInContent] Version updated in: ${filePath}`,
    );
    await writeFileSafe(filePath, updatedContent, "version update");
  } else {
    relinka(
      "verbose",
      `[updateVersionInContent] No version updated in: ${filePath}`,
    );
  }
  return changed;
}
```

## License

MIT © Nazar Kornienko (blefnk), Reliverse
