import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function OrderDetails({ onClose }) {
  // Example data
  const orderItems = [
    { name: "Momo", price: 50, quantity: "1 plate" },
    { name: "Chowmein", price: 100, quantity: "1 plate" },
    { name: "Pizza", price: 99, quantity: "regular" },
    { name: "Burger", price: 100, quantity: "regular" },
  ];

  // Calculate totals
  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);
  const gst = 0.03 * totalAmount; // Assuming 3% GST
  const grandTotal = totalAmount + gst;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            View and manage the details of your order here. Once clicked on the
            done button, the order will be marked as completed.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="grid grid-cols-3 gap-4 border-b pb-2">
            <div className="font-bold">Item</div>
            <div className="font-bold">Price</div>
            <div className="font-bold">Quantity</div>
          </div>
          {orderItems.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 py-2">
              <div>{item.name}</div>
              <div>Rs.{item.price}</div>
              <div>{item.quantity}</div>
            </div>
          ))}
          <div className="border-t mt-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-bold">Total</div>
              <div>Rs.{totalAmount}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="font-bold">GST (3%)</div>
              <div>Rs.{gst.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 font-bold text-lg mt-2">
              <div>Grand Total</div>
              <div>Rs.{grandTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button style={{ backgroundColor: "green" }} onClick={onClose}>
            Mark as done
          </Button>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
