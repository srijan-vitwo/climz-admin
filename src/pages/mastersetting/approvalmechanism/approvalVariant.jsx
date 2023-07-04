import { Box, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { Timeline } from 'primereact/timeline';
import React from 'react';

const ApprovalVariant = () => {
	const events = [
		{
			status: 'Ordered',
			date: '15/10/2020 10:30',
			icon: 'pi pi-shopping-cart',
			color: '#9C27B0',
			image: 'game-controller.jpg',
		},
		{
			status: 'Processing',
			date: '15/10/2020 14:00',
			icon: 'pi pi-cog',
			color: '#673AB7',
		},
		{
			status: 'Shipped',
			date: '15/10/2020 16:15',
			icon: 'pi pi-shopping-cart',
			color: '#FF9800',
		},
		{
			status: 'Delivered',
			date: '16/10/2020 10:00',
			icon: 'pi pi-check',
			color: '#607D8B',
		},
	];

	return (
		<>
			<form style={{ width: '100%' }}>
				<Box>
					<Box>
						<FormControl>
							<FormLabel>Variant Name</FormLabel>
							<Input type='text' />
						</FormControl>
					</Box>
					<Box display='flex' mt='20px'>
						<Box width='38%' justifyContent='space-between'>
							<FormControl>
								<FormLabel>Country</FormLabel>
								<Select placeholder='Select country'>
									<option>United Arab Emirates</option>
									<option>Nigeria</option>
								</Select>
							</FormControl>
						</Box>
						<Box width='58%'>
							<Box className='card'>
								<Timeline
									value={events}
									content={(item) => item.status}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</form>
		</>
	);
};

export default ApprovalVariant;
