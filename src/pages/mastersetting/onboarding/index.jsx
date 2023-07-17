import React, { useState, useEffect } from 'react';
import {
	Box,
	Text,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Tooltip,
	Input,
	FormControl,
	FormLabel,
	useToast,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Image,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import { Paginator } from 'primereact/paginator';
import { useNavigate } from 'react-router-dom';
import OnbordingDrawer from './onbordingDrawer';
import Loader from '../../../assets/images/loader.gif';

const CssWrapper = styled.div`
	.p-datatable-wrapper::-webkit-scrollbar {
		width: 6px;
	}

	/* Track */
	.p-datatable-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	.p-datatable-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}

	.p-datatable-emptymessage .p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
	}
	.p-datatable .p-sortable-column .p-column-title {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		font-size: 1.4rem;
		padding: 15px 10px;
	}
	.p-paginator {
		padding: 15px 10px;
	}
	.p-component {
		font-size: 1.4rem;
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-column-header-content {
		justify-content: center;
	}
	.p-paginator .p-paginator-pages .p-paginator-page {
		font-size: 1.4rem;
	}
	.p-paginator .p-dropdown .p-dropdown-label {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
	}
	.p-datatable > .p-datatable-wrapper {
		overflow: auto;
		height: calc(100vh - 240px);
		padding-right: 5px;
		margin-right: 5px;
	}
`;
const OnboardingCandidate = () => {
	const navigate = useNavigate();
	let token = localStorage.getItem('token');
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [sucess, setsucess] = useState();
	const [empList, setEmpList] = useState();
	const [empUser, setEmpUser] = useState();
	const [fromValue, setFromValue] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loader, setLoader] = useState(false);

	const cols = [
		{ field: 'emp_name', header: 'Employee' },
		{ field: 'email', header: 'Register Mail Id' },
		{ field: 'mobile_no', header: 'Mobile No' },
		{ field: 'expected_join_date', header: 'DOJ' },
	];

	useEffect(() => {
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-form-view`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok && response2.ok) {
					const data1 = await response1.json();
					const data2 = await response2.json();
					setFromValue(data1);
					setEmpUser(data2.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, []);

	useEffect(() => {
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/get-candidates/${rows}?page=${first}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data = await response1.json();
					setEmpList(data.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, [sucess, first, rows]);

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: {
			operator: FilterOperator.AND,
			constraints: [
				{ value: null, matchMode: FilterMatchMode.STARTS_WITH },
			],
		},
		'country.name': {
			operator: FilterOperator.AND,
			constraints: [
				{ value: null, matchMode: FilterMatchMode.STARTS_WITH },
			],
		},
		representative: { value: null, matchMode: FilterMatchMode.IN },
		date: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
		},
		balance: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
		},
		status: {
			operator: FilterOperator.OR,
			constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
		},
		activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const RenderHeader = () => {
		const toast = useToast();
		let tokens = localStorage.getItem('token');
		const [name, setName] = useState();
		const [number, setNumber] = useState();
		const [mail, setMail] = useState();
		const [date, setDate] = useState();

		function toastCall() {
			return toast({
				title: 'Send Invite',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
		function toastCallFaild() {
			return toast({
				title: 'The email has already been taken',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
		function toastCallError() {
			return toast({
				title: 'Request Faild',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}

		const addCandidate = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('name', name);
			formData.append('mobile', number);
			formData.append('email', mail);
			formData.append('join_date', date);

			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/post-candidates`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${tokens}`,
					},
				}
			);
			const data = await response.json();
			if (response.status === 200) {
				toastCall();
				setsucess(!sucess);
			} else if (response.status === 400) {
				toastCallFaild();
			} else {
				toastCallError();
			}
		};

		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box
					width='40%'
					className='flex flex-wrap gap-2 justify-content-between align-items-center'>
					<Box as='span' width='100%' className='p-input-icon-left'>
						<i className='pi pi-search' />
						<InputText
							style={{ width: '100%' }}
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder='Keyword Search'
						/>
					</Box>
				</Box>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'>
					<Button
						bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						p='20px 20px'
						color='white'
						fontSize='1.6rem'
						borderRadius='15px'
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
						onClick={onOpen}>
						<Text fontSize='1.6rem' fontWeight='700'>
							<i className='fa-solid fa-plus'></i> Add New
						</Text>
					</Button>

					<Drawer
						isOpen={isOpen}
						placement='right'
						onClose={onClose}
						size='xl'>
						<DrawerOverlay />
						<DrawerContent
							maxW='40% !important'
							bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
							<DrawerCloseButton size='lg' />
							<DrawerHeader pt='28px'>
								<Box
									borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
									width='300px'
									pb='10px'
									mb='15px'>
									<Text
										background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
										backgroundClip='text'
										fontWeight='700'
										fontSize='28px'
										lineHeight='36px'>
										Onboarding
										<br /> Process Request
									</Text>
								</Box>
							</DrawerHeader>
							<DrawerBody>
								<form
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-end',
									}}
									onSubmit={addCandidate}>
									<FormControl w='100%' mb='15px'>
										<FormLabel>
											Enter Full Name{' '}
											<Box as='span' color='orange'>
												*
											</Box>
										</FormLabel>
										<Input
											type='text'
											onChange={(e) =>
												setName(e.target.value)
											}
											required
										/>
									</FormControl>
									<FormControl w='100%' mb='15px'>
										<FormLabel>
											Enter Mobile Number{' '}
											<Box as='span' color='orange'>
												*
											</Box>
										</FormLabel>
										<Input
											type='number'
											onChange={(e) =>
												setNumber(e.target.value)
											}
											required
										/>
									</FormControl>
									<FormControl w='100%' mb='15px'>
										<FormLabel>
											Register Mail ID
											<Box as='span' color='orange'>
												*
											</Box>
										</FormLabel>
										<Input
											type='email'
											onChange={(e) =>
												setMail(e.target.value)
											}
											required
										/>
									</FormControl>
									<FormControl w='100%'>
										<FormLabel>
											Expected Joining Date{' '}
											<Box as='span' color='orange'>
												*
											</Box>
										</FormLabel>
										<Input
											type='date'
											onChange={(e) =>
												setDate(e.target.value)
											}
											required
										/>
									</FormControl>
									<Button
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='5px'
										p='20px 20px'
										fontSize='1.6rem'
										color='white'
										mt='28px'
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
										type='submit'
										onClick={onClose}>
										Submit
									</Button>
								</form>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				</Box>
			</Box>
		);
	};

	const DocStatus = () => {
		console.log('empList', empList);
		return (
			<CircularProgress size='40px' value={40} color='blue.400'>
				<CircularProgressLabel>40%</CircularProgressLabel>
			</CircularProgress>
		);
	};

	const DetailsTemplate = (rowData) => {
		return (
			<OnbordingDrawer
				rowData={rowData}
				fromValue={fromValue}
				empUser={empUser}
			/>
		);
	};

	const StatusTemplate = (rowData) => {
		return (
			<Box>
				{rowData.candidate_status === 1 ? (
					<Tooltip
						hasArrow
						fontSize='12px'
						p='5px'
						label='Candidate Seen The Invition'>
						<Box color='statusActiveColor'>
							<i className='fa-solid fa-check fa-2x'></i>
						</Box>
					</Tooltip>
				) : (
					<Tooltip
						fontSize='12px'
						p='5px'
						hasArrow
						label="Candidate did't Seen The Invition">
						<Box color='claimzTextGrayColor'>
							<i className='fa-solid fa-hourglass-end fa-2x'></i>
						</Box>
					</Tooltip>
				)}
			</Box>
		);
	};

	const Header = RenderHeader();

	return (
		<CssWrapper
			width='100%'
			height='100%'
			display='flex'
			alignItems='center'
			justifyContent='center'>
			<Box width='100%' bg='rgba(230, 237, 239, 1)'>
				{loader ? (
					<Box
						height='calc(100vh - 139px)'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<Box
						background='#F6F9F8'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='6px'
						padding='0px 10px'>
						<Box className='card'>
							<DataTable
								value={empList?.data}
								header={Header}
								filters={filters}
								onFilter={(e) => setFilters(e.filters)}
								dataKey='id'>
								{cols.map((col, index) => (
									<Column
										key={index}
										field={col.field}
										header={col.header}
									/>
								))}
								<Column
									header='Doc Status'
									body={DocStatus}
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									header='Details'
									body={DetailsTemplate}
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									header='Signup Status'
									body={StatusTemplate}
									bodyStyle={{ textAlign: 'center' }}
								/>
							</DataTable>
							<Box
								display='flex'
								justifyContent='flex-end'
								backgroundColor='white'>
								<Paginator
									first={first}
									rows={rows}
									totalRecords={empList?.total}
									rowsPerPageOptions={[
										5,
										`${empList?.total}`,
									]}
									onPageChange={onPageChange}
								/>
							</Box>
						</Box>
					</Box>
				)}
			</Box>
		</CssWrapper>
	);
};

export default OnboardingCandidate;
