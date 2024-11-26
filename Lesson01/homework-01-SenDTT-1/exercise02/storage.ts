import { State } from "./types";

export class MyStorage<T> {
  #state: State<T> = Object.freeze({ data: [] });

  getItem(key: string): T | null {
    const result = this.#state.data.find((item) => key in item);

    if (result) {
      return result[key];
    }

    return null;
  }
  addItem(key: string, value: T): boolean {
    if (this.#state.data.some((item) => item.key == key)) return false;

    const data = [...this.#state.data, { [key]: value }];

    this.#state = Object.freeze({ data });
    return false;
  }
  updateItem(key: string, value: T): boolean {
    if (this.#state.data.some((item) => item.key == key)) return false;

    const data = this.#state.data.map((item) => {
        const curKey = Object.keys(item)[0];
        if (curKey == key) {
            item[key] = value;
        }

        return item;
    });

    this.#state = Object.freeze({ data });
    
    return true;
  }
  removeItem(key: string): boolean {
    const data = this.#state.data.filter((item) => {
      const curKey = Object.keys(item)[0];
      return curKey != key;
    });

    if (data.length == this.#state.data.length) return false;

    this.#state = Object.freeze({ data });

    return true;
  }
  getData() {
    return this.#state.data;
  }
}
