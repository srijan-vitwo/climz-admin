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

const AddNewType = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const toast = useToast()
    const [msg, setMsg] = useState()
    const [inputs, setInputs] = useState([""]);

    function toastCall() {
        return (toast({
            title: 'Tier Master Added Sucessfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
        }))
    }

    function handleChange(index, event) {
        const values = [...inputs];
        values[index] = event.target.value;
        setInputs(values);
        // let res = `["${inputs.join(`","`)}"]`;
        // console.log("res:", res);
    }

    function handleAddInput() {
        const values = [...inputs];
        values.push("");
        setInputs(values);
    }

    function handleRemoveInput(index) {
        const values = [...inputs];
        values.splice(index, 1);
        setInputs(values);
    }

    // console.log(inputs, 'ggg')

    const addTiremaster = async (e) => {
        e.preventDefault();



        let formData = new FormData();
        formData.append("datas", `["${inputs.join('","')}"]`);

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/tier-post`,
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
            console.error("Error:", data.message);
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
                <Heading>Add New Type/Category</Heading>
            </Box >

            <Box display='flex' justifyContent='space-between' mt='30px'>
                <Box width='100%' background='#EAEBEA'
                    boxShadow='1px 1px 3px rgba(0,0,0,0.3)' p='40px 30px' borderRadius='6px'>
                    <form onSubmit={addTiremaster}>
                        <Box display='flex' flexDirection='column' alignItems='end'>
                            <FormControl w='100%' alignItems='center'>
                                <FormLabel>Add Tier Master <Button w='20%' p='0px' width='10px' bg='none' _hover={{ bg: 'none' }}
                                    _active={{ bg: 'none' }}
                                    _focus={{ bg: 'none' }} onClick={handleAddInput}><i className="fa-sharp fa-solid fa-plus"></i></Button></FormLabel>
                                {inputs.map((input, index) => (
                                    <Box w='100%' display='flex' alignItems='center' key={index}>
                                        <Input
                                            type="text"
                                            mb='10px'
                                            value={input.value}
                                            onChange={event => handleChange(index, event)}
                                        />
                                        <Button mt='-10px' color='var(--chakra-colors-claimzTextBlueLightColor)' bg='none' _hover={{ bg: 'none' }}
                                            _active={{ bg: 'none' }}
                                            _focus={{ bg: 'none' }} onClick={() => handleRemoveInput(index)}><i className="fa-solid fa-trash"></i></Button>
                                    </Box>
                                ))}

                            </FormControl>

                            <Button
                                bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
                                border='4px solid #FFFFFF'
                                boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                                borderRadius='15px'
                                p='15px 20px'
                                fontSize='1.6rem'
                                color='white'
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

export default AddNewType