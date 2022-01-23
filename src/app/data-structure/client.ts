export class IClient {
    id: string;
    first_name: string;
    last_name: string;
    grade: string;
    company: string;
    constructor(id, first_name, last_name, grade, company) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.grade = grade;
        this.company = company;
    }
}