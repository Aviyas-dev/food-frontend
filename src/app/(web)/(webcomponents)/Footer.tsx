"use client";


import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Facebook, Instagram } from "lucide-react";





export const Footer = () => {
    
return (
    <footer className="bg-black text-white py-8 mt-10">
      {/* Carousel Section */}
      <div className="bg-red-500 py-3 overflow-hidden">
      <Carousel

plugins={[
    
    Autoplay({
      delay: 3000,
        
    }),
  ]}

      >
          <CarouselContent className="flex text-white font-semibold text-lg justify-center ">
            <CarouselItem className="text-center px-4">Fresh fast delivered</CarouselItem>
            <CarouselItem className="text-center px-4">Fresh fast delivered</CarouselItem>
            <CarouselItem className="text-center px-4">Fresh fast delivered</CarouselItem>
          </CarouselContent>
        </Carousel>

      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        {/* Logo & Info */}
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <span className="text-red-500">Nom</span>Nom
          </h2>
          <p className="text-gray-400">Swift delivery</p>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-gray-500 uppercase text-sm">NomNom</h3>
            <ul className="text-white text-sm space-y-2">
              <li>Home</li>
              <li>Contact us</li>
              <li>Delivery zone</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-500 uppercase text-sm">Menu</h3>
            <ul className="text-white text-sm space-y-2">
              <li>Appetizers</li>
              <li>Salads</li>
              <li>Pizzas</li>
              <li>Main dishes</li>
              <li>Desserts</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-500 uppercase text-sm">More</h3>
            <ul className="text-white text-sm space-y-2">
              <li>Side dish</li>
              <li>Brunch</li>
              <li>Desserts</li>
              <li>Beverages</li>
              <li>Fish & Sea foods</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-gray-500 uppercase text-sm">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <Facebook className="text-white w-6 h-6" />
            <Instagram className="text-white w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 text-gray-500 text-sm text-center py-4">
        <p>Copy right 2024 © Nomnom LLC</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#">Privacy policy</a>
          <a href="#">Terms and conditions</a>
          <a href="#">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
};
