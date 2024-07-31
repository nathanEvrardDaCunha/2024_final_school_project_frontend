import React, { useEffect, useState } from 'react';import { useLocation } from 'react-router-dom';const SuccesPageRenter: React.FC = () => {	const [sessionId, setSessionId] = useState<string | null>(null);	const location = useLocation();		useEffect(() => {		const searchParams = new URLSearchParams(location.search);		const session_id = searchParams.get('session_id');		setSessionId(session_id);	}, [location]);		return (		<div className="container mx-auto mt-10 text-center">			<h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>			<p className="mb-4">Thank you for your subscription.</p>			{sessionId && (				<p className="text-sm text-gray-600">Session ID: {sessionId}</p>			)}		</div>	);};export default SuccesPageRenter;