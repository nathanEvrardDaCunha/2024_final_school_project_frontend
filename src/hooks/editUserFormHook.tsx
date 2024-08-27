import { useState } from 'react';import { validationSchema } from '../validations/editUserFormValidation';import { FormData, FormErrors } from '../types/editUserFormType';import { getToken } from '../utils/jwt';const editUserFormHook = (initialUserInfo: FormData, onUpdate: (updatedInfo: FormData) => void) => {	const [formData, setFormData] = useState<FormData>(() => ({		email: initialUserInfo.email,		firstname: initialUserInfo.firstname,		lastname: initialUserInfo.lastname,		birthDate: initialUserInfo.birthDate,		phoneNumber: initialUserInfo.phoneNumber,		currentPassword: '',		newPassword: '',		confirmPassword: '',	}));		const [errors, setErrors] = useState<FormErrors>({});	const [isSubmitting, setIsSubmitting] = useState(false);	const [attemptedSubmit, setAttemptedSubmit] = useState(false);		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {		const { name, value } = e.target;		setFormData(prevState => ({			...prevState,			[name]: value		}));				if (errors[name as keyof FormErrors]) {			setErrors(prevErrors => ({				...prevErrors,				[name]: undefined			}));		}	};		const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {		e.preventDefault();		setIsSubmitting(true);		setAttemptedSubmit(true);				try {			await validationSchema.validate(formData, { abortEarly: false });						// Only include fields that have been changed			const changedData = Object.entries(formData).reduce((acc, [key, value]) => {				if (value !== initialUserInfo[key as keyof typeof initialUserInfo] && value !== '') {					acc[key as keyof FormData] = value;				}				return acc;			}, {} as Partial<FormData>);						// Remove password fields if not all are provided			if (!(changedData.currentPassword && changedData.newPassword && changedData.confirmPassword)) {				delete changedData.currentPassword;				delete changedData.newPassword;				delete changedData.confirmPassword;			}						const token = getToken();			const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/user`, {				method: 'PUT',				headers: {					'Content-Type': 'application/json',					'Authorization': `Bearer ${token}`				},				body: JSON.stringify(changedData),			});						if (!response.ok) {				throw new Error('Update failed');			}						const updatedUserInfo = await response.json();			console.log('Update successful:', updatedUserInfo);			setErrors({});			onUpdate(updatedUserInfo);		} catch (error) {			if (error instanceof Error) {				const newErrors: FormErrors = {};				if ('inner' in error) {					(error as any).inner.forEach((err: any) => {						if (err.path) {							newErrors[err.path as keyof FormErrors] = err.message;						}					});				} else {					console.error('Validation error:', error.message);				}				setErrors(newErrors);			} else {				console.error('Update error:', error);			}		} finally {			setIsSubmitting(false);		}	};		return { formData, errors, isSubmitting, attemptedSubmit, handleChange, handleSubmit };};export default editUserFormHook;