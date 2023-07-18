import React, { useState, useEffect } from 'react';
import {
	Box,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Image,
	Heading,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
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
		height: calc(100vh - 258px);
		padding-right: 5px;
		margin-right: 5px;
	}
`;
const Emplist = () => {
	const navigate = useNavigate();
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [msg, setMsg] = useState();
	const [empList, setEmpList] = useState();
	const [loader, setLoader] = useState(false);

	const cols = [
		{ field: 'emp_code', header: 'Emp Code' },
		{ field: 'emp_name', header: 'Emp Name' },
		{ field: 'mobile_no', header: 'Ph Number' },
		{ field: 'department_name', header: 'Department' },
		{ field: 'primary', header: '1st Reporting' },
		{ field: 'secondary', header: '2nd Reporting' },
	];

	useEffect(() => {
		let token = localStorage.getItem('token');
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list/${rows}?page=${first}`,
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
	}, [first, rows, msg]);

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

	const exportColumns = cols.map((col) => ({
		title: col.header,
		dataKey: col.field,
	}));

	const exportPdf = () => {
		import('jspdf').then((jsPDF) => {
			import('jspdf-autotable').then(() => {
				const doc = new jsPDF.default(0, 0);

				doc.autoTable(exportColumns, empList.data);
				doc.save('empList.pdf');
			});
		});
	};

	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(empList.data);
			const workbook = {
				Sheets: { data: worksheet },
				SheetNames: ['data'],
			};
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'empList');
		});
	};

	const saveAsExcelFile = (buffer, fileName) => {
		import('file-saver').then((module) => {
			if (module && module.default) {
				let EXCEL_TYPE =
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
				let EXCEL_EXTENSION = '.xlsx';
				const data = new Blob([buffer], {
					type: EXCEL_TYPE,
				});

				module.default.saveAs(
					data,
					fileName +
						'_export_' +
						new Date().getTime() +
						EXCEL_EXTENSION
				);
			}
		});
	};

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const RenderHeader = () => {
		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box className='flex flex-wrap gap-2 justify-content-between align-items-center'>
					<Heading
						mb='5px'
						fontSize='1.4rem'
						color='var(--chakra-colors-claimzTextBlueColor)'>
						Search Employee
					</Heading>
					<Box as='span' className='p-input-icon-left'>
						<i className='pi pi-search' />
						<InputText
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder='Keyword Search'
						/>
					</Box>
				</Box>
			</Box>
		);
	};

	const ActionTemplate = (rowData) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const {
			isOpen: LetterIsOpen,
			onOpen: LetterOnOpen,
			onClose: LetterOnClose,
		} = useDisclosure();

		return (
			<>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa fa-eye fa-2x'></i>
				</Button>

				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='60% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<DrawerCloseButton size='lg' />
						<DrawerHeader pt='28px'>
							<Box
								borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
								width='500px'
								pb='10px'
								mb='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									{rowData.emp_name} Employee Details
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>drawer</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const StatusTemplate = (rowData) => {
		return (
			<Box>
				{rowData.is_active === '1' ? (
					<Box
						width='20px'
						height='20px'
						display='flex'
						margin='0 auto'
						alignItems='center'
						justifyContent='center'
						borderRadius='100%'
						border='2px solid var(--chakra-colors-statusInactiveStrokeColor)'
						boxShadow='0px 0px 7px var(--chakra-colors-boxShadowGrayColor)'
						color='var(--chakra-colors-statusActiveColor)'>
						<i className='fa-solid fa-circle'></i>
					</Box>
				) : (
					<Box
						width='20px'
						height='20px'
						display='flex'
						margin='0 auto'
						alignItems='center'
						justifyContent='center'
						borderRadius='100%'
						border='2px solid var(--chakra-colors-statusInactiveStrokeColor)'
						boxShadow='0px 0px 7px var(--chakra-colors-boxShadowGrayColor)'
						color='var(--chakra-colors-claimzTextGrayColor)'>
						<i className='fa-solid fa-circle'></i>
					</Box>
				)}
			</Box>
		);
	};

	const header = RenderHeader();

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='calc(100vh - 220px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box
					className='card'
					background='#F6F9F8'
					border='1px solid #CECECE'
					boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
					borderRadius='6px'>
					<DataTable
						value={empList?.data}
						header={header}
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
							header='Status'
							body={StatusTemplate}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '14%' }}
						/>
						<Column
							header='Action'
							body={ActionTemplate}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '14%' }}
						/>
					</DataTable>
					{/* pegination */}
					<Box
						display='flex'
						justifyContent='flex-end'
						backgroundColor='white'>
						<Paginator
							first={first}
							rows={rows}
							totalRecords={empList?.total}
							rowsPerPageOptions={[
								30,
								50,
								100,
								`${empList?.total}`,
							]}
							onPageChange={onPageChange}
						/>
					</Box>
				</Box>
			)}
		</CssWrapper>
	);
};

export default Emplist;
