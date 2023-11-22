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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ceil} from 'lodash';

const StakingScreen = () => {
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
            name="info-outline"
            size={18}
            color={'#444'}
            onPress={() => navigation.goBack()}
          />
          {/* <Text
          onPress={() => navigation.goBack()}
          style={{
            color: '#444',
            fontSize: hp(2),
          }}>
          Cancel
        </Text> */}
        </View>
        <Text
          style={{
            color: '#000',
            fontSize: hp(2),
            fontWeight: '600',
          }}>
          Staking
        </Text>
        <Text
          style={{
            color: '#444',
            fontSize: hp(2),
          }}>
          Done
        </Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.transactionCards}>
          <View style={styles.transactionCardsInner}>
            <Text style={styles.headText}>Available </Text>
            <Text style={styles.fromText}>0 EVMOS</Text>
          </View>
          <View style={styles.border}></View>
          <View style={styles.transactionCardsInner}>
            <Text style={styles.headText}>Staked </Text>
            <Text style={styles.fromText}> 0 EVMOS</Text>
          </View>
        </View>
        <View style={styles.transactionCards}>
          <View style={styles.transactionCardsInner}>
            <Text style={styles.headText}>APR </Text>
            <Text style={styles.fromText}>35.42%</Text>
          </View>
          <View style={styles.border}></View>
          <View style={styles.transactionCardsInner}>
            <Text style={styles.headText}>Lock Time </Text>
            <Text style={styles.fromText}>14 Days</Text>
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.transactionCards}>
          <View style={styles.transactionCardsInner}>
            <Link to="/StakeCoin">
              <Text style={styles.headText}>Staking</Text>
            </Link>
            <Link to="/StakeCoin">
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                color={'#999'}
              />
            </Link>
          </View>
        </View>
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
  header: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    // paddingVertical: 10,
    marginVertical: hp(2),
    width: '100%',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: '#444',
    fontSize: 13,
    paddingHorizontal: wp(4),
    // marginVertical: 0,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    marginVertical: wp(3),
  },

  transactionCards: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    backgroundColor: '#fff',
    // marginHorizontal: hp(2),
    marginVertical: hp(1),
    color: '#444',
    borderRadius: 6,
  },

  transactionCardsInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headText: {
    color: '#444',
    fontSize: hp(1.8),
    fontWeight: '600',
  },

  fromText: {
    color: '#888',
    fontSize: hp(1.5),
  },
  tokenName: {
    color: '#000',
    fontSize: hp(1.8),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  subtoken: {
    color: '#888',
    fontSize: hp(1.2),
  },
  labels: {
    color: '#999',
    fontSize: hp(1.5),
  },

  arrowBg: {
    backgroundColor: '#fff',
    height: wp(10),
    width: wp(10),
    borderRadius: wp(50),
    borderWidth: 1,
    borderColor: '#eee',
    textAlign: 'center',
    lineHeight: wp(10),
    position: 'absolute',
    top: -wp(8),
    right: wp(4),
  },

  exchnageICon: {
    color: '#10CF7F',
    fontSize: wp(8),
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
    opacity: 1,
  },
});

export default StakingScreen;
