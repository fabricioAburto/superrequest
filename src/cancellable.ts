export class Cancellable {
  protected controller: AbortController;

  constructor() {
    this.controller = new AbortController();
  }

  public setAbortController(controller: AbortController): void {
    this.controller = controller;
  }

  public abort(): void {
    this.controller.abort();
  }

  protected startNewAbortController(): void {
    this.controller = new AbortController();
  }

  protected getSignal(): AbortSignal {
    return this.controller.signal;
  }
}
