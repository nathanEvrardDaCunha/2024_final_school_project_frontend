import { useState, useEffect } from 'react';import { getToken, removeToken } from '../utils/jwt';import { useNavigate } from 'react-router-dom';export const headerHook = () => {	const [isLoggedIn, setIsLoggedIn] = useState(false);	const navigate = useNavigate();		useEffect(() => {		setIsLoggedIn(!!getToken());	}, []);		const handleDisconnect = () => {		removeToken();		setIsLoggedIn(false);		navigate('/');	};		return { isLoggedIn, handleDisconnect };};