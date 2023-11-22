import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ceil} from 'lodash';

const StakeCoin = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="arrow-back-ios"
            size={18}
            color={'#444'}
            onPress={() => navigation.goBack()}
          />
          <Text
            onPress={() => navigation.goBack()}
            style={{
              color: '#444',
              fontSize: hp(2),
            }}>
            Staking
          </Text>
        </View>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2),
            fontWeight: '600',
          }}>
          Stake TRX
        </Text>

        <MaterialIcons name="info-outline" size={18} color={'#444'} />
      </View>

      <View style={styles.pageWrapper}>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <Text style={styles.labels}>TRX Amount</Text>
            <View style={styles.box}>
              <TextInput
                placeholder="0"
                placeholderTextColor={'#bbb'}
                style={{
                  flex: 0.9,
                  color: '#000',
                  fontWeight: '600',
                  fontSize: wp(3.5),
                  height: 34,
                  width: '100%',
                }}
              />
              <View style={{marginTop:wp(-5)}}>
                <Text style={{color: '#10CF7F', fontSize: wp(3.2)}}>Max</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.labels}>VALIDATORS</Text>
          <View style={styles.validator}>
            <View style={styles.input}>
              <View style={styles.box}>
                <View style={styles.tokenInfo}>
                  <View>
                    <Image
                      source={require('../../assets/coins/tron.png')}
                      style={styles.imageCoin}
                    />
                  </View>
                  <View>
                    <Text style={styles.tokenName}>TRONScan</Text>

                    <View style={styles.displayHori}>
                      <Text style={styles.subtoken}>APR: </Text>
                      <Text style={styles.green}>3.42% - 5.06%</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Link to="/">
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={18}
                      color={'#999'}
                    />
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infowrapper}>
          <View style={styles.displayHori}>
            <Entypo name="dot-single" size={18} color={'#444'} />
            <Text style={styles.listItem}>
              Earning Starts one day after staking
            </Text>
          </View>
          <View style={styles.displayHori}>
            <Entypo name="dot-single" size={18} color={'#444'} />
            <Text style={styles.listItem}>
              Earning funds are accessible 14 days after unstaking
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.send}>
        <Link to="/StakebuyCoin">
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Next
          </Text>
        </Link>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
    paddingHorizontal: wp(5),
  },

  pageWrapper: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    backgroundColor: '#fff',
    marginVertical: hp(2),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
  },
  validator: {
    backgroundColor: '#fff',
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
    marginVertical: wp(1),
    paddingVertical: wp(2),
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: '#444',
    paddingHorizontal: wp(3),
  },

  transactionCards: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    backgroundColor: '#fff',
    marginVertical: hp(1),
    color: '#444',
    borderRadius: 6,
  },

  transactionCardsInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCoin: {
    width: 30,
    height: 30,
    borderRadius: wp(50),
    marginEnd: wp(1),
  },

  tokenName: {
    color: '#000',
    fontSize: hp(1.6),
  },
  subtoken: {
    color: '#888',
    fontSize: hp(1.4),
  },

  labels: {
    color: '#999',
    fontSize: hp(1.3),
    paddingTop: hp(0.5),
    marginBottom:0
  },

  displayHori: {
    flexDirection: 'row',
  },
  green: {
    color: '#25d366',
    fontSize: hp(1.4),
  },

  red: {
    color: 'red',
    fontSize: hp(1.4),
  },
  infowrapper: {
    backgroundColor: '#DFECF7',
    // color: '#E0F7E5',
    paddingHorizontal: wp(4),
    paddingVertical: wp(4),
    width: wp(90),
    borderRadius: wp(3),
    marginVertical: wp(8),
  },

  listItem: {
    color: '#003D87',
    fontSize: wp(3.2), // Adjust this for spacing between items
  },
  bullet: {
    fontSize: 13, // Adjust bullet size if needed
    marginRight: 5,
    color: '#003D87',
  },

  send: {
    alignSelf: 'center',
    padding: 15,
    // backgroundColor: '#10CF7F',
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
  },
  disabledBtn: {
    alignSelf: 'center',
    padding: 15,
    // backgroundColor: '#10CF7F',
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
    opacity: 0.6,
  },
});

export default StakeCoin;
