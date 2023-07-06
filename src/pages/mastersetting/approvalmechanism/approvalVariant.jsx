import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Select,
	Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const ApprovalVariant = ({ approvalState }) => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [loader, setLoader] = useState(false);
	const [selectBoxes, setSelectBoxes] = useState([1]); // Initial select box
	const [empList, setEmpList] = useState();
	const [employeeId, setEmployeeId] = useState();
	const [userData, setUserData] = useState();

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

	const handelChange = async (e) => {
		setEmployeeId(e.target.value);
	};

	const userDetails = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/emp-details/${employeeId}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setUserData(data.data);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	console.log(userData, 'userData');

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
											placeholder='Select Approval'
											onChange={handelChange}>
											{empList?.map((data, index) => {
												return (
													<option
														value={data.id}
														key={index}>
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
									<Button
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										color='white'
										mr='10px'
										p='17px 20px'
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
										onClick={userDetails}
										w='10%'>
										Apply
									</Button>
								</Box>
							))}
						</Box>
						<Box width='58%'>
							<div className='timeline'>
								{approvalState?.map((data, index) => {
									return (
										<>
											<div
												className='timeline__event animated fadeInUp timeline__event--type2'
												key={index}>
												<Box className='timeline__event__icon'>
													<Image
														src={
															userData?.profile_photo
														}
														alt={userData?.emp_name}
														h='50px'
														w='100%'
														mr='10px'
													/>
													<Box className='timeline__event__date'>
														20-08-2019
													</Box>
												</Box>
												<Box
													className='timeline__event__content'
													display='flex'
													alignItems='center'
													w='100%'>
													<Box className='timeline__event__description'>
														<Text>
															{userData?.emp_name}
														</Text>
													</Box>
												</Box>
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
