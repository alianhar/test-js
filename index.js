import { MenuController } from './src/controllers/menuController.js';

async function main() {
  try {
    const app = new MenuController();
    await app.start();
  } catch (error) {
    console.error('Failed to start application:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Goodbye! Thanks for using Todo App!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 Application terminated gracefully');
  process.exit(0);
});

// Start the application
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});