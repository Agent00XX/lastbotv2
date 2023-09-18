function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const minLength = 12;
  const maxLength = 16;
  const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let randomString = '';
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export { generateRandomString }