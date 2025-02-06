const bcrypt = require('bcrypt');

async function generateHash() {
  const password = process.env.ADMIN_PASSWORD || 'your-secure-password';
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Your password hash (add this to .env.local):');
    console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash(); 