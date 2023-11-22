import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const width = Dimensions.get('window').width;

const BottomSliderCard = () => {
  let Data = [
    {
        image: require('../../assets/banner-bottom1.jpg'),
      },
    {
      image: require('../../assets/banner-bottom2.jpg'),
    },
   
  
    {
      image: require('../../assets/banner-bottom3.jpg'),
    },
  ];

  const _renderItem = ({item, index}) => {
    return (
      <Image
        source={item.image}
        key={index}
        resizeMode="contain"
        style={{         
          height: hp(17),
          width: wp(100),
        }}
      />
    );
  };

  return (
    <View
      style={{
       width: wp(100),
        height: hp(18),
      }}>
      <Carousel
        data={Data}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={wp(100)}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment={'end'}
        activeAnimationType={'spring'}
        layout="default"
        showsVerticalScrollIndicator
        loop
        autoPlay
        // autoplayDelay={3000}
      />
    </View>
  );
};

export default BottomSliderCard;
