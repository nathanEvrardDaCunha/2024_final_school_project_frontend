import React from 'react';const Footer: React.FC = () => {	const currentYear = new Date().getFullYear();		return (		<footer className="footer footer-center p-4 bg-base-100 text-base-content my-2">			<div>				<p>Copyright © {currentYear} - All rights reserved by MyApp</p>			</div>		</footer>	);};export default Footer;