// src/components/StepProgressBar.js

import React, { useState } from 'react';
import './StepProgressBar.css';

const StepProgressBar = ({ steps }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const handleNextStep = () => {
		setCurrentStep((prevStep) => prevStep + 1);
	};

	const handlePrevStep = () => {
		setCurrentStep((prevStep) => prevStep - 1);
	};

	return (
		<div className='step-progress-bar'>
			<div className='steps'>
				{steps.map((step, index) => (
					<div
						key={index}
						className={`step ${
							index === currentStep ? 'active' : ''
						}`}>
						{step}
					</div>
				))}
			</div>
			<div className='actions'>
				<button onClick={handlePrevStep} disabled={currentStep === 0}>
					Previous
				</button>
				<button
					onClick={handleNextStep}
					disabled={currentStep === steps.length - 1}>
					Next
				</button>
			</div>
		</div>
	);
};

export default StepProgressBar;
