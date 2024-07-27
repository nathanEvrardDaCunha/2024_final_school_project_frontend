import React from 'react';import ContentBackground from "../components/layout/ContentBackground";import BigCard from "../components/common/cards/BigCard";import CardBody from "../components/common/cards/CardBody";import CardTitleCentered from "../components/common/cards/CardTitleCentered";import RegisterForm from "../forms/RegisterForm.tsx";const Register = () => {	return (		<ContentBackground>			<BigCard>				<CardBody>					<CardTitleCentered text="Register" />					<RegisterForm />				</CardBody>			</BigCard>		</ContentBackground>	);};export default Register;