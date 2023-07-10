import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Select,
	Text,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import userLogo from '../../../assets/images/user.png';

const ApprovalVeriantform = ({ approvalState }) => {
	const token = localStorage.getItem('token');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();
	let counter = approvalState?.length - 1;
	const [loader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectBoxes, setSelectBoxes] = useState([1]);
	const [empList, setEmpList] = useState();
	const [employeeId, setEmployeeId] = useState();
	const [userData, setUserData] = useState([]);
	const [variantName, setVariantName] = useState();
	const [variants, setVariants] = useState({
		variants: [],
	});

	function toastCall() {
		return toast({
			title: 'All Approval Stage Added Already',
			status: 'warning',
			duration: 3000,
			isClosable: true,
		});
	}

	const addDynamicSelect = (e) => {
		if (selectBoxes.length < counter) {
			e.preventDefault();
			setSelectBoxes((prevSelectBoxes) => [
				...prevSelectBoxes,
				prevSelectBoxes.length + 1,
			]);
		} else {
			toastCall();
		}
	};

	useEffect(() => {
		const empList = async () => {
			try {
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
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		empList();
	}, []);

	const handelChangeVariants = async (e) => {
		if (e.target.value == employeeId) {
			console.log('Please select deffered employee!');
		} else {
			setEmployeeId(e.target.value);
		}
	};

	const userDetails = async (e, index) => {
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
				const updatedUserData = [...userData, data.data];
				setUserData(updatedUserData);
				addDynamicSelect(e);

				// approvalState;
				let tmpGetStatus = approvalState[index].given_status;
				let tempStatusMaker =
					approvalState[approvalState.length - 1].given_status;

				let prevVariantData = JSON.parse(JSON.stringify(variants));

				if (prevVariantData.variants[index] == undefined) {
					let tempVariantUser = {
						vm_id: '',
						user_id: employeeId,
						get_status: tmpGetStatus,
						status_maker: tempStatusMaker,
						name: data.data.emp_name,
						img: data.data.profile_photo,
					};
					if (index > 0) {
						prevVariantData['variants'][index - 1]['status_maker'] =
							tmpGetStatus;
					}
					prevVariantData.variants[index] = tempVariantUser;
				} else {
					prevVariantData.variants[index].user_id = employeeId;
					prevVariantData.variants[index].name = data.data.emp_name;
					prevVariantData.variants[index].img =
						data.data.profile_photo;
				}
				setVariants(prevVariantData);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const newArray = [variants?.variants[variants?.variants?.length - 1]];
	// console.log(userData, 'userData');
	console.log(newArray, 'newArray');
	// console.log(selectBoxes, 'selectBoxes');
	// console.log(approvalState, 'approvalState');
	console.log(variants, 'variants');
	const approvalSubmit = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('variant_name', variantName);
		formData.append('variants', JSON.stringify(variants.variants));
		// formData.append('cost_center', `["${inputs.join('","')}"]`);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/claim-approval-save`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				toastCall();
				setIsLoading(false);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	return (
		<>
			<Tooltip hasArrow label='Add New Approval veriant' fontSize='1rem'>
				<Button
					border='2px solid var(--chakra-colors-claimzBorderColor)'
					borderRadius='15px'
					height='45px'
					padding='0px 20px'
					type='button'
					icon='pi pi-file-excel'
					severity='success'
					background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
					backgroundClip='text'
					onClick={onOpen}>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontSize='1.6rem'
						fontWeight='700'>
						Add New
					</Text>
				</Button>
			</Tooltip>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent minW='60%' height='auto' p='20px'>
					<ModalCloseButton mt='7px' />
					<ModalBody p='0px'>
						<form
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end',
							}}
							onSubmit={approvalSubmit}>
							<Box w='100%'>
								<Box>
									<FormControl>
										<FormLabel>Variant Name</FormLabel>
										<Input
											type='text'
											placeholder='Enter Name'
											required
											onChange={(e) =>
												setVariantName(e.target.value)
											}
										/>
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
													<FormLabel>
														Select Approval
													</FormLabel>
													<Select
														width='95%'
														mr='10px'
														placeholder='Select Approval'
														onChange={
															handelChangeVariants
														}>
														{empList?.map(
															(data, index) => {
																return (
																	<option
																		value={
																			data.id
																		}
																		key={
																			index
																		}>
																		{
																			data.emp_name
																		}
																	</option>
																);
															}
														)}
													</Select>
												</FormControl>
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
													onClick={(e) =>
														userDetails(e, index)
													}
													w='10%'>
													Apply
												</Button>
											</Box>
										))}
									</Box>
									<Box width='58%'>
										<div className='timeline'>
											{Object.entries(
												variants?.variants
											)?.map(([key, value]) => (
												<>
													<div
														className='timeline__event animated fadeInUp timeline__event--type2'
														key={key}>
														<Box className='timeline__event__icon'>
															<Image
																src={
																	value?.img ==
																	null
																		? userLogo
																		: value?.img
																}
																alt={
																	value?.name
																}
																h='50px'
																w='50'
																mr='10px'
															/>
														</Box>
														<Box
															className='timeline__event__content'
															display='flex'
															alignItems='center'
															w='100%'>
															<Box className='timeline__event__description'>
																<Text
																	fontSize='1.4rem'
																	fontWeight='600'
																	color='var(--chakra-colors-claimzTextBlueLightColor)'>
																	{
																		value?.name
																	}
																</Text>
															</Box>
														</Box>
													</div>
												</>
											))}
											{newArray?.map((data, index) => {
												return (
													<>
														<div
															className='timeline__event animated fadeInUp timeline__event--type2'
															key={index}>
															<Box className='timeline__event__icon'>
																<Image
																	src={
																		data?.img ==
																		null
																			? userLogo
																			: data?.img
																	}
																	alt={
																		data?.name
																	}
																	h='50px'
																	w='50px'
																	mr='10px'
																/>
															</Box>
															<Box
																className='timeline__event__content'
																display='flex'
																alignItems='center'
																w='100%'>
																<Box className='timeline__event__description'>
																	<Text
																		fontSize='1.4rem'
																		fontWeight='600'
																		color='var(--chakra-colors-claimzTextBlueLightColor)'>
																		{
																			data?.name
																		}
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
								type='submit'>
								Submit
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ApprovalVeriantform;
