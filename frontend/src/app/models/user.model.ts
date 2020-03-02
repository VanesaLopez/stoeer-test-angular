export class User {
    id: number;
    own: boolean;
    first_name: string;
    last_name: string;
    iban: string;

    constructor(data?) {
        this.id = data && data.id ? data.id : null;
        this.own = data && data.own ? data.own : false;
        this.first_name = data && data.first_name ? data.first_name : '';
        this.last_name = data && data.last_name ? data.last_name : '';
        this.iban = data && data.iban ? data.iban : '';
    }
}
