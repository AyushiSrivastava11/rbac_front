"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderDetails from "./OrderDetails";
import Autoplay from "embla-carousel-autoplay";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvC1pGhW7_BRwnGuBguLE99tfA0faYflekCA&s",
  "https://t3.ftcdn.net/jpg/06/16/85/60/360_F_616856040_zCvPMQkPFOWsVb3Hxo7mQUYzlzciFCZs.jpg",
  "https://www.kitchensanctuary.com/wp-content/uploads/2020/12/Quick-Chicken-Ramen-square-FS-22.jpg",
  "https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=",
];

export default function OrderCard() {
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const handleButtonClick = () => {
    setOrderDetailsOpen(!isOrderDetailsOpen);
  };
  const handleCloseDialog = () => {
    setOrderDetailsOpen(false);
  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardContent>
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
        <CardContent>
          <p className="text-gray-500">Name : Worksmate Core2Cloud</p>
          <p className="text-gray-500">Phone : 7845126985</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleButtonClick}>
            Order Details
          </Button>
        </CardFooter>
      </Card>
      {isOrderDetailsOpen && <OrderDetails onClose={handleCloseDialog} />}
    </>
  );
}
