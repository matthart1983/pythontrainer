export interface ExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
  result: any;
  executionTime?: number;
}

export interface ConsoleHistoryItem {
  id: string;
  code: string;
  result: ExecutionResult;
  timestamp: Date;
}
