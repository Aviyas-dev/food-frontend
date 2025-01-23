import React from "react";
 
const UserHeader: React.FC = () => {
  return (
<header className="bg-gray-900 text-white w-screen">
      {/* Header 1 */}
<div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
<div className="ml-10">
<img src="Logo.png"  className="h-10 mr-10" />
<div>

</div>
</div>
<div className="flex items-center space-x-4 mr-10">
<button className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-200">
            Sign up
</button>
<button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Log in
</button>
</div>
</div>
 
      {/* Header 2 */}
<div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
<div className="ml-10">
<img src="logo.png"  className="h-10 mr-4" />

</div>
<div className="flex items-center space-x-4 mr-10">
<div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded">
<span className="text-gray-400">Delivery address:</span>
<input
              type="text"
              placeholder="Add Location"
              className="bg-transparent text-white placeholder-gray-500 focus:outline-none"
            />
</div>
<button className="text-xl">🛒</button>
<button className="text-xl">👤</button>
</div>
</div>
{/* header zurag */}
<div>
  <img className="w-screen h-[570px] object-cover" src="header.png" alt="" />
</div>
 
 </header>
  );
};
 
export default UserHeader;