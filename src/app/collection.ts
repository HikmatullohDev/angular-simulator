export class Collection<T> {

  private elements: T[] = [];

  constructor(elements: T[]) {
    this.elements = elements;
  }

  getAll(): T[] {
    return [...this.elements];
  }

  getElement(index: number): T | undefined {
    return this.elements[index];
  }

  clear(): void {
    this.elements = [];
  }

  deleteByIndex(indexToRemove: number): void {
    if (indexToRemove >= 0 && indexToRemove < this.elements.length) {
      this.elements.splice(indexToRemove, 1);
    }
  }

  replace(index: number, newElement: T): void {
    if (index >= 0 && index < this.elements.length) {
      this.elements[index] = newElement;
    }
  }

}

export const nameCollection: Collection<string> = new Collection<string>(['Jake', 'Mike', 'Anthony']);
export const numberCollection: Collection<number> = new Collection<number>([350, 400, 550]);