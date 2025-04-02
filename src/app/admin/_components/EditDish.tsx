"use client";
import { Button } from "@/components/ui/button";
import {  Image, Pencil, Trash, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { FoodType } from "./FilteredFood";
import { useState } from "react";
 
export const EditDish = ({ food, id }: { food: FoodType; id: string }) => {
  const [editFood, setEditFood] = useState<FoodType>(food);
 
  const editDish = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${food._id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(editFood),
    });
  };
 
  const onChange = (e: any) => {
    console.log("--", e.target.name, e.target.value);
    setEditFood({
      ...editFood,
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
        `https://api.cloudinary.com/v1_1/dg1tgxuba/upload`,
        {
          method: "POST",
          body: data,
        }
      );
 
      const dataJson = await response.json();
      setEditFood((prev: any) => ({ ...prev, image: dataJson.secure_url }));
    }
  };
 
  const removeImage = () => {
    setEditFood({ ...editFood, image: "" });
  };
 
  const deleteDish = async () =>{
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${food._id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE"
    });
  }
 
  return (
    <Dialog>
      <DialogTitle className=" text-center ">
        <DialogTrigger asChild>
          <Button variant={"outline"} className="rounded-full px-3 py-5">
            <Pencil color={"red"} />
          </Button>
        </DialogTrigger>
      </DialogTitle>
      <DialogContent className="flex flex-col gap-6 p-6">
        <DialogHeader className="pb-4 grid gap-4">
          <DialogTitle>Dishes info</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Label htmlFor="foodName" className="text-muted-foreground text-xs w-[120px]">Dish name</Label>
          <Input
            value={editFood?.name}
            id="foodName"
            name="name"
            type="text"
            placeholder="Type food name..."
            onChange={onChange}
          />
        </div>
        <div className="flex gap-4">
          <Label htmlFor="dishCategory" className="text-muted-foreground text-xs w-[120px]">Dish category</Label>
          <Input
            value={editFood?.category}
            id="dishCategory"
            name="name"
            type="text"
            placeholder="Type food name..."
            onChange={onChange}
          />
        </div>
        <div className="flex gap-4">
          <Label htmlFor="foodPrice" className="text-muted-foreground text-xs w-[120px]" >Food price</Label>
          <Input
            id="foodPrice"
            name="price"
            value={editFood?.price}
            type="number"
            placeholder="Enter price..."
            onChange={onChange}
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="ingredients" className="text-muted-foreground text-xs w-[120px]">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={editFood?.ingredients}
            rows={4}
            cols={50}
            className="border rounded-md py-2 px-4  text-sm font-normal "
            placeholder="List ingredients..."
            onChange={onChange}
          ></textarea>
        </div>
        <div className="flex  gap-1.5">
          <h1 className="text-muted-foreground text-xs w-[120px]">Food image</h1>
          {editFood?.image !== "" ? (
            <div
              className={`bg-cover bg-center rounded-md h-[138px] w-full flex justify-end p-4 `}
              style={{ backgroundImage: `url(${editFood.image})` }}
            >
              <Button
                variant="outline"
                className="rounded-full px-3 py-5"
                onClick={removeImage}
              >
                <X />
              </Button>
            </div>
          ) : (
            <div>
              <Label
                htmlFor="image"
                className={`h-[138px] w-full border border-dashed rounded-md bg-blue-50 flex flex-col items-center justify-center p-4 gap-2`}
              >
                <div className="rounded-full p-2 bg-background ">
                  <Image />
                </div>
 
                <h3 className="text-sm">
                  Choose a file or drag & drop it here
                </h3>
              </Label>
 
              <Input
                id="image"
                name="image"
                type="file"
                placeholder="Enter price..."
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          )}
        </div>
        <div className="w-full pt-6 flex justify-between">
          <DialogClose asChild>
            <Button variant='outline' className="border-red-500" onClick={deleteDish}><Trash color="red" strokeWidth={1.5}/></Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={editDish}>Edit dish</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
