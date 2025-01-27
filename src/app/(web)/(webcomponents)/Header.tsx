import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/app/admin/_components/Logo"


export const Header = () => {
  return (
    <div className="py-3 px-[88px] flex bg-primary text-primary-foreground justify-between">
      <Link href={`/`}>
      <div className="flex gap-2">
        <div>
          <Logo />
        </div>
        <div>
          <h1 className="text-lg font-semibold">
            Nom<span className="text-red-500">Nom</span>
            </h1>
            <h2 className="text-xs text-muted-foreground">Swift delivery</h2>
      </div>
    </div>
    </Link>
    <div className="flex gap-3 items-center">
      <div>
        <Label
        htmlFor="address"
        className="bg-background rounded-full py-2 px-3 flex items-center gap-1"
        >
         <MapPin color="red" strokeWidth={1.5} />
         <h3 className="text-red-500">Delivery address:</h3>
         <h3 className="text-gray-500">Add location</h3>
         <ChevronRight color={`gray`} strokeWidth={1.5} size={18}/>
        </Label>
        <Input id="address" type="address" className="hidden"/>  
         </div>
         <button className="bg-secondary text-secondary-foreground rounded-full p-3">
          <ShoppingCart size={15} />{" "}
         </button>
         <Popover>
          <PopoverTrigger className="bg-red-500 text-primary-foreground rounded-full px-3 py-[11px] flex items-center">
            <User size={18} strokeWidth={1.5} />
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here</PopoverContent>
         </Popover>
    </div>
  </div>
  );
};