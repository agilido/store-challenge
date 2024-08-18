export async function GET() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();

  return Response.json(data);
}
