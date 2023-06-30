import React, { useState } from "react";
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    useToast,
    useDisclosure
} from '@chakra-ui/react';

function AddTravelMode() {
    const toast = useToast()
    let tokens = localStorage.getItem("token");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [componentName, setComponentName] = useState()
    const [type, setType] = useState()
    const [sucess, setsucess] = useState()

    function toastCall() {
        return (toast({
            title: 'Mode of Travel Master Added Sucessfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
        }))
    }

    const travelMasterAdd = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("component_name", componentName);
        formData.append("type", type);

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/convayence-mode-of-travel-post`,
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${tokens}`,
                },
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            toastCall()
            setsucess(!sucess)
        } else {
            console.error("Error:", data.message);
        }
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='flex-end'>
            <Box w='100%' display='flex' gap='10px' mb='10px' alignItems='center' justifyContent='space-between'>
                <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} onSubmit={travelMasterAdd}>
                    <FormControl w='100%' mb='15px'>
                        <FormLabel>
                            Enter Mode Of Travel <Box as='span' color='orange'>*</Box>
                        </FormLabel>
                        <Input type='text' onChange={(e) => setComponentName(e.target.value)} required />
                    </FormControl>
                    <FormControl w='100%'>
                        <FormLabel>
                            Enter Mode Of Type <Box as='span' color='orange'>*</Box>
                        </FormLabel>
                        <Input type='text' onChange={(e) => setType(e.target.value)} required />
                    </FormControl>
                    <Button
                        bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
                        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                        borderRadius='5px'
                        p='20px 20px'
                        fontSize='1.6rem'
                        color='white'
                        mt='28px'
                        _hover={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                        _active={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                        _focus={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                        type='submit'
                        onClick={onClose}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
}


export default AddTravelMode