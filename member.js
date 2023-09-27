class Member {
    constructor(data) {
        // Making id write-protected
        Object.defineProperty(this, 'id', {
            value: data.id,
            writable: false,
            enumerable: true,
            configurable: false
        });

        this.dateOfBirth = new Date(data.dateOfBirth);
        this._firstName = data.firstName; // Using _firstName to store the value internally
        this._lastName = data.lastName; // Using _lastName to store the value internally
        this.isActiveMember = data.isActiveMember;
    }

    toTableRow() {
        return `
            <td data-name="${this.name}">${this.name}</td>
            <td data-active="${this.isActiveMember ? 'ja' : 'nej'}">${this.isActiveMember ? 'Ja' : 'Nej'}</td>
            <td data-birthdate="${this.dateOfBirth.toISOString()}">${this.dateOfBirth.toLocaleDateString('da-DK')}</td>
            <td data-age="${this.age}">${this.age}</td>
            <td data-group="${this.group}">${this.group}</td>
        `;
    }
      
    get name() {
        return `${this._firstName} ${this._lastName}`;
    }
      
    get age() {
        const today = new Date();
        let age = today.getFullYear() - this.dateOfBirth.getFullYear();
        const monthDifference = today.getMonth() - this.dateOfBirth.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.dateOfBirth.getDate())) {
            age--;
        }
        return age;
    }
      
    get group() {
        return this.age < 18 ? 'Junior' : 'Senior';
    }

    // Adding isJunior and isSenior properties
    get isJunior() {
        return this.group === 'Junior';
    }

    get isSenior() {
        return this.group === 'Senior';
    }
}

// Making name non-enumerable
Object.defineProperty(Member.prototype, 'name', { enumerable: false });

export default Member;