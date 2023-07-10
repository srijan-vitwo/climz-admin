import React from 'react';
import TDSList from './tdslist';
import { Box } from '@chakra-ui/react';

const TDSCalculator = () => {
	return (
		<Box
			background='#F6F9F8'
			border='1px solid #CECECE'
			boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
			borderRadius='6px'
			padding='0px 10px'>
			<TDSList />
		</Box>
	);
};

export default TDSCalculator;
