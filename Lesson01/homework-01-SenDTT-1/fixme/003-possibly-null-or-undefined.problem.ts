const searchParams = new URLSearchParams(window.location.search);

const id = searchParams.get("id") as string;

console.log(id.toUpperCase());
