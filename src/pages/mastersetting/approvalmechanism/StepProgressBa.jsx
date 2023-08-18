// src/components/StepProgressBar.js

import React, { useState } from 'react';
import './StepProgressBar.css';
import { Box, Button } from '@chakra-ui/react';

const StepProgressBar = ({ steps, approval }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const handleNextStep = () => {
		setCurrentStep((prevStep) => prevStep + 1);
	};

	const handlePrevStep = () => {
		setCurrentStep((prevStep) => prevStep - 1);
	};

	return (
		<Box className='step-progress-bar'>
			<Box className='steps'>
				{approval?.map((step, index) => {
					return (
						<Box
							key={index}
							className={`step ${
								index === currentStep ? 'active' : ''
							}`}
							fontWeight='600'
							borderRadius='10px'>
							{step?.type_name}
						</Box>
					);
				})}
			</Box>
			<Box className='actions'>
				<Button onClick={handlePrevStep} disabled={currentStep === 0}>
					Previous
				</Button>
				<Button
					onClick={handleNextStep}
					disabled={currentStep === steps.length - 1}>
					Next
				</Button>
			</Box>
		</Box>
	);
};

export default StepProgressBar;
