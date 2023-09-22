import React, { useState } from 'react';
import {
	Box,
	Button,
	Text,
	Input,
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useToast,
	FormControl,
	FormLabel,
	Select,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.p-datatable-wrapper {
		padding-right: 9px;
		overflow-y: scroll;
		height: calc(100vh - 550px);
	}
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
	.p-datatable .p-datatable-header {
		border-top: none;
		padding-bottom: 10px;
	}
	.p-datatable .p-column-header-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const CostCenterTable = ({ data }) => {
	const toast = useToast();
	const [sucess, setSucess] = useState();
	const token = localStorage.getItem('token');

	function toastCall() {
		return toast({
			title: 'Cost Center Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function toastCallBugetAdd() {
		return toast({
			title: 'Budget Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function toastCallFaild() {
		return toast({
			title: 'Request Faild',
			status: 'Error',
			duration: 3000,
			isClosable: true,
		});
	}

	const BudgetBodyTemplate = (rowData) => {
		const [isLoading, setIsLoading] = useState(false);
		const [loader, setLoader] = useState(false);
		const [budget, setBudget] = useState([]);
		const [inputList, setInputList] = useState([
			{
				budget_amount: '',
				financial_year: '',
			},
		]);
		const availableYears = [
			{
				value: '2017-04-01 00:00:00',
				lebel: 'April, 2017 TO March, 2018',
			},
			{
				value: '2018-04-01 00:00:00',
				lebel: 'April, 2018 TO March, 2019',
			},
			{
				value: '2019-04-01 00:00:00',
				lebel: 'April, 2019 TO March, 2020',
			},
			{
				value: '2020-04-01 00:00:00',
				lebel: 'April, 2020 TO March, 2021',
			},
			{
				value: '2021-04-01 00:00:00',
				lebel: 'April, 2021 TO March, 2022',
			},
			{
				value: '2022-04-01 00:00:00',
				lebel: 'April, 2022 TO March, 2023',
			},
			{
				value: '2023-04-01 00:00:00',
				lebel: 'April, 2023 TO March, 2024',
			},
			{
				value: '2024-04-01 00:00:00',
				lebel: 'April, 2024 TO March, 2025',
			},
			{
				value: '2025-04-01 00:00:00',
				lebel: 'April, 2025 TO March, 2026',
			},
			{
				value: '2026-04-01 00:00:00',
				lebel: 'April, 2026 TO March, 2027',
			},
			{
				value: '2027-04-01 00:00:00',
				lebel: 'April, 2027 TO March, 2028',
			},
			{
				value: '2028-04-01 00:00:00',
				lebel: 'April, 2028 TO March, 2029',
			},
			{
				value: '2029-04-01 00:00:00',
				lebel: 'April, 2029 TO March, 2030',
			},
			{
				value: '2030-04-01 00:00:00',
				lebel: 'April, 2030 TO March, 2031',
			},
			{
				value: '2031-04-01 00:00:00',
				lebel: 'April, 2031 TO March, 2032',
			},
			{
				value: '2032-04-01 00:00:00',
				lebel: 'April, 2032 TO March, 2033',
			},
			{
				value: '2033-04-01 00:00:00',
				lebel: 'April, 2033 TO March, 2034',
			},
			{
				value: '2034-04-01 00:00:00',
				lebel: 'April, 2034 TO March, 2035',
			},
			{
				value: '2035-04-01 00:00:00',
				lebel: 'April, 2035 TO March, 2036',
			},
		];

		const {
			isOpen: bugetIsOpen,
			onOpen: bugetOnOpen,
			onClose: bugetOnClose,
		} = useDisclosure();

		// handle input change
		const handleInputChange = (e, index) => {
			const { name, value } = e.target;
			const list = [...inputList];
			list[index][name] = value;
			setInputList(list);
		};

		// handle click event of the Add button
		const handleAddClick = () => {
			setInputList([
				...inputList,
				{
					budget_amount: '',
					financial_year: '',
				},
			]);
		};
		// Function to handle item deletion
		const handleDeleteClick = (index) => {
			const list = [...inputList];
			list.splice(index, 1);
			setInputList(list);
		};

		const empBudget = async (e) => {
			e.preventDefault();
			bugetOnOpen();
			try {
				setLoader(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-budget/${rowData.id}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const responseData = await response.json();
					setBudget(responseData.data.budget);
					setLoader(false);
				} else {
					setLoader(false);
				}
			} catch (error) {
				setLoader(false);
			}
		};

		const addBudget = async (e) => {
			e.preventDefault();

			const formattedBudgetData = inputList.map((item) => {
				// Assuming item.financial_year is in the format "yyyy-MM-dd"
				const year = item.financial_year.substring(0, 4); // Extract year
				const nextYear = String(parseInt(year) + 1); // Calculate next year

				// Format the dates as needed
				const financial_year_start = `${year}-04-01 00:00:00`;
				const financial_year_end = `${nextYear}-04-01 00:00:00`;

				return {
					budget_amount: item.budget_amount,
					financial_year_start,
					financial_year_end,
				};
			});

			const formData = new FormData();
			formData.append('budget', JSON.stringify(formattedBudgetData));

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/budget-post/${rowData.id}`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					toastCallBugetAdd();
					setIsLoading(false);
				} else {
					toastCallFaild();
					setIsLoading(false);
				}
			} catch (error) {
				toastCallFaild();
				setIsLoading(false);
			}
		};

		console.log(budget, 'budget');

		return (
			<>
				<Button onClick={empBudget} fontSize='1.4rem'>
					<i className='fa-solid fa-chart-simple'></i>
				</Button>
				<Drawer
					isOpen={bugetIsOpen}
					placement='right'
					onClose={bugetOnClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='40% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<DrawerCloseButton size='lg' />
						<DrawerHeader pt='28px'>
							<Box
								borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
								width='400px'
								pb='10px'
								mb='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									Manage Budget for {rowData.cost_center_name}
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<Box>
								<form
									style={{
										display: 'flex',
										width: '100%',
										flexDirection: 'column',
										alignItems: 'flex-end',
									}}>
									{inputList.map((x, i) => {
										return (
											<Box
												display='flex'
												w='100%'
												justifyContent='space-between'
												alignItems='center'
												gap='15px'
												marginBottom='15px'
												key={i}>
												<Box
													display='flex'
													w='100%'
													justifyContent='space-between'
													alignItems='center'
													gap='15px'>
													<Select
														bg='white'
														name='financial_year'
														placeholder='Select Financial Year'
														value={x.financial_year}
														onChange={(e) =>
															handleInputChange(
																e,
																i
															)
														}>
														{availableYears.map(
															(year) => (
																<option
																	key={
																		year.lebel
																	}
																	value={
																		year.value
																	}>
																	{year.lebel}
																</option>
															)
														)}
													</Select>

													<Input
														type='number'
														bg='white'
														className='ml10'
														name='budget_amount'
														placeholder='Assigned Budget'
														value={x.budget_amount}
														onChange={(e) =>
															handleInputChange(
																e,
																i
															)
														}
													/>
												</Box>

												<Box
													display='flex'
													justifyContent='space-between'
													gap='10px'>
													{inputList.length - 1 ===
														i && (
														<Button
															p='0px'
															width='10px'
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
															bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
															onClick={
																handleAddClick
															}>
															<i className='fa-sharp fa-solid fa-plus'></i>
														</Button>
													)}
													{i > 0 && (
														<Button
															p='0px'
															width='10px'
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
															bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
															onClick={() =>
																handleDeleteClick(
																	i
																)
															} // Call the delete function with the index
														>
															<i className='fa-sharp fa-solid fa-minus'></i>
														</Button>
													)}
												</Box>
											</Box>
										);
									})}

									<Button
										disabled={isLoading}
										isLoading={isLoading}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										mt='20px'
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='10px'
										p='20px'
										fontSize='1.6rem'
										color='white'
										type='submit'
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
										onClick={addBudget}>
										Submit
									</Button>
								</form>
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const ActionTemplate = (rowData) => {
		const [costCenterId, setCostcenterId] = useState(rowData.id);
		const [costCenterName, setCostCentername] = useState(
			rowData?.cost_center_name
		);
		const {
			isOpen: editIsOpen,
			onOpen: editOnOpen,
			onClose: editOnClose,
		} = useDisclosure();

		const updateCostCenter = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('id', costCenterId);
			formData.append('cost_center_name', costCenterName);

			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/cost-center-update`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			if (response.status === 200) {
				toastCall();
				setSucess(!sucess);
			} else {
				console.error('Error:', data.message);
			}
		};
		return (
			<>
				<Button onClick={editOnOpen} fontSize='1.4rem'>
					<i className='fa-solid fa-pen-to-square'></i>
				</Button>
				<Drawer
					isOpen={editIsOpen}
					placement='right'
					onClose={editOnClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='40% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<DrawerCloseButton size='lg' />
						<DrawerHeader pt='28px'>
							<Box
								borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
								width='400px'
								pb='10px'
								mb='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									Cost center List Update
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<form
								onSubmit={updateCostCenter}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
								}}>
								<FormControl mb='15px'>
									<FormLabel>Cost Center Name</FormLabel>
									<Input
										bg='white'
										type='text'
										value={costCenterName}
										onChange={(e) =>
											setCostCentername(e.target.value)
										}
									/>
								</FormControl>
								<Button
									mt='20px'
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='10px'
									p='20px'
									fontSize='1.6rem'
									color='white'
									type='submit'
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
									onClick={editOnClose}>
									Update
								</Button>
							</form>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	return (
		<CssWrapper>
			<Box className='card p-fluid'>
				<DataTable
					value={data?.cost_center}
					dataKey='id'
					tableStyle={{ minWidth: '100%' }}>
					<Column
						field='cost_center_name'
						header='COST CENTERS'
						headerStyle={{ textAlign: 'center' }}
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '31%' }}></Column>
					<Column
						header='MANAGE BUDGET'
						headerStyle={{ textAlign: 'center' }}
						body={BudgetBodyTemplate}
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '31%' }}></Column>
					<Column
						header='EDIT COST CENTERS'
						headerStyle={{ textAlign: 'center' }}
						body={ActionTemplate}
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '31%' }}></Column>
				</DataTable>
			</Box>
		</CssWrapper>
	);
};

export default CostCenterTable;
