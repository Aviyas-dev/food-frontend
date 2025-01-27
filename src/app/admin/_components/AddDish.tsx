import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Plus, Image } from "lucide-react";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { useState } from "react";
  
   
  interface AddDishProps {
    categoryName: string,
    _id: string
  }
   
  export const AddDish = ({ categoryName,_id }: AddDishProps) => {
    const [food, setFood] = useState({
      name: "",
      price: 0,
      ingredients: "",
      image: "",
      category: _id,
    });
   
    const addDish = async () => {
      await fetch("http://localhost:8000/food/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(food),
      });
    };
   
    const onChange = (e: any) => {
      console.log("--", e.target.name, e.target.value);
      setFood({
        ...food,
        [e.target.name]: e.target.value,
      });
    };
   
    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
   
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "food-delivery");
   
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dh2wfy12t/upload`,
          {
            method: "POST",
            body: data,
          }
        );
   
        const dataJson = await response.json();
        setFood((prev: any) => ({ ...prev, image: dataJson.secure_url }));
      }
    };
   
    return (
      <Dialog>
        <DialogTitle className=" text-center ">
          <DialogTrigger asChild>
            <Button variant="destructive" className="rounded-full p-[10px]">
              <Plus />
            </Button>
          </DialogTrigger>
          <div className="text-center text-sm font-medium mt-6 ">
            <h4>Add new Dish to </h4>
            <h4>{categoryName}</h4>
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col gap-6 p-6">
          <DialogHeader className="pb-4 grid gap-4">
            <DialogTitle>Add new dish to {categoryName}</DialogTitle>
          </DialogHeader>
          <div className="flex gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="foodName">Food name</Label>
              <Input
                value={food.name}
                id="foodName"
                name="name"
                type="text"
                placeholder="Type food name..."
                onChange={onChange}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="foodPrice">Food price</Label>
              <Input
                id="foodPrice"
                name="price"
                type="number"
                placeholder="Enter price..."
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-full  gap-1.5">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              rows={4}
              cols={50}
              className="border rounded-md py-2 px-4  text-sm font-normal "
              placeholder="List ingredients..."
              onChange={onChange}
            ></textarea>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <h1 className="text-sm">Food image</h1>
            {food.image !== "" ? (
              <div
                className={`bg-cover bg-center rounded-md h-[138px] `}
                style={{ backgroundImage: `url(${food.image})` }}
              ></div>
            ) : (
              <Label
                htmlFor="image"
                className={`h-[138px] border border-dashed rounded-md bg-blue-50 flex flex-col items-center justify-center p-4 gap-2`}
              >
                <div className="rounded-full p-2 bg-background ">
                  <Image />
                </div>
                <h3 className="text-sm">Choose a file or drag & drop it here</h3>
              </Label>
            )}
   
            <Input
              id="image"
              name="image"
              type="file"
              placeholder="Enter price..."
              className="hidden"
              onChange={handleUpload}
            />
          </div>
          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  addDish();
                }}
              >
                Add dish
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };