export default class AbstractModuleFactory {
  protected instances: Record<string, any> = {};
  protected getInstance(key: string): Nullable<any> {
    return this.instances[key];
  }
  protected cacheInstance(key: string, instance: any): void {
    this.instances[key] = instance;
  }

  public clearInstances(): void {
    this.instances = {};
  }
}
