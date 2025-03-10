import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import { Package, Clock, CheckCircle } from "lucide-react";

const mockData = {
  totalItems: 2451,
  lowStock: 18,
  pendingOrders: 64,
  completedOrders: 832,
  recentActivity: [
    {
      id: 1,
      title: "New inventory added",
      details: "SKU-234 added by John Doe",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Stock transfer",
      details: "Warehouse A to Warehouse B",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Order fulfilled",
      details: "Order #156879 completed",
      time: "8 hours ago",
    },
  ],
  pendingRequests: [
    { id: 1, type: "Stock Request", from: "Sarah Johnson" },
    { id: 2, type: "Purchase Approval", from: "Mike Chen" },
    { id: 3, type: "Access Request", from: "Lisa Park" },
  ],
};

const requests = [
  { id: 1, requestDate: "2023-10-01", status: "pending" },
  { id: 2, requestDate: "2023-10-02", status: "completed" },
  { id: 3, requestDate: "2023-10-03", status: "pending" },
  { id: 4, requestDate: "2023-10-04", status: "completed" },
  { id: 5, requestDate: "2023-10-05", status: "pending" },
];

const foodItems = [
    { id: 1, name: "Dog's Dry Food", quantity: 5, unit: "kg" },
    { id: 2, name: "Cat's Wet Food", quantity: 8, unit: "cans" },
];

export default function Dashboard() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");

  const stats = [
    {
      title: "Total Inventory Items",
      value: mockData.totalItems,
      icon: <Package className="w-8 h-8" />,
      color: "brand.500",
    },
    {
      title: "Low Stock Items",
      value: mockData.lowStock,
      icon: <Package className="w-8 h-8" />,
      color: "yellow.500",
    },
    {
      title: "Pending Requests",
      value: mockData.pendingOrders,
      icon: <Clock className="w-8 h-8" />,
      color: "orange.500",
    },
    {
      title: "Completed Requests",
      value: mockData.completedOrders,
      icon: <CheckCircle className="w-8 h-8" />,
      color: "green.500",
    },
  ];

  return (
    <Navbar>
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <Box>
          <Heading as="h1" size="lg" color={headingColor}>
            Dashboard
          </Heading>
          <Text color={textColor}>Overview of food distribution system</Text>
        </Box>

        <Box
          display="grid"
          gap={4}
          mt={6}
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {stats.map((stat) => (
            <Card
              key={stat.title}
              bg={cardBg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              shadow="sm"
              px={4}
            >
              <CardHeader
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={0}
              >
                <Text fontSize="sm" color={textColor}>
                  {stat.title}
                </Text>
                <Box color={stat.color}>{stat.icon}</Box>
              </CardHeader>
              <CardBody>
                <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
                  {stat.value}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Box>

        <Box
          display="grid"
          gap={4}
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          mt={6}
        >
          <Card
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            shadow="sm"
            px={6}
          >
            <CardHeader pb={0}>
              <Text fontSize="lg" fontWeight="semibold" color={headingColor}>
                Recent Food Requests
              </Text>
            </CardHeader>
            <CardBody>
              <Box>
                {requests.slice(0, 5).map((request) => (
                  <Box
                    key={request.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    py={2}
                  >
                    <Box>
                      <Text fontWeight="medium" color={headingColor}>
                        Request #{request.id}
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {new Date(request.requestDate).toLocaleDateString()}
                      </Text>
                    </Box>
                    <Box
                      px={2}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="medium"
                      bg={
                        request.status === "pending"
                          ? "yellow.100"
                          : "green.100"
                      }
                      color={
                        request.status === "pending"
                          ? "yellow.800"
                          : "green.800"
                      }
                      _dark={{
                        bg:
                          request.status === "pending"
                            ? "yellow.900"
                            : "green.900",
                        color:
                          request.status === "pending"
                            ? "yellow.200"
                            : "green.200",
                      }}
                    >
                      {request.status}
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardBody>
          </Card>

          <Card
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            shadow="sm"
            px={6}
          >
            <CardHeader pb={0}>
              <Text fontSize="lg" fontWeight="semibold" color={headingColor}>
                Low Stock Items
              </Text>
            </CardHeader>
            <CardBody>
              <Box>
                {foodItems
                  .filter((item) => item.quantity < 10)
                  .slice(0, 5)
                  .map((item) => (
                    <Box
                      key={item.id}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      py={2}
                    >
                      <Box>
                        <Text fontWeight="medium" color={headingColor}>
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color={textColor}>
                          {item.quantity} {item.unit} remaining
                        </Text>
                      </Box>
                      <Text color="red.500" fontWeight="medium">
                        Low Stock
                      </Text>
                    </Box>
                  ))}
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </Navbar>
  );
}
