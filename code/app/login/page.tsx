export default function LoginPage() {
  return (
    <div className="flex flex-col align-center justify-center h-screen gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="email"
        className="bg-white text-black"
      ></input>
      <input
        type="password"
        className="bg-white text-black"
        placeholder="password"
      ></input>
      <button className="bg-blue-500 text-white p-2 rounded">Login</button>
    </div>
  );
}
