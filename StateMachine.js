class StateMachine {
    constructor() {
      // this.characterSet = 'abcde';
      // this.characterSet = `abcdefghijklmnopqrstuvwxyz .,`
      this.characterSet = `абвгґдеєжзиіїйклмнопрстуфхцчшщьюя ,.\n`
      // this.numCharsPerPage = 20;
      this.numCharsPerPage = 3200;
      this.numBooks = Math.pow(this.characterSet.length, this.numCharsPerPage);
    }

    generatePage(page) {
      // const [room, wall, shelf, volume] = coordinates.split("-"); const book = parseInt(room) * 1000 + parseInt(wall) * 100 + parseInt(shelf) * 10 + parseInt(volume);
      
      let state = BigInt(page);
      let output = '';
      const length = BigInt(this.characterSet.length)
      for (let i = 0; i < this.numCharsPerPage; i++) {
        const operation = state % length;

        output = this.characterSet[operation] + output;
        state = state / length // ))) Math.floor(state / BigInt(this.characterSet.length));
 
      }
      
      return output;
    }
  
    search(query) {
      let state = BigInt(0);

      for (const c of query) {
        const operation = BigInt(this.characterSet.indexOf(c));
        state = state * BigInt(this.characterSet.length) + operation;
        
      }
      return { page: state };
    }
  }
  
  export default StateMachine;
  