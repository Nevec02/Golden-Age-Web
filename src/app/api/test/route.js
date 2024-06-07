import { 
    getServices, 
    getService, 
    postService, 
    updateService, 
    deleteService,
    getUserFromDb,
    getUsers,
    postUser,
    updateRole,
    deleteUser,
    getOrders,
    getOrdersByUserId,
    getOrderDetails,
    createOrder
  } from '@/libs/data';
  
  // Helper function to log results
  const logResult = (operation, result) => {
    console.log(`Operation: ${operation}, Result:`, result);
  };
  
  // Test user functions
  const testUserFunctions = async () => {
    try {
      // Create a new user
      const userName = 'Test User';
      const userEmail = 'test@example.com';
      const userPassword = 'password123';
      await postUser(userName, userEmail, userPassword);
      logResult('postUser', 'User created successfully');
  
      // Get users
      const users = await getUsers();
      logResult('getUsers', users);
  
      // Get user by email and password
      const user = await getUserFromDb(userEmail, userPassword);
      logResult('getUserFromDb', user);
  
      // Update user role
      const userId = user.id;
      await updateRole(userId, 1);
      logResult('updateRole', 'User role updated successfully');
  
      // Delete user
      await deleteUser(userId);
      logResult('deleteUser', 'User deleted successfully');
    } catch (error) {
      console.error('Error testing user functions:', error);
    }
  };
  
  // Test service functions
  const testServiceFunctions = async () => {
    try {
      // Create a new service
      const serviceData = {
        name: 'Test Service',
        description: 'This is a test service',
        price: 100.0,
      };
      await postService(serviceData);
      logResult('postService', 'Service created successfully');
  
      // Get all services
      const services = await getServices();
      logResult('getServices', services);
  
      // Get service by ID
      const serviceId = services[0].id;
      const service = await getService(serviceId);
      logResult('getService', service);
  
      // Update service
      const updatedServiceData = {
        name: 'Updated Test Service',
        description: 'This is an updated test service',
        price: 150.0,
        image: 'updated_image.jpg',
        active: true,
      };
      await updateService(updatedServiceData, serviceId);
      logResult('updateService', 'Service updated successfully');
  
      // Delete service
      await deleteService(serviceId);
      logResult('deleteService', 'Service deleted successfully');
    } catch (error) {
      console.error('Error testing service functions:', error);
    }
  };
  
  // Test order functions
  const testOrderFunctions = async () => {
    try {
      // Create a new user for the order
      const userName = 'Order User';
      const userEmail = 'orderuser@example.com';
      const userPassword = 'password123';
      await postUser(userName, userEmail, userPassword);
      const user = await getUserFromDb(userEmail, userPassword);
  
      // Create a new service for the order
      const serviceData = {
        name: 'Order Service',
        description: 'This is a service for orders',
        price: 50.0,
      };
      await postService(serviceData);
      const services = await getServices();
      const serviceId = services[0].id;
  
      // Create a new order
      const orderData = {
        user_id: user.id,
        total_price: 100.0,
        details: [
          {
            service_id: serviceId,
            quantity: 2,
            price: 50.0,
          },
        ],
      };
      const newOrder = await createOrder(orderData);
      logResult('createOrder', newOrder);
  
      // Get orders
      const orders = await getOrders();
      logResult('getOrders', orders);
  
      // Get orders by user ID
      const userOrders = await getOrdersByUserId(user.id);
      logResult('getOrdersByUserId', userOrders);
  
      // Get order details
      const orderDetails = await getOrderDetails(newOrder.orderId);
      logResult('getOrderDetails', orderDetails);
    } catch (error) {
      console.error('Error testing order functions:', error);
    }
  };
  
  // Run all tests
  const runTests = async () => {
    await testUserFunctions();
    await testServiceFunctions();
    await testOrderFunctions();
  };
  
  runTests();
  