import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getVehicleTypes = async (wheelCount) => {
  try {
    const response = await apiClient.get(`/vehicle-types?wheels=${wheelCount}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    throw error;
  }
};

export const getVehiclesByType = async (typeId) => {
  try {
    const response = await apiClient.get(`/vehicles?typeId=${typeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

export const checkVehicleAvailability = async (vehicleId, startDate, endDate) => {
  try {
    const response = await apiClient.get(`/bookings/check-availability`, {
      params: { vehicleId, startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export default {
  getVehicleTypes,
  getVehiclesByType,
  checkVehicleAvailability,
  createBooking
};