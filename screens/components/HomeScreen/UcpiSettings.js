import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {blue} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {wrap} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

const AddBank = props => {
  const navigation = useNavigation();
  const [activetabs, setActiveTabs] = useState(1);

  const handleTabClick = tabNumber => {
    setActiveTabs(tabNumber);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

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
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={25}
          color={'#000'}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: '#000',
            fontSize: wp(5),
            fontWeight: '600',
            paddingLeft: 15,
          }}>
          UCPI Settings
        </Text>
      </View>

      <ScrollView
        style={{
          flexGrow: 1,
        }}>
        <View>
          <View style={{marginHorizontal: wp(4), marginVertical: wp(4)}}>
            <Text style={styles.title}>Add favourites Currency</Text>
            <Text style={styles.subTxt}>Add your currencies here for payment. You can add maximum 10 currencies in the list</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.imageBg}>
              <AntDesign
                name="plus"
                size={28}
                color={'#333'}
                onPress={() => navigation.goBack()}
              />
            </View>

            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/coins/bitcoin.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/coins/chainlink.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/coins/tron.png')}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/coins/tether.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/coins/usdc.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/coins/seedx.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/coins/doge.png')}
                style={styles.logo}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.lastFooter}>
        <View style={styles.addBtn}>
          <AntDesign
            name="plus"
            size={16}
            color={'#fff'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.addBtnText}> New Bank Account</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },

  Input: {
    color: '#444',
    height: hp(5),
    borderWidth: 0.5,
    borderColor: '#444',
    paddingHorizontal: 10,
    fontSize: 13,
    borderRadius: wp(1),
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    color: '#000',
  },

  subTxt: {
    color: '#444',
    fontSize: wp(4),
    lineHeight: 22,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  imageBg: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(50),
    // margin: wp(1),
    borderColor: '#d6c7ef',
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '23%', // Adjust as needed
    aspectRatio: 1, // Maintain aspect ratio for square boxes
    borderWidth: 1,
    borderColor: '#d6c7ef',
    borderRadius: 50,
    overflow: 'hidden',
  },
  logo: {
    // flex: 1,
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius:50,
    // backgroundColor:'#eee'
  },

  title: {
    fontSize: wp(4.5),
    fontWeight: '500',
    color: '#000',
  },

  popularBankWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#eee',
    marginHorizontal: wp(4),
    marginTop: wp(3),
  },

  iconBg: {
    // backgroundColor: '#000',
    height: wp(12),
    width: wp(12),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#d6c7ef',
    marginEnd: wp(2),
    // marginVertical: wp(1),
  },
  otherBanklogo: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
  },

  bankwrapperInner: {
    // paddingStart: wp(1),
    borderBottomWidth: 0.187,
    borderBottomColor: '#d6c7ef',
    flex: 1,
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoIcon: {
    color: '#ccc',
  },

  bankName: {
    color: '#000',
    fontSize: wp(4.2),
  },

  cardItemsWrapper: {
    marginHorizontal: wp(1),
    marginTop: wp(4),
  },

  headingMain: {
    color: '#000',
    fontSize: wp(5.5),
    fontWeight: '600',
  },

  card: {
    marginBottom: wp(3),
  },

  cardInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  headingLabel: {
    marginBottom: wp(1),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  headingBank: {
    color: '#000',
    fontSize: wp(4.6),
    fontWeight: '600',
    lineHeight: wp(7),
  },
});

export default AddBank;
