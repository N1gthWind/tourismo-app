// Aboutscreen.js
import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Cities from "../services/cities";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getValueFromSecureStore } from '../services/securestore';
import * as SecureStore from 'expo-secure-store';
import { Button as ButtonNative } from "react-native-elements";
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    Spinner,
    HStack,
    Stack,
    Button,
    Icon,
    ScrollView,
    NativeBaseProvider,
} from "native-base"



export default class Aboutscreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }


    handleCityClcik(hotel) {
        if(hotel.length > 0) {
        
        }
            
        this.props.navigation.navigate('Checkout',{ hotel : hotel })
    }


    async componentDidMount() {
        const city = new Cities();
        let result = [];

        const citydata_response = await city.GetCityData()
            .then(data => {
                result.push(data);
            })
            .catch((error) => {
                console.log(error)
            })
        this.setState({
            items: result
        });




      
        
    }

    Example = () => {
        let city_datas = this.state.items[0];
        return (
            <ScrollView
                _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72",
                }}
            >
                <Heading textAlign="center" m="4">
                    Cities:
                </Heading>
                {city_datas.map((data) => {
                    const imageName = data.image;
                    return (
                        <Box key={data.city_id}
                            m="2"
                            maxW="80"
                            rounded="lg"
                            overflow="hidden"
                            borderColor="coolGray.200"
                            borderWidth="1"
                            _dark={{
                                borderColor: "coolGray.600",
                                backgroundColor: "gray.700",
                            }}
                            _web={{
                                shadow: 2,
                                borderWidth: 0,
                            }}
                            _light={{
                                backgroundColor: "gray.100",
                            }}
                        >
                            <Box backgroundColor="violet.400">
                                <AspectRatio w="100%" ratio={16 / 9}>
                                    <Image source={{
                                        uri: "http://tourism.nhely.hu/images/" + data.image,
                                    }} alt="image"
                                    />
                                </AspectRatio>
                                <Center
                                    bg="emerald.500"
                                    _dark={{
                                        bg: "emerald.500",
                                    }}
                                    _text={{
                                        color: "warmGray.50",
                                        fontWeight: "700",
                                        fontSize: "xs",
                                    }}
                                    position="absolute"
                                    bottom="0"
                                    px="3"
                                    py="1.5"
                                >
                                    PHOTOS
                                </Center>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading color="emerald.500" size="md" ml="-1">
                                        {data.name}
                                    </Heading>
                                </Stack>
                                <Text fontWeight="400" fontSize="md">
                                    {data.description}
                                </Text>
                                <HStack>
                                    <HStack w="100%" justifyContent="space-between" alignItems="center">
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                            fontWeight="bold"
                                        >
                                            {data.date_difference}
                                        </Text>
                                        <Button
                                            leftIcon={<Icon as={FontAwesome} name="calendar-check-o" color="white" />}
                                            bg="emerald.500" colorScheme="emerald" onPress={() => { this.handleCityClcik(data.hotels) }}
                                        >
                                            Reserve
                                        </Button>
                                    </HStack>
                                </HStack>
                            </Stack>
                        </Box>
                    )
                })}

            </ScrollView>
        )
    }



    render() {
        let render_data = null;
        if (this.state.items.length === 0) {
            render_data = (
                <NativeBaseProvider>
                    <Center flex={1} px="3">
                        <Stack>
                            <Spinner style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} size="lg" color="emerald.500" accessibilityLabel="Loading cities" />
                            <Heading m="5" color="emerald.500" fontSize="lg">
                                Loading...
                            </Heading>
                        </Stack>
                    </Center>
                </NativeBaseProvider>
            );
        } else {
            render_data = (
                <NativeBaseProvider>
                    <Center flex={1} px="3">
                        {this.Example()}
                    </Center>
                </NativeBaseProvider>
            );
        }
        return (
            render_data
        )
    }
}