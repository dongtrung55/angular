console.clear();
function logger(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(
      `Calling ${propertyKey}() with arguments: ${JSON.stringify(args)}`
    );
    const result = originalMethod(...args);
    console.log(`${propertyKey}() returned: ${result}`);
    return result;
  };

  return descriptor;
}

class ExampleClass {
  @logger
  decoratorMethod(x: number, y: number): number {
    return x + y;
  }
}

const obj = new ExampleClass();
const result_6 = obj.decoratorMethod(3, 5);

console.log(`Result: ${result_6}`);
