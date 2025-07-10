export async function getUsers() {
  const res = await fetch("http://localhost:3000/usuarios");
  const data = await res.json();
  return data;
}
