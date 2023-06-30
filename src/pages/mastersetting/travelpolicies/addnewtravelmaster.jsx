import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Heading,
    Select,
    FormControl,
    FormLabel,
    Input,
    useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const AddNewTravelMaster = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const toast = useToast()
    const [msg, setMsg] = useState()
    const [name, setName] = useState()
    const [type, setType] = useState()
    const [departmentList, setDepartmentList] = useState()

    function toastCall() {
        return (toast({
            title: 'Travel Master List Create Sucessfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
        }))
    }


    const departmentAdd = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/mode-of-travel-post`,
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            toastCall()
            setMsg(!msg);
        } else {
            navigate('/login')
        }
    };


    return (
        <Box>
            <Box
                margin='0 auto'
                bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
                boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                color='white'
                padding='10px 15px'
            >
                <Heading>Add New Travel Master</Heading>
            </Box >

            <Box display='flex' justifyContent='space-between' mt='30px'>
                <Box width='100%' background='#EAEBEA'
                    boxShadow='1px 1px 3px rgba(0,0,0,0.3)' p='40px 30px' borderRadius='6px'>
                    <form onSubmit={departmentAdd}>
                        <Box display='flex' flexDirection='column' alignItems='end'>
                            <FormControl mb='10px'>
                                <FormLabel>Add Travel Mode Name</FormLabel>
                                <Input type='text' onChange={e => setName(e.target.value)} required />
                            </FormControl>
                            <FormControl mb='10px'>
                                <FormLabel>Add Travel Type Name</FormLabel>
                                <Select placeholder='Select option' onChange={(e) => setType(e.target.value)}>
                                    <option value="train">Train</option>
                                    <option value="flight">Flight</option>
                                    <option value="others">Others</option>
                                </Select>
                            </FormControl>
                            <Button
                                bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
                                border='4px solid #FFFFFF'
                                boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                                borderRadius='15px'
                                p='15px 20px'
                                fontSize='1.6rem'
                                color='white'
                                mt='20px'
                                _hover={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                                _active={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                                _focus={{ bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)' }}
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>

            </Box >
        </Box>
    )
}

export default AddNewTravelMaster