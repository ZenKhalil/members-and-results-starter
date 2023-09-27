
    class Result {
        constructor(data, members) {
            this.date = new Date(data.date);
            this.discipline = data.discipline;
            this.resultType = data.resultType;
            this.time = data.time;
            this.member = members.find(member => member.id === data.memberId);
        }
    
    toTableRow() {
            return `
                <td data-date="${this.date.toISOString()}">${this.formattedDate}</td>
                <td data-member="${this.member ? this.member.name : ''}">${this.member ? this.member.name : ''}</td>
                <td data-discipline="${this.discipline}">${this.discipline}</td>
                <td data-type="${this.resultType === 'competition' ? 'stævne' : 'træning'}">${this.resultType === 'competition' ? 'Stævne' : 'Træning'}</td>
                <td data-time="${this.formattedTime}">${this.formattedTime}</td>
            `;
        }
    
        get formattedDate() {
            return this.date.toLocaleDateString('da-DK');
        }
    
        get formattedTime() {
            return this.time.replace('.', ':');
        }
    }

    export default Result;