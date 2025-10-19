export class ConUnit {
  private tipo: string;
  private value: string;
  private inUnit: string;
  private outUnit: string;

  constructor(tipo: string, value: string, inUnit: string, outUnit: string) {
    this.tipo = tipo;
    this.value = value;
    this.inUnit = inUnit;
    this.outUnit = outUnit;
  }

  getTipo(): string {
    return this.tipo;
  }

  getValue(): string {
    return this.value;
  }

  getInUnit(): string {
    return this.inUnit;
  }

  getOutUnit(): string {
    return this.outUnit;
  }
}
