export default function Loading() {
  return (
    <div className="flex items-center fixed z-50 w-full justify-center min-h-screen">
      <div
        className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
aspect-square w-8 flex justify-center items-center text-yellow-700"
      ></div>
    </div>
  );
}
