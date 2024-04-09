"use client";
import { useParams, useRouter } from "next/navigation";
import hospitalsDataOffline from "@/hospitalData";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  RadioCards,
  Select,
  Text,
} from "@radix-ui/themes";
import { CiCreditCard1 } from "react-icons/ci";
import { GiCash } from "react-icons/gi";
import { IoQrCodeOutline } from "react-icons/io5";
import axios from "axios";
import { HospitalDataT } from "./page";

export const FormPage = () => {
  const router = useRouter();
  const searchParams = useParams();
  const [hospitalsData, setHospitalsData] = useState<HospitalDataT[]>([]);
  const [submitting, setIsSubmitting] = useState(false);

  const hospitalOffline = hospitalsDataOffline.find(
    (hos) => hos.H_No === searchParams.id
  );

  // Check if hospitalOffline exists
  const hospital = hospitalOffline
    ? hospitalOffline
    : hospitalsData.find((hos) => hos.H_No === searchParams.id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    adharNumber: "",
    payment: "",
    facilities: "",
    problem: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await axios.post(`/api/book`, data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("Something went wrong");
      e.preventDefault();
    }

    console.log(formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/hospital");
        const data: HospitalDataT[] = response.data;
        setHospitalsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Container size="3">
        <Grid gap="5" justify={"center"} columns={{ initial: "1", md: "2" }}>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            {hospital?.Image ? (
              <Image
                className="rounded-2xl p-2"
                src={hospital?.Image}
                width={400}
                height={400}
                alt={`${hospital?.Hospital_Name}`}
              />
            ) : (
              <Image
                className="rounded-2xl p-2"
                src="/images/h_three.jpg"
                width={400}
                height={400}
                alt={`${hospital?.Hospital_Name}`}
              />
            )}
            <Text>
              <span className="font-semibold text-sm">
                {hospital?.Hospital_Name}
              </span>
              , {hospital?.Place}
            </Text>
            <Box width={"70%"} mt={"5"}>
              <Card>
                <Flex gap="3" align="center">
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      Doctors Currently Avaliable {hospital?.Total_Doctors}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      Total Bed Available {hospital?.Total_Beds}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      Ratings {hospital?.Stars}⭐
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </Flex>
          <form
            onSubmit={handleSubmit}
            className="container w-full flex p-3 space-y-4"
          >
            <div className="">
              <Flex width={"100%"} gap={"5"}>
                <div className="w-full">
                  <label htmlFor="name" className="block mb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="block mb-1">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </Flex>

              <div>
                <label htmlFor="address" className="block mb-1">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="adharNumber" className="block mb-1">
                  Aadhar Number:
                </label>
                <input
                  type="number"
                  id="adharNumber"
                  name="adharNumber"
                  value={formData.adharNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <Box className="space-y-4" mt={"2"} maxWidth="600px">
                <RadioCards.Root
                  onValueChange={(val) => {
                    setFormData((prevData) => ({ ...prevData, payment: val }));
                  }}
                  defaultValue="1"
                  columns={{ initial: "1", sm: "3" }}
                >
                  <RadioCards.Item value="1">
                    <Flex
                      justify={"center"}
                      align={"center"}
                      gap={"3"}
                      width="50%"
                    >
                      <Text weight="bold">Cash</Text>
                      <GiCash size={25} />
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="2">
                    <Flex
                      justify={"center"}
                      align={"center"}
                      gap={"3"}
                      width="50%"
                    >
                      <Text weight="bold">Card</Text>
                      <CiCreditCard1 size={30} />
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="3">
                    <Flex
                      justify={"center"}
                      align={"center"}
                      gap={"3"}
                      width="50%"
                    >
                      <Text weight="bold">Upi</Text>
                      <IoQrCodeOutline size={25} />
                    </Flex>
                  </RadioCards.Item>
                </RadioCards.Root>
                <Flex gap={"4"}>
                  <Select.Root
                    onValueChange={(val) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        facilities: val,
                      }));
                    }}
                    defaultValue="General"
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="General">General</Select.Item>
                        <Select.Item value="Premium Single Bed">
                          Premium Single Bed
                        </Select.Item>
                        <Select.Item value="Premium Two Bed">
                          Premium Two Bed
                        </Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Box>
              <div>
                <label htmlFor="problem" className="block mb-1">
                  Problem:
                </label>
                <input
                  type="text"
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-1">
                  Description of Problem:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <Button type="submit" className="max-w-lg">
                Submit
              </Button>
            </div>
          </form>
        </Grid>
      </Container>
    </Box>
  );
};
