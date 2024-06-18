export class UseCaseProxy<T> {
  constructor(private readonly useCase: T) {}
  getInstance(): T {
    return this.useCase;
  }
  async executeMethod(methodName: string, args: any[]): Promise<any> {
    const useCaseInstance = this.getInstance();
    console.log(methodName);
    return useCaseInstance[methodName](...args);
  }
}
