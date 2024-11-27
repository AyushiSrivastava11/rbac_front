import { React, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import plus from "../components/Assets/plus (1).png";
import Adddialog from "../components/Waiter-dialog/Adddialog";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image
} from "@chakra-ui/react";


function Plusbutton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Card maxW='sm' h='250px' w='250px'>
        <CardBody>
          <Image
            src={plus}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            onClick={() => setIsModalOpen(true)}

          />

        </CardBody>



      </Card>
      <Adddialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      // onAdd={handleAdd}
      />
    </>
  )
}
export default Plusbutton;