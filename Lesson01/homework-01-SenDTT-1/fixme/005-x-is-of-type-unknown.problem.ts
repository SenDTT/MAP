try {
  if (Math.random() > 0.5) {
    throw new Error("Oh dear!");
  }
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }

  throw error;
}
