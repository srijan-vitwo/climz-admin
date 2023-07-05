import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';

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

	const [selectBoxes, setSelectBoxes] = useState([1]); // Initial select box

	const addDynamicSelect = (e) => {
		e.preventDefault();
		setSelectBoxes((prevSelectBoxes) => [
			...prevSelectBoxes,
			prevSelectBoxes.length + 1,
		]);
	};
	const removeDynamicSelect = (index) => {
		setSelectBoxes((prevSelectBoxes) =>
			prevSelectBoxes.filter((_, i) => i !== index)
		);
	};

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
					<Box
						display='flex'
						justifyContent='space-between'
						mt='20px'>
						<Box width='32%'>
							{selectBoxes.map((_, index) => (
								<Box
									key={index}
									display='flex'
									alignItems='flex-end'
									mb='15px'>
									<FormControl>
										<FormLabel>Select Approval</FormLabel>
										<Select width='95%' mr='10px'>
											<option value=''>
												Select an option
											</option>
										</Select>
									</FormControl>
									{index !== 0 && (
										<Button
											bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
											boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
											color='white'
											mr='10px'
											_hover={{
												bgGradient:
													'linear(180deg, #2267A2 0%, #0D4675 100%)',
											}}
											_active={{
												bgGradient:
													'linear(180deg, #2267A2 0%, #0D4675 100%)',
											}}
											_focus={{
												bgGradient:
													'linear(180deg, #2267A2 0%, #0D4675 100%)',
											}}
											p='17px'
											w='10%'
											onClick={() =>
												removeDynamicSelect(index)
											}>
											<i className='fa-solid fa-trash'></i>
										</Button>
									)}
									<Button
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										color='white'
										mr='10px'
										_hover={{
											bgGradient:
												'linear(180deg, #2267A2 0%, #0D4675 100%)',
										}}
										_active={{
											bgGradient:
												'linear(180deg, #2267A2 0%, #0D4675 100%)',
										}}
										_focus={{
											bgGradient:
												'linear(180deg, #2267A2 0%, #0D4675 100%)',
										}}
										p='17px'
										onClick={addDynamicSelect}
										w='10%'>
										<i className='fa-sharp fa-solid fa-plus'></i>
									</Button>
								</Box>
							))}
						</Box>
						<Box width='58%'>
							<div className='timeline'>
								<div className='timeline__event  animated fadeInUp delay-3s timeline__event--type1'>
									<div className='timeline__event__icon '>
										<Image
											src='https://bit.ly/dan-abramov'
											alt='Dan Abramov'
											h='50px'
											w='50px'
										/>
										<Box className='timeline__event__date'>
											20-08-2019
										</Box>
									</div>
									<div className='timeline__event__content '>
										<div className='timeline__event__description'>
											<p>Joy Kumar Saha</p>
										</div>
									</div>
								</div>
								<div className='timeline__event animated fadeInUp delay-2s timeline__event--type2'>
									<div className='timeline__event__icon '>
										<Image
											src='https://bit.ly/dan-abramov'
											alt='Dan Abramov'
											h='50px'
											w='50px'
										/>
										<Box className='timeline__event__date'>
											20-08-2019
										</Box>
									</div>
									<div className='timeline__event__content '>
										<div className='timeline__event__description'>
											<p>Joy Kumar Saha</p>
										</div>
									</div>
								</div>
								<div className='timeline__event animated fadeInUp delay-1s timeline__event--type3'>
									<div className='timeline__event__icon '>
										<Image
											src='https://bit.ly/dan-abramov'
											alt='Dan Abramov'
											h='50px'
											w='50px'
										/>
										<Box className='timeline__event__date'>
											20-08-2019
										</Box>
									</div>
									<div className='timeline__event__content '>
										<div className='timeline__event__description'>
											<p>Joy Kumar Saha</p>
										</div>
									</div>
								</div>
								<div className='timeline__event animated fadeInUp timeline__event--type1'>
									<div className='timeline__event__icon '>
										<Image
											src='https://bit.ly/dan-abramov'
											alt='Dan Abramov'
											h='50px'
											w='50px'
										/>
										<Box className='timeline__event__date'>
											20-08-2019
										</Box>
									</div>
									<div className='timeline__event__content '>
										<div className='timeline__event__description'>
											<p>Joy Kumar Saha</p>
										</div>
									</div>
								</div>
							</div>
						</Box>
					</Box>
				</Box>
			</form>
		</>
	);
};

export default ApprovalVariant;
