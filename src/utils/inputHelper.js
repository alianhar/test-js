import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

export class InputHelper {
  static getString(message, required = true) {
    let input;
    do {
      input = prompt(message).trim();
      if (!required || input) break;
      console.log('Input tidak boleh kosong!');
    } while (true);
    return input;
  }

  static getPassword(message) {
    const input = prompt(message, { echo: '*' });
    return input || '';
  }

  static getChoice(message, options) {
    let input;
    do {
      console.log('\nPilihan:');
      options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
      });
      input = prompt(message);
      const choice = parseInt(input) - 1;
      if (choice >= 0 && choice < options.length) {
        return choice;
      }
      console.log('Pilihan tidak valid!');
    } while (true);
  }

  static getConfirmation(message) {
    const input = prompt(`${message} (y/n): `).toLowerCase();
    return input === 'y' || input === 'yes';
  }

  static waitForEnter() {
    prompt('Tekan Enter untuk melanjutkan...');
  }
}