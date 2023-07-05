import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const ApprovalVariant = ({ products }) => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [loader, setLoader] = useState(false);
	const [selectBoxes, setSelectBoxes] = useState([1]); // Initial select box
	const [empList, setEmpList] = useState();
	const [getEmployee, setGetEmployee] = useState();

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

	useEffect(() => {
		const empList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setEmpList(data1.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		empList();
	}, []);

	return (
		<>
			<form
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-end',
				}}>
				<Box w='100%'>
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
										<Select
											width='95%'
											mr='10px'
											onChange={(e) =>
												setGetEmployee(e.target.value)
											}>
											{empList?.map((data) => {
												return (
													<option
														value={data.id}
														key={data.id}>
														{data.emp_name}
													</option>
												);
											})}
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
								{products?.map((data) => {
									return (
										<>
											<div className='timeline__event animated fadeInUp timeline__event--type2'>
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
										</>
									);
								})}
							</div>
						</Box>
					</Box>
				</Box>
				<Button
					bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					borderRadius='10px'
					p='20px 30px'
					fontSize='1.6rem'
					color='white'
					mt='20px'
					_hover={{
						bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
					}}
					_active={{
						bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
					}}
					_focus={{
						bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
					}}
					type='submit'>
					Submit
				</Button>
			</form>
		</>
	);
};

export default ApprovalVariant;
