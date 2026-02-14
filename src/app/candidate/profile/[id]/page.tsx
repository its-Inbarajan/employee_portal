export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Product ID: {id}</h1>
      {/* Fetch and display product details based on the 'id' */}
    </div>
  );
}
