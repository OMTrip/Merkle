import React, {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';

import {Dimensions, Image, View, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const width = Dimensions.get('window').width;

const SliderCard = () => {
  // let Data = [
  //   {
  //     image: require('../../assets/Slider-5.png'),
  //   },
  //   {
  //     image: require('../../assets/Slider-1.png'),
  //   },
  //   {
  //     image: require('../../assets/SENDMONEYTOBANK.png'),
  //   },
  // ];

  const [Images] = useState([
    require('../../assets/CREDITCARD1.png'),
    require('../../assets/invetment.png'),
    require('../../assets/SENDMONEYTOBANK.png'),
  ]);

  const _renderItem = ({item, index}) => {
    return (
      <Image
        source={item.image}
        key={index}
        resizeMode="cover"
        style={
          {
            // flex: 1,
            // borderRadius: 15,
            // height: hp(12),
            // width: wp(93.2),
            // shadowColor: '#ccc',
            // shadowOffset: {
            //   width: 0,
            //   height: 7,
            // },
            // shadowOpacity: 0.41,
            // shadowRadius: 9.11,
            // elevation: 14,
            // borderBottomRightRadius: 0,
            // borderTopRightRadius: 0,
          }
        }
      />
    );
  };

  return (
    <View
      style={{
        width: wp(93.2),
        height: hp(14),
        marginStart: wp(4),
        marginRight: wp(3),
        borderRadius: wp(2),
        marginTop: wp(3),
        marginBottom: wp(2),
        shadowColor: '#053f3b',
        elevation: 18,
        overflow: 'hidden', // This will clip the shadow if necessary
      }}>
      {/* <Carousel
        data={Data}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={wp(100)}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment={'center'}
        activeAnimationType={'spring'}
        layout="defualt"
        layoutCardOffset={`9`}
        showsVerticalScrollIndicator
        autoplay={true} 
        loop={true} 
        autoplayDelay={1000}       
        
      /> */}
      <View style={styles.backgroundView}>
        <SliderBox
          images={Images}
          dotColor="#000"
          inactiveDotColor="#888"
          // dotStyle={{width: 8, height:8,}}
          autoplay={true}
          autoplayInterval={5000}
          circleLoop={true}
          style={styles.imageStyle}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 15,
            padding: 0,
            margin: 0,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    // backgroundColor: '#55d57724', // Light green background
    flex: 1, // Take up all available space
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  imageStyle: {
    borderRadius: 10,
    height: '100%',
    width: wp(93),
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});

export default SliderCard;
