export class User {
    id: number;
    creator: number;
    first_name: string;
    last_name: string;
    iban: string;

    constructor(data?) {
        this.id = data.id ? data.id : null;
        this.creator = data.creator ? data.creator : null;
        this.first_name = data.first_name ? data.first_name : null;
        this.last_name = data.last_name ? data.last_name : null;
        this.iban = data.iban ? data.iban : null;
    }
}