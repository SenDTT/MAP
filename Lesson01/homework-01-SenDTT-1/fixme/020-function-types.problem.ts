const addListener = (onFocusChange: Function) => {
  window.addEventListener("focus", () => {
    onFocusChange(true);
  });

  window.addEventListener("blur", () => {
    onFocusChange(false);
  });
};

addListener((isFocused: Function) => {
  console.log({ isFocused });
});
