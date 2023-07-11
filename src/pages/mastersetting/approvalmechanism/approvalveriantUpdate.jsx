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
	useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import userLogo from '../../../assets/images/user.png';

const ApprovalVeriantUpdate = ({ approval, rowData }) => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const toast = useToast();
	let counter = approval?.length - 1;
	const [isLoading, setIsLoading] = useState(false);
	const [selectBoxes, setSelectBoxes] = useState([1]);
	const [empList, setEmpList] = useState();
	const [employeeId, setEmployeeId] = useState();
	const [userData, setUserData] = useState([]);
	const [variantName, setVariantName] = useState(rowData?.variant_name);
	const [variants, setVariants] = useState({
		variants: [],
	});

	const newArray = [rowData?.approvers[rowData?.approvers?.length - 1]];
	const lastObject = approval[approval?.length - 1];
	const lastApproval = [lastObject];

	console.log(rowData, 'rowData');

	return (
		<Box>
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
							<Input
								type='text'
								placeholder='Enter Name'
								value={variantName}
								required
								onChange={(e) => setVariantName(e.target.value)}
							/>
						</FormControl>
					</Box>
					<Box
						display='flex'
						justifyContent='space-between'
						mt='20px'>
						<Box width='100%'>
							<div className='timeline'>
								{rowData?.approvers?.map((value, index) => (
									<Box>
										<Text
											fontWeight='600'
											marginBottom='5px'
											color='var(--chakra-colors-claimzTextBlueLightColor)'>
											{value.type_name}
										</Text>
										<Box
											className='timeline__event animated fadeInUp timeline__event--type2'
											key={index}>
											<Box className='timeline__event__icon'>
												<Image
													src={
														value?.img == null
															? userLogo
															: value?.profile_photo
													}
													alt={value?.emp_name}
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
														{value?.emp_name}
													</Text>
												</Box>
											</Box>
										</Box>
									</Box>
								))}
								{newArray?.map((data, index) => {
									return (
										<>
											{data?.name && (
												<Text
													fontWeight='600'
													marginBottom='5px'
													color='var(--chakra-colors-claimzTextBlueLightColor)'>
													{lastApproval[0]?.type_name}
												</Text>
											)}
											<div
												className='timeline__event animated fadeInUp timeline__event--type2'
												key={index}>
												<Box className='timeline__event__icon'>
													<Image
														src={
															data?.img == null
																? userLogo
																: data?.img
														}
														alt={data?.name}
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
															{data?.emp_name}
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
		</Box>
	);
};

export default ApprovalVeriantUpdate;
