import React, { useState } from 'react';
import {
	Box,
	Button,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Tdsform = ({ rowData }) => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const toast = useToast();
	const [msg, setMsg] = useState();
	const [inputs, setInputs] = useState([]);
	const [departmentId, setDepartmentId] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [flag, setFlag] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function toastCall() {
		return toast({
			title: 'Cost Center Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function handleChange(index, event) {
		const values = [...inputs];
		values[index] = event.target.value;
		setInputs(values);
	}

	function handleAddInput() {
		const values = [...inputs];
		values.push('');
		setInputs(values);
		setFlag(true);
		setDepartmentId(rowData.department.id);
	}

	function handleRemoveInput(index) {
		const values = [...inputs];
		values.splice(index, 1);
		setInputs(values);
		setFlag(false);
	}

	const addCostCenter = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('department_id', departmentId);
		formData.append('cost_center_name', inputs);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/cost-center-post/${departmentId}`,
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
				setMsg(!msg);
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
			<Button
				onClick={onOpen}
				bg='none'
				_hover={{ bg: 'none' }}
				_active={{ bg: 'none' }}>
				<i className='fa-solid fa-eye fa-2x'></i>
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				size='xl'>
				<DrawerOverlay />
				<DrawerContent
					maxW='50% !important'
					bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
					<DrawerCloseButton size='lg' />
					<DrawerHeader pt='28px'>
						<Box
							borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
							width='550px'
							pb='10px'
							mb='15px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='36px'>
								Employee Department List Update
							</Text>
						</Box>
					</DrawerHeader>

					<DrawerBody></DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Tdsform;
