import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/layout/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/layout/card";
import { Drawer, DrawerClose, DrawerContent } from "../ui/layout/drawer";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const onClick = (adjustment: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + adjustment;
      return Math.max(1, Math.min(newQuantity, 10));
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Add to Cart</CardTitle>
            <CardDescription>
              Set the quantity you want to add to your cart.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-5xl font-bold tracking-tighter">
                  {quantity}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Quantity
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(1)}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={onClose}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
        <DrawerClose asChild>
          <Button variant="outline" className="absolute top-4 right-4">
            Close
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(true);

  return (
    <div>
      <section className="product-section">
        {/* Conditionally render the overlay and Popup */}
        {isPopupVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Popup
              isOpen={isPopupVisible}
              onClose={() => setPopupVisible(false)}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
