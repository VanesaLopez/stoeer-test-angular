export class User {
    id: number;
    creator: string;
    first_name: string;
    last_name: string;
    iban: string;

    constructor(data?) {
        this.id = data && data.id ? data.id : null;
        this.creator = data && data.creator ? data.creator : '';
        this.first_name = data && data.first_name ? data.first_name : '';
        this.last_name = data && data.last_name ? data.last_name : '';
        this.iban = data && data.iban ? data.iban : '';
    }
}