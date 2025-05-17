/**
 * Defines a version pattern with metadata for better maintainability
 */
export type VersionPattern = {
  /** Unique identifier for the pattern */
  id: string;
  /** Human readable description of what this pattern matches */
  description: string;
  /** Function to generate the regex pattern for a given version */
  pattern: (oldVer: string) => RegExp;
};

/**
 * Collection of patterns for matching version strings in different file types and contexts
 */
export const VERSION_PATTERNS: VersionPattern[] = [
  {
    id: "json-version",
    description: "Matches version field in JSON files",
    pattern: (oldVer) => new RegExp(`"version"\\s*:\\s*"${oldVer}"`, "g"),
  },
  {
    id: "ts-export-const-version",
    description: "Matches exported version constant in TypeScript files",
    pattern: (oldVer) =>
      new RegExp(
        `(export\\s+const\\s+version\\s*=\\s*["'])${oldVer}(["'])`,
        "g",
      ),
  },
  {
    id: "ts-const-version",
    description: "Matches version constant in TypeScript files",
    pattern: (oldVer) =>
      new RegExp(`(const\\s+version\\s*=\\s*["'])${oldVer}(["'])`, "g"),
  },
  {
    id: "ts-version-field",
    description: "Matches version field in TypeScript object literals",
    pattern: (oldVer) =>
      new RegExp(`(version\\s*:\\s*["'])${oldVer}(["'])`, "g"),
  },
  {
    id: "ts-version-constant",
    description: "Matches VERSION constant in TypeScript files",
    pattern: (oldVer) =>
      new RegExp(`(VERSION\\s*=\\s*["'])${oldVer}(["'])`, "g"),
  },
  {
    id: "ts-export-cli-version",
    description: "Matches exported CLI version constant in TypeScript files",
    pattern: (oldVer) =>
      new RegExp(
        `(export\\s+const\\s+cliVersion\\s*=\\s*["'])${oldVer}(["'])`,
        "g",
      ),
  },
  {
    id: "ts-cli-version",
    description: "Matches CLI version constant in TypeScript files",
    pattern: (oldVer) =>
      new RegExp(`(const\\s+cliVersion\\s*=\\s*["'])${oldVer}(["'])`, "g"),
  },
  {
    id: "ts-package-version",
    description: "Matches packageVersion field in TypeScript files",
    pattern: (oldVer) =>
      new RegExp(`(packageVersion\\s*:\\s*["'])${oldVer}(["'])`, "g"),
  },
];
