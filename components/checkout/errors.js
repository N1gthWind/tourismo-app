import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, VStack, Center, NativeBaseProvider } from "native-base"

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}

const Errors = (props) => {
    if (props.shown && typeof props.errorData.data === 'undefined') {
        return (
            <Center>
                {
                    Object.keys(props.errorData).map(function (key, index) {
                        return (

                            <Text color="red.600" key={generateKey(props.errorData[key][0])}>{props.errorData[key][0]}</Text>

                        )
                    })
                }
            </Center>
        );
    } else {
        return null;
    }
}
export default Errors;