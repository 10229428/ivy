@Injectable()
export class CountService {

  private count = 0;

  constructor() {
    console.log("In test service constructor");
  }

  public getCount(): number {
    return this.count;
  }

  public test(): void {
    console.log("TESTING CALLED!");
    this.count++;
  }
}
