import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import {Carousel} from 'react-native-auto-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const DEVICE_WIDTH = Dimensions.get('window').width;

const SliderCardMore = props => {
  let Data = [
    {
      image: require('../assets/SENDMONEYTOBANK.png'),
    },
    {
      image: require('../assets/SENDMONEYTOBANK.png'),
    },
    {
      image: require('../assets/SENDMONEYTOBANK.png'),
    },
    {
      image: require('../assets/SENDMONEYTOBANK.png'),
    },
    {
      image: require('../assets/SENDMONEYTOBANK.png'),
    },
  ];

  let DataImg = [
    {
      image: require('../assets/Udaipur.jpg'),
    },
    {
      image: require('../assets/Udaipur.jpg'),
    },
    {
      image: require('../assets/Udaipur.jpg'),
    },
    {
      image: require('../assets/Udaipur.jpg'),
    },
    {
      image: require('../assets/Udaipur.jpg'),
    },
  ];
  return (
    <>
      {props.carousel == true ? (
        <View
          style={{
            // backgroundColor: 'red',
            width: '75%',
            height: hp(13),
            borderRadius: 15,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            overflow: 'hidden',
          }}>
          <Carousel
            data={Data}
            dotStyle={{display: 'none'}}
            renderItem={(item, index) => (
              <Image
                source={item.image}
                key={index}
                resizeMode="cover"
                style={{
                  borderRadius: 15,
                  marginHorizontal: 5,
                  height: hp(20),
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                }}
              />
            )}
          />
        </View>
      ) : (
        <View
          style={{
            width: wp(100),
            height: hp(50),
            overflow: 'hidden',
          }}>
          <Carousel
            data={DataImg}
            autoPlay={false}
            dotStyle={{display: 'none'}}
            renderItem={(item, index) => (
              <Image
                source={item.image}
                key={index}
                resizeMode="cover"
                style={{
                  marginRight: 5,
                  height: hp(30),
                }}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

export default SliderCardMore;
