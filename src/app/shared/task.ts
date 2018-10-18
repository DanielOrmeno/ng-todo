export class Task {
    id: string;
    name: string;
    complete: boolean;

    constructor(name: string, complete: boolean = false, id?: string) {
        this.name = name;
        this.complete = complete;
        this.id = id;
    }
}
