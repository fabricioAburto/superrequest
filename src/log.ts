export class Logger {
  private isLogEnable: boolean = false;
  public disableLogs(): void {
    this.isLogEnable = false;
  }

  public enableLogs(): void {
    this.isLogEnable = true;
  }

  info(message: string): void {
    if (this.isLogEnable) {
      console.log(`[SupperRequest][Info]: ${message}`);
    }
  }
  error(message: string): void {
    if (this.isLogEnable) {
      console.log(`[SupperRequest][Error]: ${message}`);
    }
  }
}
