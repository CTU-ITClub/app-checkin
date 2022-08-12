import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Agenda, AgendaSchedule, DateData} from "react-native-calendars";
import {DEFAULT_TIMEOUT} from "../../../constants/common";
import {isFn, showSnackBar} from "../../../utils/utils";
import moment from "moment";

const currentDate = moment().format('YYYY-MM-DD');

const EventsScreen = () => {

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<AgendaSchedule>({});

    const toggleLoading = (callback: any, delay: number = DEFAULT_TIMEOUT) => {
        setLoading(true);
        setTimeout(() => {
            if (isFn(callback)) {
                setSelectedDate(currentDate);
            }
            setLoading(false);
        }, delay);
    }

    const handlePressedDate = (day: any) => {
        setSelectedDate(day.dateString)
        toggleLoading(null, 0);
    }

    const handleRefreshCalendar = () => {
        toggleLoading(() => {
            setSelectedDate(currentDate);
        });
    }

    const loadItems = (day: DateData) => {
        const items: any = events || {};

        setTimeout(() => {
            for (let i = -20; i < 85; i++) {
                const strTime = moment(day.dateString, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD');

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Meeting: ' + strTime,
                            height: 80,
                            day: strTime,
                            duration: 15,
                            room: 'Atrium'
                        });
                    }
                }
            }

            const newItems: AgendaSchedule = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setEvents(newItems)
        }, 1000);
    }

    const renderItem = (reservation: any, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
            <TouchableOpacity
                style={[styles.item, {height: reservation.height}]}
                onPress={() => showSnackBar(reservation.name)}
            >
                <Text style={{fontSize, color}}>{reservation.name}</Text>
                <View style={styles.contentInline}>
                    <Text style={styles.text}>{reservation.duration}'</Text>
                    <Text style={styles.text}>{reservation.room}</Text>
                </View>
            </TouchableOpacity>
        );

        // return item.day === selectedDate ? (
        //     <View style={styles.item}>
        //         <Text style={styles.text}>{item.day}</Text>
        //         <Text style={styles.text}>{item.name}</Text>
        //         <View style={styles.contentInline}>
        //             <Text style={styles.text}>{item.duration}</Text>
        //             <Text style={styles.text}>{item.room}</Text>
        //         </View>
        //     </View>
        // ) : <View />;
    }

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    useEffect(() => {
        toggleLoading(null);
    }, [])

    useEffect(() => {
        console.log('day pressed', selectedDate);
    }, [selectedDate]);

    return (
        <>
            <Agenda
                // The list of items that have to be displayed in agenda. If you want to render item as empty date
                // the value of date key has to be an empty array []. If there exists no value for date key it is
                // considered that the date in question is not yet loaded
                items={events}
                // Callback that gets called when items for a certain month should be loaded (month became visible)
                loadItemsForMonth={loadItems}
                // Callback that fires when the calendar is opened or closed
                onCalendarToggled={calendarOpened => {
                    console.log(calendarOpened);
                }}
                // Callback that gets called on day press
                onDayPress={handlePressedDate}
                // Callback that gets called when day changes while scrolling agenda list
                onDayChange={day => {
                    console.log('day changed', day);
                }}
                // Initially selected day
                selected={selectedDate}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2022-07-17'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2022-07-23'}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Specify how each item should be rendered in agenda
                renderItem={renderItem}
                // Specify how each date should be rendered. day can be undefined if the item is not first in that day
                renderDay={(day, item) => {
                    return <View/>;
                }}
                // Specify how empty date content with no items should be rendered
                renderEmptyDate={renderEmptyDate}
                // Specify how agenda knob should look like
                renderKnob={() => {
                    return <View/>;
                }}
                // Specify what should be rendered instead of ActivityIndicator
                renderEmptyData={() => {
                    return <View/>;
                }}
                // Specify your item comparison function for increased performance
                rowHasChanged={(r1, r2) => r1.name !== r2.name}
                // Hide knob button. Default = false
                hideKnob={true}
                // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                showClosingKnob={false}
                // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                // markedDates={{
                //     '2022-07-17': {selected: selectedDate === '2022-07-17', marked: false, disabled: false},
                //     '2022-07-18': {selected: selectedDate === '2022-07-18', marked: true, disabled: false},
                //     '2022-07-19': {selected: selectedDate === '2022-07-19', marked: true, disabled: false},
                //     '2022-07-20': {selected: selectedDate === '2022-07-20', marked: true, disabled: false},
                //     '2022-07-21': {selected: selectedDate === '2022-07-21', marked: true, disabled: false},
                //     '2022-07-22': {selected: selectedDate === '2022-07-22', marked: false, disabled: false},
                //     '2022-07-23': {selected: selectedDate === '2022-07-23', marked: false, disabled: false}
                // }}
                // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                disabledByDefault={true}
                // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
                onRefresh={handleRefreshCalendar}
                // Set this true while waiting for new data from a refresh
                refreshing={loading}
                // Agenda theme
                theme={{
                    agendaDayTextColor: 'yellow',
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'blue'
                }}
                // Agenda container style
                style={styles.calendar}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    calendar: {},
    contentInline: {
        margin: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 15,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        marginLeft: 10,
    },
    text: {
        color: '#000',
        margin: 5
    }
})

EventsScreen.propTypes = {};

EventsScreen.defaultProps = {};

export default EventsScreen;