import { getToken } from '../utils/jwt';import {Location, PerkType, PublishedLocation, Reservation} from '../types/adminLocationType.tsx';export const getLocationsToReview = async (): Promise<Location[]> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch('http://localhost:3000/location/review', {		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to fetch locations');	}		return response.json();};export const getLocation = async (locationId: number): Promise<Location> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${locationId}`, {		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to fetch location');	}		return response.json();};export const getPublishableLocation = async (locationId: number): Promise<PublishedLocation> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/published/${locationId}`, {		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to fetch location');	}		return response.json();};export const uploadLocationImageAsPaperAsset = async (locationId: number, file: File): Promise<Location> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const formData = new FormData();	formData.append('image', file);		const response = await fetch(`http://localhost:3000/location/${locationId}/upload-paper`, {		method: 'POST',		headers: {			'Authorization': `Bearer ${token}`		},		body: formData	} as RequestInit);		if (!response.ok) {		throw new Error('Failed to upload image');	}		return response.json();};export const uploadLocationImageAsImage = async (locationId: number, file: File): Promise<Location> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const formData = new FormData();	formData.append('image', file);		const response = await fetch(`http://localhost:3000/location/${locationId}/upload-image`, {		method: 'POST',		headers: {			'Authorization': `Bearer ${token}`		},		body: formData	} as RequestInit);		if (!response.ok) {		throw new Error('Failed to upload image');	}		return response.json();};export const completeLocationPaperwork = async (locationId: number): Promise<Location> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${locationId}/complete`, {		method: 'POST',		headers: {			'Authorization': `Bearer ${token}`,			'Content-Type': 'application/json'		}	});		if (!response.ok) {		throw new Error('Failed to complete paperwork');	}		return response.json();};export const removeLocationDocument = async (locationId: number, documentId: number): Promise<Location> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${locationId}/document/${documentId}`, {		method: 'DELETE',		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to remove document');	}		return response.json();};export const getLocationsPendingPublish = async (): Promise<Location[]> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		console.log("PENDING LOCATIONNNS");		const response = await fetch('http://localhost:3000/location/pending-publish', {		headers: {			'Authorization': `Bearer ${token}`,		},	});		if (!response.ok) {		throw new Error('Failed to fetch locations pending publish');	}		return response.json();};export const publishLocation = async (locationId: number): Promise<Location> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${locationId}/publish`, {		method: 'POST',		headers: {			'Authorization': `Bearer ${token}`,			'Content-Type': 'application/json'		}	});		if (!response.ok) {		throw new Error('Failed to publish location');	}		return response.json();};export const registerLocationPerks = async (locationId: number, perks: PerkType[]): Promise<Location> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${locationId}/perks`, {		method: 'POST',		headers: {			'Authorization': `Bearer ${token}`,			'Content-Type': 'application/json'		},		body: JSON.stringify({ perks })	});		if (!response.ok) {		throw new Error('Failed to register perks');	}		return response.json();};export const getPublishedLocations = async (): Promise<PublishedLocation[]> => {	const response = await fetch('http://localhost:3000/location/published');		if (!response.ok) {		throw new Error('Failed to fetch published locations');	}		return response.json();};export const getUserPublishedLocations = async (): Promise<PublishedLocation[]> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch('http://localhost:3000/location/user/published', {		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to fetch user\'s published locations');	}		return response.json();};export const getLocationById = async (locationId: number): Promise<PublishedLocation> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/published/${locationId}`, {		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to fetch location');	}		return response.json();};export const getLocationReservations = async (locationId: number): Promise<Reservation[]> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${locationId}/reservations`, {		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to fetch reservations');	}		return response.json();};export const createReservation = async (reservationData: {	isForRentor: boolean;	locationId: number;	paymentMethodId: any;	numberOfNights: number;	startDate: Date;	numberOfPeople: number}): Promise<Reservation> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${reservationData.locationId}/reservations`, {		method: 'POST',		headers: {			'Authorization': `Bearer ${token}`,			'Content-Type': 'application/json',		},		body: JSON.stringify(reservationData),	});		if (!response.ok) {		const errorData = await response.json();		throw new Error(errorData.error || 'Failed to create reservation');	}		return response.json();};export const getRentorReservations = async (locationId: number): Promise<Reservation[]> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${locationId}/rentor-reservations`, {		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to fetch rentor reservations');	}		return response.json();};export const deleteReservation = async (reservationId: number): Promise<void> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/reservations/${reservationId}`, {		method: 'DELETE',		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		throw new Error('Failed to delete reservation');	}};export interface ReservationWithLocation extends Reservation {	location: {		title: string;		pricePerNight: number;	};	endDate: string;}export const getUserReservations = async (): Promise<ReservationWithLocation[]> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		try {		const response = await fetch('http://localhost:3000/location/user/reservations', {			headers: {				'Authorization': `Bearer ${token}`			}		});				if (!response.ok) {			const errorData = await response.text();			throw new Error(`Failed to fetch reservations: ${response.status} ${response.statusText}. ${errorData}`);		}				return response.json();	} catch (error) {		console.error('Error in getUserReservations:', error);		throw error;	}};export const deleteLocation = async (locationId: number): Promise<void> => {	const token = getToken();	if (!token) {		throw new Error('No authentication token found');	}		const response = await fetch(`http://localhost:3000/location/${locationId}`, {		method: 'DELETE',		headers: {			'Authorization': `Bearer ${token}`		}	});		if (!response.ok) {		const errorData = await response.json();		throw new Error(errorData.error || 'Failed to delete location');	}};