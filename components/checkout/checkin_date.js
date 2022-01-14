import DateTimePicker from '@react-native-community/datetimepicker';


const CheckIn = (props) => {
    if (props.shown) {
        return (
            <DateTimePicker
                style={{
                    shadowColor: '#fff',
                    shadowRadius: 0,
                    shadowOpacity: 1,
                    shadowOffset: { height: 0, width: 0 },
                }}
                themeVariant="dark"
                testID="dateTimePicker"
                value={props.currentvalue}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={props.onChange}
            />
        );
    }
    else {
        return null;
    }

}
export default CheckIn;