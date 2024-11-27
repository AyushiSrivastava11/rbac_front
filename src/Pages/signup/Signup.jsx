// import React, { useState, useContext } from "react";
// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Checkbox,
//   Stack,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import background from "../Assets/signin-left.svg";
// import backgroundright from "../Assets/signin-right.svg";
// import logo from "../Assets/dineflow full.png";
// import {AuthContext} from '../../context/AuthContext.jsx';
// import { axiosInstance } from "../../axioshelper/Axiosinstance.js";

// export default function SimpleCard() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const {setUser}=useContext(AuthContext);
//   const handleLogin = async () => {
//     try {
//       const response = await axiosInstance.post("/admin/login", { email, password });
//       console.log(response.data);

//       if (response.status === 200) {

//         console.log(response.data.token);

//         window.localStorage.setItem("token", response.data.token);
//          setUser(response.data?.admin)

//         toast.success("Login successful! Redirecting...", {
//           position: "top-right",
//           autoClose: 3000,
//         });

//     }} catch (error) {
//       console.log(error);
//       const errorMessage = error.response?.data?.message || "An error occurred while logging in";
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 5000,
//       });
//   };
// }

//   return (
//     <Flex minH={"100vh"} direction="row">
//       <Box
//         flex="1"
//         backgroundImage={`url(${background})`}
//         backgroundSize="cover"
//         backgroundPosition="center"
//         backgroundRepeat="no-repeat"
//       />
//       <Box
//         flex="1"
//         backgroundImage={`url(${backgroundright})`}
//         backgroundSize="cover"
//         backgroundPosition="center"
//         backgroundRepeat="no-repeat"
//       />
//       <Flex
//         position="absolute"
//         left="50%"
//         top="50%"
//         transform="translate(-50%, -50%)"
//         align="center"
//         justify="center"
//         width="full"
//         height="full"
//         zIndex={1}
//       >
//         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//           <Box
//             rounded={"lg"}
//             bg={useColorModeValue("white", "gray.700")}
//             boxShadow={"lg"}
//             p={8}
//             width="full"
//           >
//             <Stack spacing={4} align="center">
//               <Heading fontSize={"3xl"} mb={4}>
//                 <img src={logo} alt="Logo" height={180} width={180} />
//               </Heading>
//               <FormControl id="email">
//                 <FormLabel>Email address</FormLabel>
//                 <Input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </FormControl>
//               <FormControl id="password">
//                 <FormLabel>Password</FormLabel>
//                 <Input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </FormControl>
//               <Stack spacing={10}>
//                 <Stack
//                   direction={{ base: "column", sm: "row" }}
//                   align={"start"}
//                   justify={"space-between"}
//                 >
//                   <Checkbox>Remember me</Checkbox>
//                   <Text color={"blue.400"}>Forgot password?</Text>
//                 </Stack>
//                 <Button
//                   bg={"green.300"}
//                   color={"white"}
//                   _hover={{ bg: "blue.500" }}
//                   onClick={handleLogin}
//                 >
//                   Sign in
//                 </Button>
//               </Stack>
//             </Stack>
//           </Box>
//         </Stack>
//       </Flex>
//       <ToastContainer />
//     </Flex>
//   );
// }

import React, { useState, useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import background from "../Assets/signin-left.svg";


import logo from "../Assets/dineflow full.png";
import { AuthContext } from "../../context/AuthContext.jsx";
import { axiosInstance } from "../../axioshelper/Axiosinstance.js";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });
      console.log(response.data);

      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
        setUser(response.data?.admin);

        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "An error occurred while logging in";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <Flex minH="100vh" direction={{ base: "column", lg: "row" }}>
      {/* Left Section - Quoting */}
      <Flex
        flex="1"
        bg={useColorModeValue("gray.50", "gray.800")}
        p={10}
        direction="column"
        align="center"
        justify="center"
      >
        {/* Logo */}
        <Box mb={6}>
          <img src={logo} alt="DINEFLOW Logo" height={250} width={250} />
        </Box>

        {/* Centered Content */}
        <Box textAlign="center">
          {/* <Heading as="h1" size="lg" mb={4}>
            DINEFLOW
          </Heading> */}
          <Text fontSize="md">
            &ldquo;The best Restaurant Management System for you&rdquo;
          </Text>
        </Box>

        {/* Footer */}
        <Box mt={10} textAlign="center">
          <Text fontSize="sm" color="gray.500">
            &copy; {new Date().getFullYear()} DINEFLOW. All rights reserved.
          </Text>
        </Box>
      </Flex>

      {/* Right Section - Signup Form */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        p={6}
        bg={useColorModeValue("#3cad4f42", "gray.900")}
      >
        <Box
          maxW="lg"
          w="full"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          rounded="lg"
          p={8}
        >
          <Stack spacing={6} align="center">
            {/* <img src={logo} alt="Logo" height={100} width={100} /> */}
            <Heading fontSize="2xl">Create an account</Heading>
            <Text fontSize="sm" color="gray.500">
              Enter your email below to create your account
            </Text>
          </Stack>
          <Stack spacing={4} mt={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={5}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              >
                <Checkbox>Remember me</Checkbox>
                <Text color="blue.400" as="a" href="#">
                  Forgot password?
                </Text>
              </Stack>
              <Button
                bg="green.300"
                color="white"
                _hover={{ bg: "blue.500" }}
                onClick={handleLogin}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
          <Text mt={4} fontSize="sm" textAlign="center" color="gray.500">
            Already have an account?{" "}
            <Text
              as="a"
              href="/login"
              color="blue.400"
              textDecoration="underline"
            >
              Login Here.
            </Text>
          </Text>
        </Box>
      </Flex>
      <ToastContainer />
    </Flex>
  );
}
