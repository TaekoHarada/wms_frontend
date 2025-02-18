export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center px-6 z-50">
      {/* Left - Logo */}
      <h1 className="text-xl font-semibold text-gray-900">在庫管理システム</h1>

      {/* Right - Profile & Settings */}
      <div className="ml-auto flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-900">
          🔔 Notifications
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          ⚙️ Settings
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500">
          Logout
        </button>
      </div>
    </header>
  );
}
