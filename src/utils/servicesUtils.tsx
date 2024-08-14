import {Service, ServiceName, ServicePrice} from "../types/servicesTypes.tsx";export const getServices = async (): Promise<Service[]> => {	// In a real application, you'd fetch this from your API	// For this example, we'll return mock data	return [		{ name: ServiceName.CHECK_IN_CHECK_OUT, price: ServicePrice.PRICE_30 },		{ name: ServiceName.LUGGAGE_STORAGE, price: ServicePrice.PRICE_20 },		{ name: ServiceName.AIRPORT_TRANSFER, price: ServicePrice.PRICE_60 },		{ name: ServiceName.LOCAL_TOUR_GUIDE, price: ServicePrice.PRICE_100 },		{ name: ServiceName.MEAL_DELIVERY, price: ServicePrice.PRICE_40 },		{ name: ServiceName.HOUSEKEEPING, price: ServicePrice.PRICE_50 },		{ name: ServiceName.LAUNDRY_SERVICE, price: ServicePrice.PRICE_30 },		{ name: ServiceName.BIKE_RENTAL, price: ServicePrice.PRICE_25 },		{ name: ServiceName.CHILDCARE, price: ServicePrice.PRICE_80 },		{ name: ServiceName.PET_SITTING, price: ServicePrice.PRICE_45 },		{ name: ServiceName.PROPERTY_PHOTOGRAPHY, price: ServicePrice.PRICE_150 },		{ name: ServiceName.LISTING_OPTIMIZATION, price: ServicePrice.PRICE_200 },		{ name: ServiceName.PRICE_MANAGEMENT, price: ServicePrice.PRICE_100 },		{ name: ServiceName.GUEST_SCREENING, price: ServicePrice.PRICE_50 },		{ name: ServiceName.MAINTENANCE_COORDINATION, price: ServicePrice.PRICE_120 },		{ name: ServiceName.DEEP_CLEANING, price: ServicePrice.PRICE_180 },		{ name: ServiceName.TAX_PREPARATION, price: ServicePrice.PRICE_300 },		{ name: ServiceName.INSURANCE_MANAGEMENT, price: ServicePrice.PRICE_250 },		{ name: ServiceName.LEGAL_CONSULTATION, price: ServicePrice.PRICE_400 },		{ name: ServiceName.MARKETING_BOOST, price: ServicePrice.PRICE_350 },	];};