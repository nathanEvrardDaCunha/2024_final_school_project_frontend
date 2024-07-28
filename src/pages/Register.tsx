import React from 'react';import ContentBackground from "../components/layout/ContentBackground";import BigCard from "../components/common/cards/BigCard";import CardBody from "../components/common/cards/CardBody";import CardTitleCentered from "../components/common/cards/CardTitleCentered";import RegisterForm from "../forms/RegisterForm.tsx";import Header from "../components/layout/header/Header.tsx";import Footer from "../components/layout/Footer.tsx";const Register = () => {	return (		<>			<Header />			<ContentBackground>				<BigCard>					<CardBody>						<CardTitleCentered text="Register" />						<RegisterForm />					</CardBody>				</BigCard>			</ContentBackground>			<Footer />		</>	);};export default Register;