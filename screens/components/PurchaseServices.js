import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native"

import Icons from "./Icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



const PurchaseServices = () => {
    return (
        <View style={{ flex: 1 }}>

            <View style={styles.box}>
                <Text style={styles.title}>Purchase Services</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.iconsBox}>
                        <Icons
                            imagePath={require("../assets/Asset38.png")}
                            Text={"Gift Card"}
                        />
                        <Icons
                            imagePath={require("../assets/Asset39.png")}
                            Text={"Digital Gold"}
                        />
                        <Icons
                            imagePath={require("../assets/Asset37.png")}
                            Text={"Traffice Challan"}
                        />
                        <Icons
                            imagePath={require("../assets/Asset36.png")}
                            Text={"Google Play Recharge"}
                        />
                        <Icons
                            imagePath={require("../assets/datacard.png")}
                            Text={"Amazon Gift Card"}
                        />
                    </View>
                </ScrollView>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        display: "flex",
        // borderBottomColor:"rgba(0,0,0,0.4)",
        // borderBottomWidth:0.5,
        // borderRadius:40,
        paddingBottom:20
    },
    title: {
        paddingLeft: wp(3),
        fontWeight: "700",
        fontSize: wp(4),
        color:"black"
    },
    iconsBox: {
        display: 'flex',
        flexDirection: "row"
    },
    line: {
        marginTop: hp(3),
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        borderBottomLeftRadius: wp(30),
        borderBottomRightRadius: wp(30),
        shadowOffset: {height: hp(4)},
        shadowColor: 'green',
        elevation: 8,
        
    },
})


export default PurchaseServices;