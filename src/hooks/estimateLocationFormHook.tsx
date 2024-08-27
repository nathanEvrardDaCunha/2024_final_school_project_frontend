import { useState } from 'react';import { estimateLocationValidationSchema } from '../validations/estimateLocationFormValidation';import { EstimateLocationFormData, EstimateLocationFormErrors, SavedLocation } from '../types/estimateLocationFormType';const estimateLocationFormHook = () => {	const [formData, setFormData] = useState<EstimateLocationFormData>({		surfaceM2: 0,		numberOfBed: 0,		maxNumberOfPerson: 0,		country: '',		street: '',		locationType: '',		locationGoodType: '',		title: '',		description: '',	});		const [errors, setErrors] = useState<EstimateLocationFormErrors>({});	const [isSubmitting, setIsSubmitting] = useState(false);	const [attemptedSubmit, setAttemptedSubmit] = useState(false);	const [estimationError, setEstimationError] = useState<string | null>(null);	const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);	const [saveSuccess, setSaveSuccess] = useState<string | null>(null);		const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {		const { name, value } = e.target;		setFormData(prevState => ({			...prevState,			[name]: name === 'surfaceM2' || name === 'numberOfBed' || name === 'maxNumberOfPerson' ? Number(value) : value		}));				if (errors[name as keyof EstimateLocationFormErrors]) {			setErrors(prevErrors => ({				...prevErrors,				[name]: undefined			}));		}	};		const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {		e.preventDefault();		setIsSubmitting(true);		setAttemptedSubmit(true);		setEstimationError(null);		setSaveSuccess(null);				try {			await estimateLocationValidationSchema.validate(formData, { abortEarly: false });			const response = await fetch(`${import.meta.env.VITE_API_URL}/location/estimate`, {				method: 'POST',				headers: {					'Content-Type': 'application/json',				},				body: JSON.stringify(formData),			});						if (!response.ok) {				const errorData = await response.json();				throw new Error(errorData.error || 'Estimation failed');			}						const data = await response.json();			setEstimatedPrice(data.estimatedPrice);			setErrors({});		} catch (error) {			if (error instanceof Error) {				if ('inner' in error && Array.isArray((error as any).inner)) {					const newErrors: EstimateLocationFormErrors = {};					(error as any).inner.forEach((err: any) => {						if (err.path) {							newErrors[err.path as keyof EstimateLocationFormErrors] = err.message;						}					});					setErrors(newErrors);				} else {					setEstimationError(error.message);				}			} else {				console.error('Estimation error:', error);				setEstimationError('An unexpected error occurred');			}		} finally {			setIsSubmitting(false);		}	};		const saveLocation = async (finalPrice: number): Promise<SavedLocation | null> => {		try {			const token = localStorage.getItem('token');			if (!token) {				throw new Error('You must be logged in to save a location');			}						const response = await fetch(`${import.meta.env.VITE_API_URL}/location/save`, {				method: 'POST',				headers: {					'Content-Type': 'application/json',					'Authorization': `Bearer ${token}`,				},				body: JSON.stringify({					...formData,					pricePerNight: finalPrice,				}),			});						if (!response.ok) {				const errorData = await response.json();				throw new Error(errorData.error || 'Failed to save location');			}						const data = await response.json();			console.log('Full response from server:', data);						const savedLocation: SavedLocation = data.location;			console.log('Saved location:', savedLocation);			setSaveSuccess('Location saved successfully!');			setEstimationError(null);			return savedLocation;		} catch (error) {			if (error instanceof Error) {				setEstimationError(error.message);			} else {				setEstimationError('An unexpected error occurred while saving the location');			}			setSaveSuccess(null);			return null;		}	};		return {		formData,		errors,		isSubmitting,		attemptedSubmit,		estimationError,		estimatedPrice,		saveSuccess,		handleChange,		handleSubmit,		saveLocation	};};export default estimateLocationFormHook;