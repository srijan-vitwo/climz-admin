import {
	Box,
	Image,
	Drawer,
	DrawerBody,
	DrawerOverlay,
	DrawerContent,
	Button,
	Switch,
	FormControl,
	FormLabel,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import Template from '../../../assets/images/template.avif';

const PersonalTemplate = ({ OwnTemplate }) => {
	const btnRef = React.useRef();
	const [selectedTextBox, setSelectedTextBox] = useState(null);
	const [modalData, setModalData] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [text, setText] = useState('');

	// Handle click event on text box
	const handleTextBoxClick = (data) => {
		setSelectedTextBox(data);
		setModalData(data); // Set the data for the modal
	};
	const handleModalClick = (modalData) => {
		onOpen();
		setText(modalData?.template_html); // Set the data for the modal
	};

	console.log(text, 'text');

	return (
		<Box height='calc(100vh - 188px)'>
			<Box display='flex'>
				{OwnTemplate?.map((data, index) => {
					return (
						<Box
							key={index}
							width='30%'
							textAlign='center'
							borderWidth='1px'
							borderRadius='5px'
							shadow='1px 1px 3px rgba(0,0,0,0.3)'
							bg='white'
							paddingTop='20px'
							marginRight='2%'>
							<Image
								src={Template}
								alt='Dan Abramov'
								margin='0 auto'
								height='250px'
								width='100%'
							/>
							<Button
								m='15px 0px'
								bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='10px'
								p='20px'
								fontSize='1.4rem'
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
								onClick={() => handleTextBoxClick(data)}
								ref={btnRef}>
								{data.template_name}
							</Button>
						</Box>
					);
				})}
			</Box>

			<Drawer
				placement='right'
				finalFocusRef={btnRef}
				isOpen={selectedTextBox !== null}
				onClose={() => setSelectedTextBox(null)}>
				<DrawerOverlay />
				<DrawerContent
					maxW='50% !important'
					bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
					<DrawerBody p='0px'>
						<Box
							bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							color='white'
							padding='10px 15px'
							display='flex'
							justifyContent='space-between'
							alignItems='center'>
							<FormControl display='flex' alignItems='center'>
								<FormLabel
									htmlFor='email-alerts'
									mb='0'
									color='white !important'
									fontSize='1.6rem !important'>
									Make Your Own Template
								</FormLabel>
								<Switch id='email-alerts' size='lg' />
							</FormControl>
							<Button
								onClick={() => handleModalClick(modalData)}
								bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='5px'
								p='20px 20px'
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
								}}>
								Edit
							</Button>
						</Box>

						{modalData && (
							<Box
								p='20px 10px'
								borderRadius='0px 0px 5px 5px'
								shadow='1px 1px 3px rgba(0,0,0,0.3)'
								bg='white'>
								<Box
									dangerouslySetInnerHTML={{
										__html: modalData?.template_html,
									}}
								/>
							</Box>
						)}

						<Modal onClose={onClose} isOpen={isOpen} isCentered>
							<ModalOverlay />
							<ModalContent minW='50%'>
								<ModalHeader>Update Template</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Editor
										value={text}
										onTextChange={(e) =>
											setText(e.htmlValue)
										}
										style={{ height: '320px' }}
									/>
								</ModalBody>
								<ModalFooter>
									<Button
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='5px'
										p='20px 20px'
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
										}}>
										Update
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	);
};

export default PersonalTemplate;
