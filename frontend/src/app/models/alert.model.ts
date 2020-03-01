export class Alert {
    type: string;
    content: string;

    constructor(data?) {
        this.type = data && data.type ? data.type : '';
        this.content = data && data.content ? data.content : '';
    }

    setError() {
        this.type = 'danger';
        this.content = 'Ooops!, something is wrong.';
    }

    setInfo() {
        this.type = 'success';
        this.content = 'The user has been saved successfully.';
    }

    setWarning() {
        this.type = 'warning';
        this.content = 'Update not allowed.'
    }

    setInfoDelete() {
        this.type = 'success';
        this.content = 'The user has been deleted successfully.';
    }
}