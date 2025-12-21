const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">
            Dashboard
          </a>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;