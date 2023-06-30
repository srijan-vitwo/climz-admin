import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    useToast,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { Editor } from "primereact/editor";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import styled from '@emotion/styled'
import EmployeeUpdate from './updateEmploye.jsx';
import { useNavigate } from 'react-router-dom';
import Loader from "../../../assets/images/loader.gif"

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


    .p-datatable-emptymessage .p-datatable .p-datatable-tbody>tr>td{
        text-align: center;
    }
    .p-datatable .p-sortable-column .p-column-title{
        font-size: 1.4rem;
    }
    .p-datatable .p-datatable-tbody > tr > td{
         font-size: 1.4rem;
         padding: 15px 10px;
    }
    .p-paginator{
        padding: 15px 10px;
    }
    .p-component{
        font-size: 1.4rem;
    }
    .p-dropdown-label{
        display: flex;
        align-items: center;
    }
    .p-datatable .p-column-header-content{
        justify-content: center;
    }
    .p-paginator .p-paginator-pages .p-paginator-page{
        font-size: 1.4rem;
    }
    .p-paginator .p-dropdown .p-dropdown-label{
        font-size: 1.4rem;
    }
    .p-datatable .p-datatable-tbody>tr>td{
        text-align: center;
    }
    .p-datatable .p-datatable-header{
        border-top: none;
    }
    .p-datatable > .p-datatable-wrapper {
        overflow: auto;
        height: calc(100vh - 358px);
        padding-right: 5px;
        margin-right: 5px;
    }

