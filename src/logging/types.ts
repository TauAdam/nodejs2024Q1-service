const enum LogLevel {
  LOG,
  ERROR,
  WARN,
  DEBUG,
  VERBOSE,
  FATAL,
}
type LogLevelType = keyof typeof LogLevel;

export { LogLevel };
export type { LogLevelType };
