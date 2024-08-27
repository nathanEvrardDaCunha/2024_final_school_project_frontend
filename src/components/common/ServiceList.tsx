import React, { useState, useEffect } from 'react';import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';import { loadStripe } from '@stripe/stripe-js';import { Service } from "../../types/servicesTypes.tsx";import {getUserStatus, getToken, getUserId} from "../../utils/jwt.tsx";import { getServices, bookService } from "../../utils/servicesUtils.tsx";import Header from "../layout/header/Header.tsx";import Footer from "../layout/Footer.tsx";import {getUserReservations, ReservationWithLocation} from "../../hooks/adminLocationService.tsx";import SuccessMessage from "./SucessMessage.tsx";import WarningMessage from "./WarningMessage.tsx";import ErrorMessage from "./ErrorMessage.tsx";const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);const serviceIcons: { [key: string]: string } = {	CHECK_IN_CHECK_OUT: '🔑',	LUGGAGE_STORAGE: '🧳',	AIRPORT_TRANSFER: '🚗',	LOCAL_TOUR_GUIDE: '🗺️',	MEAL_DELIVERY: '🍽️',	HOUSEKEEPING: '🧹',	LAUNDRY_SERVICE: '🧺',	BIKE_RENTAL: '🚲',	CHILDCARE: '👶',	PET_SITTING: '🐾',	PROPERTY_PHOTOGRAPHY: '📸',	LISTING_OPTIMIZATION: '📊',	PRICE_MANAGEMENT: '💰',	GUEST_SCREENING: '🔍',	MAINTENANCE_COORDINATION: '🔧',	DEEP_CLEANING: '🧼',	TAX_PREPARATION: '📑',	INSURANCE_MANAGEMENT: '🛡️',	LEGAL_CONSULTATION: '⚖️',	MARKETING_BOOST: '📣'};const ServiceList: React.FC = () => {	const [services, setServices] = useState<Service[]>([]);	const [isRentor, setIsRentor] = useState(false);	const [isLoading, setIsLoading] = useState(true);	const [error, setError] = useState<string | null>(null);	const [success, setSuccess] = useState<string | null>(null);	const [warning, setWarning] = useState<string | null>(null);	const [selectedService, setSelectedService] = useState<Service | null>(null);	const [userReservations, setUserReservations] = useState<ReservationWithLocation[]>([]);	const [selectedReservation, setSelectedReservation] = useState<ReservationWithLocation | null>(null);	const [showReservationModal, setShowReservationModal] = useState(false);	const [showPaymentModal, setShowPaymentModal] = useState(false);	const [clientSecret, setClientSecret] = useState<string | null>(null);	const [freeServiceUsed, setFreeServiceUsed] = useState(false);		useEffect(() => {		const fetchData = async () => {			try {				// Fetch user status				const userStatus = await getUserStatus();				setIsRentor(userStatus === 'RENTER');								// Fetch services				const fetchedServices = await getServices();				setServices(fetchedServices);								// Fetch user reservations				const reservations = await getUserReservations();				setUserReservations(reservations);								// Fetch user's free service status				const userId = getUserId();				if (userId) {					const response = await fetch(`${import.meta.env.VITE_API_URL}/services/free-service-status`, {						headers: {							'Authorization': `Bearer ${getToken()}`						}					});					if (response.ok) {						const data = await response.json();						setFreeServiceUsed(data.freeServiceUsed);					} else {						throw new Error('Failed to fetch free service status');					}				}			} catch (err) {				setError(err instanceof Error ? err.message : 'An unknown error occurred');			} finally {				setIsLoading(false);			}		};				fetchData();	}, []);		const handleServiceSelect = async (service: Service) => {		const userStatus = await getUserStatus();		const isEligibleForFreeService =			(userStatus === 'EXPLORATOR_MONTHLY' || userStatus === 'EXPLORATOR_YEARLY' ||				userStatus === 'BAGPACKER_MONTHLY' || userStatus === 'BAGPACKER_YEARLY') &&			!freeServiceUsed;				setSelectedService(service);		if (isEligibleForFreeService) {			setWarning("You're eligible for one free service. This will be applied automatically.");		}		setShowReservationModal(true);	};		const handleReservationSelect = (reservation: ReservationWithLocation) => {		setSelectedReservation(reservation);		setShowReservationModal(false);		initiatePayment(reservation.id);	};		const initiatePayment = async (reservationId: number) => {		if (selectedService) {			try {				const token = getToken();				if (!token) {					throw new Error('No authentication token found');				}								const response = await fetch(`${import.meta.env.VITE_API_URL}/services/create-payment-intent`, {					method: 'POST',					headers: {						'Content-Type': 'application/json',						'Authorization': `Bearer ${token}`					},					body: JSON.stringify({						serviceId: selectedService.name,						reservationId: reservationId					}),				});								if (!response.ok) {					throw new Error(`HTTP error! status: ${response.status}`);				}								const data = await response.json();				setClientSecret(data.clientSecret);				setShowPaymentModal(true);			} catch (err) {				setError(err instanceof Error ? err.message : 'Failed to initiate payment. Please try again.');			}		}	};		const PaymentModal = () => {		const stripe = useStripe();		const elements = useElements();				const handlePayment = async (event: React.FormEvent) => {			event.preventDefault();						if (!stripe || !elements || !selectedService || !selectedReservation) {				return;			}						const result = await stripe.confirmPayment({				elements,				redirect: 'if_required'			});						if (result.error) {				setError(result.error.message || 'Payment failed. Please try again.');			} else {				try {					await bookService(selectedService.name, selectedReservation.id);					setError(null);					setSelectedService(null);					setSelectedReservation(null);					setShowPaymentModal(false);					setSuccess('Payment successful! Service booked.');				} catch (err) {					setError('Payment successful, but failed to book service. Please contact support.');				}			}		};				return (			<div className="modal modal-open">				<div className="modal-box">					<h3 className="font-bold text-lg">Complete Payment</h3>					<form onSubmit={handlePayment}>						<PaymentElement />						<div className="modal-action">							<button type="submit" className="btn btn-primary">Pay Now</button>							<button type="button" className="btn" onClick={() => setShowPaymentModal(false)}>Cancel</button>						</div>					</form>				</div>			</div>		);	};		if (isLoading) {		return (			<div className="flex justify-center items-center h-screen">				<span className="loading loading-spinner loading-lg"></span>			</div>		);	}		const displayedServices = isRentor ? services.slice(-10) : services.slice(0, 10);		return (		<div className="flex flex-col min-h-screen bg-base-200">			<Header />			<main className="flex-grow container mx-auto px-4 py-8">				<h1 className="text-4xl font-bold text-center mb-12">Available Services</h1>				{error && <ErrorMessage message={error} />}				{success && <SuccessMessage message={success} />}				{warning && <WarningMessage message={warning} />}				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">					{displayedServices.map((service, index) => (						<div key={index} className="card bg-base-100 shadow-xl">							<div className="card-body">								<div className="flex items-center mb-4">									<span className="text-4xl mr-4">{serviceIcons[service.name] || '🔧'}</span>									<h2 className="card-title">{service.name.replace(/_/g, ' ')}</h2>								</div>								<p>Price: {service.price}</p>								<div className="card-actions justify-end">									<button className="btn btn-primary" onClick={() => handleServiceSelect(service)}>Select Service</button>								</div>							</div>						</div>					))}				</div>			</main>			<Footer />						{showReservationModal && (				<div className="modal modal-open">					<div className="modal-box">						<h3 className="font-bold text-lg">Select a Reservation</h3>						<p className="py-4">Choose the reservation you want to add this service to:</p>						<div className="space-y-2">							{userReservations.map((reservation) => (								<button									key={reservation.id}									onClick={() => handleReservationSelect(reservation)}									className="btn btn-block"								>									{reservation.location.title} - {new Date(reservation.startDate).toLocaleDateString()}								</button>							))}						</div>						<div className="modal-action">							<button className="btn" onClick={() => setShowReservationModal(false)}>Cancel</button>						</div>					</div>				</div>			)}						{showPaymentModal && clientSecret && (				<Elements stripe={stripePromise} options={{ clientSecret }}>					<PaymentModal />				</Elements>			)}		</div>	);};export default ServiceList;