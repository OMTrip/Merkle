import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {height, width} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {wrap} from 'lodash';
import LottieView from 'lottie-react-native';

let Data = [
  {
    // image: require('../assets/new-product-launch.png'),
    animation: require('../assets/json/cryptocurrency-wallet.json'),
    title: 'Embark on a new journey',
    subtitle: `Discover the full potential of Web3 with Merkle Wallet's enhanced features and services. Faster Trading, Better Assets. Your Web3 Trading Wallet of the Future.`,
  },
  {
    // image: require('../assets/bitcoin-trade.png'),
    animation: require('../assets/json/cryptocurrency-trading-desk.json'),
    title: 'Explore Safely, Trade Securely',
    subtitle: `Merkle Wallet offers enchanced security with a $300 million user pritection fund, alerts for rusky contracts and tokens, and support for personalized asset management with hardware wallets and MPC wallets.`,
  },
  {
    // image: require('../assets/web-30.png'),
    animation: require('../assets/json/online-banking.json'),
    title: 'Your ultimate gateway into Web3',
    subtitle: `90+ mainnets, 20, 000+ DApps and 250,000+ NFT collections.\nThe most vibrant muilti-chain ecosystem\nAccess the most trending DeFi applications with ease`,
  },
];

const Instruction = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [onlinePayouts, setOnlinePayouts] = useState(false);
  const ref = useRef();
  const [disablePrev, setDisablePrev] = useState(true);

  const ChangeContent = c => {
    // console.log(props.navigation,'c')
    const ind = c + 1;
    setCurrentIndex(ind);
    if (ind > 2) {
      props.navigation.navigate('CreateNewWallet', {add: false});
    } else {
      ref.current.scrollToIndex({
        animated: true,
        index: ind,
      });

      if (ind == 1) {
        setShowContent(true);
      }
      if (ind == 2) {
        setOnlinePayouts(true);
      }
      // Disable previous button if on first slide
      setDisablePrev(ind === 0);
    }
  };

  const Item = useMemo(
    () =>
      ({item, index}) => {
        return (
          <Animated.View>
            <View style={{height: height / 2, width: width}}>
              <LottieView source={item.animation} autoPlay loop />
            </View>

            <View
              style={{
                paddingTop: wp(10),
                justifyContent: 'center',
              }}>
              <Text style={Styles.heading}>{item.title}</Text>
              <View
                style={{
                  width: width / 1.05,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    color: '#666',
                    paddingHorizontal: wp(4),
                    lineHeight: wp(6),
                  }}>
                  {item.subtitle}
                </Text>
              </View>
            </View>
          </Animated.View>
        );
      },
    [],
  );

  return (
    <LinearGradient
      colors={[
        '#d6fffd',
        '#f2fffe',
        '#ffff',
        '#fff',
        '#fffaff',
        '#fef8ff',
        '#faf4ff',
        '#fcf5fe',
        '#f5eefe',
        '#f1e9fe',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={[Styles.boxStyle, {flex: 1}]}>
        {/* <View style={Styles.Logocont}>
        <Image
          source={require('../assets/app_logo.png')}
          style={Styles.ImageStyle}
          resizeMode="contain"
        />
        <Icon name="question-circle" size={30} color="black" />
      </View> */}
        <View style={{flex: 0.9}}>
          <Animated.FlatList
            ref={ref}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={Data}
            renderItem={item => <Item {...item} />}
          />
        </View>
        <View
          style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            style={[
              Styles.buttons,
              disablePrev && Styles.disabledButton, // Apply disabledButton style if disablePrev is true
            ]}
            onPress={() => {
              if (currentIndex > 0) {
                ref.current.scrollToIndex({
                  animated: true,
                  index: currentIndex - 1,
                });
                setCurrentIndex(currentIndex - 1);
                setShowContent(currentIndex - 1 === 1); // If going back to the second screen
                setOnlinePayouts(currentIndex - 1 === 2); // If going back to the third screen
              }
            }}
            disabled={disablePrev}>
            <Icon name="chevron-left" size={height / 42} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Styles.buttons, {marginStart: wp(2)}]}
            onPress={() => ChangeContent(currentIndex)}>
            <Icon name="chevron-right" size={height / 42} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  Logocont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  buttons: {
    height: height / 15,
    width: height / 15,
    borderRadius: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#000',
  },
  disabledButton: {
    height: height / 15,
    width: height / 15,
    borderRadius: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#ccc',
  },

  BoxImage: {
    // width: wp(100),
    // height: wp(70),
  },

  ImageStyle: {
    height: height / 10,
    width: height / 6.5,
  },

  heading: {
    fontSize: wp(5.5),
    fontWeight: '500',
    color: '#000',
    marginBottom: wp(3),
    paddingHorizontal: wp(6),
  },

  billPayments: {
    fontSize: wp(5.5),
    fontWeight: '500',
    color: '#000',
  },
});
export default Instruction;
