import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import dataFetch from '@/services/data-services';

interface Image {
  _id: string;
  productImage: string;
}

interface ImageManagerProps {
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  onclose: () => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({ setImage, onclose }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for controlling dialog visibility

  // Fetch images from API
  const fetchImages = async () => {
    try {
      const endRoute = "/admin/image/getImage";
      const token = localStorage.getItem("adminToken");
      const response = await dataFetch(endRoute, "GET", {}, token!);
      setImages((response as { data: Image[] }).data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Add new image
  const addImage = async () => {
    if (!newImage) return;

    try {
      const formData = new FormData();
      formData.append('image', newImage);

      const endRoute = "/admin/image/addImage";
      const token = localStorage.getItem("adminToken");
      const response = await dataFetch(endRoute, "POST", formData, token!);

      // Fetch updated image list after adding the new image
      fetchImages();

      // Close the dialog after successfully adding the image
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  // Delete an image
  const deleteImage = async (imageId: string) => {
    try {
      const endRoute = `/admin/image/deleteImage/${imageId}`;
      const token = localStorage.getItem("adminToken");
      const response = await dataFetch(endRoute, "DELETE", {}, token!);
      console.log("Image deleted:", response);
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const selectImage = (imageId: string) => {
    // Find the image by id
    const selectedImage = images.find((image) => image._id === imageId);
  
    // If found, pass it to the parent component via setImage
    if (selectedImage) {
      const imageFile = selectedImage.productImage; 
      setImage(imageFile); // Pass the image URL
      console.log("Selected image:", selectedImage);
      onclose(); // Close the dialog
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="image-manager">
      {/* Add Image Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Add New Image</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
            <DialogDescription>
              Upload an image to be added to your image collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="image-upload" className="text-right">
                Upload Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={addImage}
              className="bg-green-500"
            >
              Add Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h2 className="text-xl font-semibold mb-4">Manage Images</h2>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
        {images.map((image) => (
          <div
            key={image._id}
            className="relative group w-full h-64 max-h-[100px] overflow-hidden bg-gray-200"
          >
            <img
              src={image.productImage}
              alt={`Image ${image._id}`}
              className="w-full h-full object-contain rounded-md"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 flex justify-center items-center transition-opacity">
              <div className="flex gap-2">
                <Button
                  onClick={() => selectImage(image._id)}
                  className="bg-blue-500 text-white"
                >
                  Select
                </Button>
                <Button
                  onClick={() => deleteImage(image._id)}
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageManager;
