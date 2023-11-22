import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ImageBox = (props) => {
    return (
        <>
           <View style={styles.ImageBox}>
               <Image
                source={props.imagePath}
                style={styles.img}
               />
              <View style={styles.imgText}>
                 <Text style={styles.titles}>{props.Text}</Text>
              </View>
           </View>
        </>
    );
};

const styles = StyleSheet.create({
    ImageBox:{
        display:"flex",
        flex:1,
        justifyContent:"center",
       marginLeft:wp(2),
       marginBottom:hp(8),
       width:wp(25),
       padding:10
    },
    img:{
        borderRadius:wp(2),
         width:wp(23),
         height:hp(15)
    },
    imgText:{
        alignItems:"center",
        marginTop:hp(-5)
    },
    titles:{
        //  alignItems:"center"
        color:"white",
        fontSize:wp(4),
        fontWeight:"400",
    }

});

export default ImageBox;