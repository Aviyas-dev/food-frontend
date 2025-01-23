import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
    
      <div className="bg-red-500 text-center py-3 text-lg font-semibold">
        Fresh fast delivered
      </div>

     
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="flex flex-col items-start">
        <img src="Logo.png"  />
        </div>

       
        <div>
          <h4 className="font-semibold text-gray-300 mb-4">NOMNOM</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Home</li>
            <li>Contact us</li>
            <li>Delivery zone</li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-gray-300 mb-4">MENU</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400">
            <li>Appetizers</li>
            <li>Salads</li>
            <li>Pizzas</li>
            <li>Main dishes</li>
            <li>Desserts</li>
            <li>Side dish</li>
            <li>Brunch</li>
            <li>Beverages</li>
            <li>Fish & Sea foods</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-300 mb-4">FOLLOW US</h4>
          <div className="flex space-x-4">
            <a
            //   href="facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              
              <img src="Facebook.png"  />
            </a>
            <a
            //   href="instagram"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              
              <img src="instagram.png"  />
            </a>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © 2024 NomNom LLC | Privacy policy | Terms and condition | Cookie policy
      </div>
    </footer>
  );
};

export default Footer;