`
const EmployeeDataList = () => {
    const navigate = useNavigate();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [msg, setMsg] = useState()
    const [empList, setEmpList] = useState();
    const [offerLetter, setOfferLetter] = useState()
    const [fromValue, setFromValue] = useState([]);
    const [userData, setUserData] = useState("");
    const [loader, setLoader] = useState(false)
    const [fromLoader, setFromLoader] = useState(false)

    const cols = [
        { field: 'emp_code', header: 'Emp Code' },
        { field: 'emp_name', header: 'Emp Name' },
        { field: 'mobile_no', header: 'Ph Number' },
        { field: 'department_name', header: 'Department' },
        { field: 'primary', header: '1st Reporting' },
        { field: 'secondary', header: '2nd Reporting' }
    ];

    useEffect(() => {
        let token = localStorage.getItem("token");
        const formDataValue = async () => {
            try {
                setLoader(true)
                const response1 = await fetch(`${process.env.REACT_APP_API_URL}/emp-list/${rows}?page=${first}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response1.ok) {
                    const data = await response1.json();
                    setEmpList(data.data)
                    setLoader(false)
                } else {
                    navigate('/login')
                }
            } catch (error) {
                navigate('/login')
            }
        };
        formDataValue()
    }, [first, rows, msg]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

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
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'empList');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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

    const renderHeader = () => {
        return (
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                    <Heading mb='5px' fontSize='1.4rem' color='var(--chakra-colors-claimzTextBlueColor)'>Search Employee</Heading>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </span>
                </div>
                <Box display='flex' justifyContent='space-between'>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon boxSize={8} color='var(--chakra-colors-claimzTextBlueColor)' />} border='2px solid var(--chakra-colors-claimzBorderColor)' borderRadius='15px' height='45px' padding='0px 20px' mr='10px'>
                            <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                                backgroundClip='text'
                                fontSize='1.6rem' fontWeight='700'>
                                Show
                            </Text>
                        </MenuButton>
                        <MenuList sx={{
                            '& .chakra-menu__menuitem': {
                                padding: '10px 15px'
                            }
                        }}>
                            <Link to='/manage-employee/all-employee'><MenuItem fontWeight='600'>All Employee</MenuItem></Link>
                            <Link to='/manage-employee/probation-employee'><MenuItem fontWeight='600'>Probation Employee </MenuItem></Link>
                            <Link to='/manage-employee/separation-employee'><MenuItem fontWeight='600'>Separation Employee</MenuItem></Link>
                            <Link to='/manage-employee/notice-period-employee'><MenuItem fontWeight='600'>Notice Period Employee</MenuItem></Link>
                        </MenuList>
                    </Menu>

                    <Button border='2px solid var(--chakra-colors-claimzBorderColor)' borderRadius='15px' height='45px' padding='0px 20px' mr='10px'>
                        <Link to='/master-setting/create-new-employee'>
                            <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                                backgroundClip='text'
                                fontSize='1.6rem' fontWeight='700'>
                                <i className="fa-solid fa-plus"></i> Create New
                            </Text>
                        </Link>
                    </Button>
                    <Button border='2px solid var(--chakra-colors-claimzBorderColor)' borderRadius='15px' height='45px' padding='0px 20px' mr='10px' type="button" icon="pi pi-file-pdf" severity="warning" background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                        backgroundClip='text' onClick={exportPdf} data-pr-tooltip="PDF">
                        <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                            backgroundClip='text'
                            fontSize='1.6rem' fontWeight='700'>
                            <i className="fa-solid fa-file-pdf"></i>
                        </Text>
                    </Button>
                    <Button border='2px solid var(--chakra-colors-claimzBorderColor)' borderRadius='15px' height='45px' padding='0px 20px' mr='10px' type="button" icon="pi pi-file-excel" severity="success" background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                        backgroundClip='text' onClick={exportExcel} data-pr-tooltip="XLS">
                        <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                            backgroundClip='text'
                            fontSize='1.6rem' fontWeight='700'>
                            <i className="fa-solid fa-file-excel"></i>
                        </Text>
                    </Button>
                </Box >
            </Box>
        );
    };

    const ActionTemplate = (rowData) => {
        const token = localStorage.getItem("token");
        const toast = useToast()
        const [empId, setEmpId] = useState(rowData.id)
        const { isOpen, onOpen, onClose } = useDisclosure();
        const {
            isOpen: LetterIsOpen,
            onOpen: LetterOnOpen,
            onClose: LetterOnClose
        } = useDisclosure()

        function toastCallBlock() {
            return (toast({
                title: 'Block User Sucessfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            }));
        }

        function toastCallUnblock() {
            return (toast({
                title: 'Unblock User Sucessfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            }))
        }

        function toastCallFaild() {
            console.log("faild")
        }

        const empBlock = async (e) => {
            e.preventDefault();
            const formDataValue = async () => {
                try {
                    const response1 = await fetch(`${process.env.REACT_APP_API_URL}/emp-block/${empId}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response1.ok) {
                        toastCallBlock()
                        setMsg(!msg);
                        onClose()
                    } else {
                        console.error("Error:");
                        toastCallFaild()
                    }
                } catch (error) {
                    navigate('/login')
                }
            };
            formDataValue()
        };

        const empUnBlock = async (e) => {
            e.preventDefault();

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/emp-unblock/${empId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (response.status === 200) {
                toastCallUnblock()
                setMsg(!msg);
                onClose()
            } else {
                console.error("Error:", data.message);
                toastCallFaild()
            }
        };

        const formDataValue = async (e) => {
            e.preventDefault()
            onOpen()
            try {
                setFromLoader(true)
                const response1 = await fetch(`${process.env.REACT_APP_API_URL}/emp-form-view`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const response2 = await fetch(`${process.env.REACT_APP_API_URL}/emp-details/${empId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response1.ok) {
                    const data1 = await response1.json();
                    const data2 = await response2.json();
                    setFromValue(data1)
                    let tempUserData = data2;
                    setUserData(tempUserData);
                    setFromLoader(false)
                } else {
                    navigate('/login')
                }
            } catch (error) {
                navigate('/login')
            }
        };


        return (
            <>
                <Button onClick={formDataValue} bg='none' _hover={{ bg: 'none' }} _active={{ bg: 'none' }}>
                    <i className='fa-solid fa fa-eye fa-2x' ></i>
                </Button>

                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    size='xl'
                >
                    <DrawerOverlay />
                    <DrawerContent maxW='60% !important' bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
                        <DrawerCloseButton size='lg' />
                        <DrawerHeader pt='28px'>
                            <Box
                                borderBottom='3px solid var(--chakra-colors-claimzBorderColor)' width='500px' pb='10px' mb='15px'>
                                <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                                    backgroundClip='text'
                                    fontWeight='700'
                                    fontSize='28px'
                                    lineHeight='36px'>{rowData.emp_name} Employee Details</Text>
                            </Box >
                        </DrawerHeader>

                        <DrawerBody>
                            <Box display='flex'>
                                {rowData.is_active == true ?
                                    <Button onClick={empBlock} mr='15px' fontSize='1.4rem' padding='20px 10px' background='var(--chakra-colors-claimzMainGeadientColor)' color='white' display='flex' alignItems='center' justifyContent='center' borderRadius='50px' _hover={{ background: 'var(--chakra-colors-claimzMainGeadientColor)' }} _active={'none'} >
                                        <Text fontWeight='600'>
                                            <i className="fa-solid fa-lock"></i> Block User
                                        </Text>
                                    </Button>
                                    :
                                    <Button onClick={empUnBlock} mr='15px' fontSize='1.4rem' padding='20px 10px' background='var(--chakra-colors-claimzMainGeadientColor)' color='white' display='flex' alignItems='center' justifyContent='center' borderRadius='50px' _hover={{ background: 'var(--chakra-colors-claimzMainGeadientColor)' }} _active={'none'}>
                                        <Text fontWeight='600'>
                                            <i className="fa-solid fa-unlock"></i> Unblock User
                                        </Text>
                                    </Button>
                                }
                                <Button onClick={LetterOnOpen} mr='15px' fontSize='1.4rem' padding='20px 10px' background='var(--chakra-colors-claimzMainGeadientColor)' color='white' display='flex' alignItems='center' justifyContent='center' borderRadius='50px' _hover={{ background: 'var(--chakra-colors-claimzMainGeadientColor)' }} _active={'none'}>
                                    Warning Letter
                                </Button>
                                <Button onClick={LetterOnOpen} mr='15px' fontSize='1.4rem' padding='20px 10px' background='var(--chakra-colors-claimzMainGeadientColor)' color='white' display='flex' alignItems='center' justifyContent='center' borderRadius='50px' _hover={{ background: 'var(--chakra-colors-claimzMainGeadientColor)' }} _active={'none'}>
                                    Terminate Letter
                                </Button>
                            </Box>
                            <Box mt='20px'>
                                {fromLoader ?
                                    <Box width='100%'
                                        height='calc(100vh - 172px)'
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='center'>
                                        <Image src={Loader} alt='Loader' />
                                    </Box> :
                                    <EmployeeUpdate details={rowData.id} fromValue={fromValue} userData={userData} FromLoader={fromLoader} msg={msg} setMsg={setMsg} />}
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                <Modal onClose={LetterOnClose} isOpen={LetterIsOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent maxW='50% !important' bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
                        <form>
                            <ModalHeader pt='28px'>
                                <Box
                                    borderBottom='3px solid var(--chakra-colors-claimzBorderColor)' width='400px' pb='10px' mb='15px'>
                                    <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                                        backgroundClip='text'
                                        fontWeight='700'
                                        fontSize='28px'
                                        lineHeight='36px'>Letter Config Template</Text>
                                </Box >
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <div className="card">
                                    <Editor value={offerLetter} onTextChange={(e) => setOfferLetter(e.htmlValue)} style={{ height: '320px' }} />
                                </div>
                            </ModalBody>
                            <ModalFooter pb='28px'>
                                <Button
                                    type='submit'
                                    bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
                                    border='4px solid #FFFFFF'
                                    boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                                    borderRadius='15px'
                                    p='20px 20px'
                                    fontSize='1.6rem'
                                    color='white'
                                    _hover={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                                    _active={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                                    _focus={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                                    onClick={onClose}
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </>
        );
    };

    const StatusTemplate = (rowData) => {
        return (
            <Box>
                {rowData.is_active === '1' ? <Box
                    width='20px'
                    height='20px'
                    display='flex'
                    margin='0 auto'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='100%'
                    border='2px solid var(--chakra-colors-statusInactiveStrokeColor)'
                    boxShadow='0px 0px 7px var(--chakra-colors-boxShadowGrayColor)'
                    color='var(--chakra-colors-statusActiveColor)'
                >
                    <i className="fa-solid fa-circle"></i>
                </Box >
                    :
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
                        color='var(--chakra-colors-claimzTextGrayColor)'
                    >
                        <i className="fa-solid fa-circle"></i>
                    </Box >}
            </Box>
        )
    }

    const header = renderHeader();


    return (
        <CssWrapper >
            {loader ?
                <Box height='calc(100vh - 220px)' display='flex'
                    alignItems='center'
                    justifyContent='center'>
                    <Image src={Loader} alt='Loader' />
                </Box> :
                <Box className="card">
                    <DataTable value={empList?.data} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)} dataKey="id" >
                        {cols.map((col, index) => (
                            <Column key={index} field={col.field} header={col.header} />
                        ))}
                        <Column header="Status" body={StatusTemplate} bodyStyle={{ textAlign: 'center' }} style={{ width: '14%' }} />
                        <Column header="Action" body={ActionTemplate} bodyStyle={{ textAlign: 'center' }} style={{ width: '14%' }} />
                    </DataTable>
                    {/* pegination */}
                    <Box display='flex' justifyContent='flex-end' backgroundColor='white'>
                        <Paginator first={first} rows={rows} totalRecords={empList?.total} rowsPerPageOptions={[30, 50, 100, `${empList?.total}`]} onPageChange={onPageChange} />
                    </Box>
                </Box>
            }
        </CssWrapper>
    );
}

export default EmployeeDataList