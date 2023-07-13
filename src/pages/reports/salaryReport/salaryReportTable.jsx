import React, { useState, useEffect, useRef } from 'react';
import {
	Box,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';

const CssWrapper = styled.div`
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
`;
const SalaryReportTable = ({ dataList }) => {
	console.log(dataList, 'sss');
	const [rows, setRows] = useState(5);
	const dt = useRef(null);
	const cols = [
		{ field: 'emp_id', header: 'Emp Code' },
		{ field: 'emp_name', header: 'Emp Name' },
		{ field: 'department_name', header: 'Department' },
		{ field: 'Basic', header: 'Basic' },
		{ field: 'HRA', header: 'HRA' },
		{ field: 'Special Allowance', header: 'Special Allowance' },
		{ field: 'EPF', header: 'EPF' },
		{ field: 'ESI', header: 'ESI' },
		{ field: 'ptax', header: 'P-Tax' },
		{ field: 'City Allowance', header: 'City Allowance' },
		{ field: 'Other Allowance', header: 'Other Allowance' },
		{ field: 'Travelling Allowance', header: 'P-Tax' },
		{ field: 'City Allowance', header: 'Travelling Allowance' },
		{ field: 'Education Allowance', header: 'Education Allowance' },
		{ field: 'Encashed Allowance', header: 'Encashed Allowance' },
		{ field: 'Leaves', header: 'Leaves' },
	];

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

				doc.autoTable(exportColumns, dataList);
				doc.save('empList.pdf');
			});
		});
	};

	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(dataList);
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

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const renderHeader = () => {
		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<div className='flex flex-wrap gap-2 justify-content-between align-items-center'>
					<h4 className='m-0'>Customers</h4>
					<span className='p-input-icon-left'>
						<i className='pi pi-search' />
						<InputText
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder='Keyword Search'
						/>
					</span>
				</div>
				<Box display='flex' justifyContent='space-between'>
					<Menu>
						<MenuButton
							as={Button}
							rightIcon={
								<ChevronDownIcon
									boxSize={8}
									color='var(--chakra-colors-claimzTextBlueColor)'
								/>
							}
							border='2px solid var(--chakra-colors-claimzBorderColor)'
							borderRadius='15px'
							height='45px'
							padding='0px 20px'
							mr='10px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontSize='1.6rem'
								fontWeight='700'>
								Show
							</Text>
						</MenuButton>
						<MenuList
							sx={{
								'& .chakra-menu__menuitem': {
									padding: '10px 15px',
								},
							}}>
							<MenuItem>Download</MenuItem>
							<MenuItem>Create a Copy</MenuItem>
							<MenuItem>Mark as Draft</MenuItem>
							<MenuItem>Delete</MenuItem>
							<MenuItem>Attend a Workshop</MenuItem>
						</MenuList>
					</Menu>
					<Button
						border='2px solid var(--chakra-colors-claimzBorderColor)'
						borderRadius='15px'
						height='45px'
						padding='0px 20px'
						mr='10px'
						type='button'
						icon='pi pi-file-pdf'
						severity='warning'
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						onClick={exportPdf}
						data-pr-tooltip='PDF'>
						<Text
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontSize='1.6rem'
							fontWeight='700'>
							PDF
						</Text>
					</Button>
					<Button
						border='2px solid var(--chakra-colors-claimzBorderColor)'
						borderRadius='15px'
						height='45px'
						padding='0px 20px'
						mr='10px'
						type='button'
						icon='pi pi-file-excel'
						severity='success'
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						onClick={exportExcel}
						data-pr-tooltip='XLS'>
						<Text
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontSize='1.6rem'
							fontWeight='700'>
							Excel
						</Text>
					</Button>
					<Button
						border='2px solid var(--chakra-colors-claimzBorderColor)'
						borderRadius='15px'
						height='45px'
						padding='0px 20px'
						mr='10px'>
						<Link to='/manage-employee/create-new-employee'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontSize='1.6rem'
								fontWeight='700'>
								Create New
							</Text>
						</Link>
					</Button>
				</Box>
			</Box>
		);
	};

	const ActionTemplate = (rowData) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		return (
			<>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}
					_focus={{ bg: 'none' }}>
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
								width='400px'
								pb='10px'
								mb='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									Employee List Details
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<Box position='fixed'>
								<Button
									bg='none'
									_hover={{ bg: 'none' }}
									_active={{ bg: 'none' }}
									_focus={{ bg: 'none' }}
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									borderRadius='15px'
									height='45px'
									padding='0px 20px'
									mr='10px'>
									<Text
										background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
										backgroundClip='text'
										fontSize='1.6rem'
										fontWeight='700'>
										Edit
									</Text>
								</Button>
								<Button
									bg='none'
									_hover={{ bg: 'none' }}
									_active={{ bg: 'none' }}
									_focus={{ bg: 'none' }}
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									borderRadius='15px'
									height='45px'
									padding='0px 20px'
									mr='10px'>
									<Text
										background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
										backgroundClip='text'
										fontSize='1.6rem'
										fontWeight='700'>
										Delete
									</Text>
								</Button>
								<Button
									bg='none'
									_hover={{ bg: 'none' }}
									_active={{ bg: 'none' }}
									_focus={{ bg: 'none' }}
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									borderRadius='15px'
									height='45px'
									padding='0px 20px'
									mr='10px'>
									<Text
										background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
										backgroundClip='text'
										fontSize='1.6rem'
										fontWeight='700'>
										Block User
									</Text>
								</Button>
								<Button
									bg='none'
									_hover={{ bg: 'none' }}
									_active={{ bg: 'none' }}
									_focus={{ bg: 'none' }}
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									borderRadius='15px'
									height='45px'
									padding='0px 20px'
									mr='10px'>
									<Text
										background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
										backgroundClip='text'
										fontSize='1.6rem'
										fontWeight='700'>
										Save
									</Text>
								</Button>
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const header = renderHeader();

	return (
		<CssWrapper>
			<Box className='card'>
				<DataTable
					value={dataList}
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
						header='Action'
						body={ActionTemplate}
						bodyStyle={{ textAlign: 'center' }}
					/>
				</DataTable>
				{/* pegination */}
				{/* <Box display='flex' justifyContent='flex-end' backgroundColor='white'>
                    <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
                </Box> */}
			</Box>
		</CssWrapper>
	);
};

export default SalaryReportTable;
