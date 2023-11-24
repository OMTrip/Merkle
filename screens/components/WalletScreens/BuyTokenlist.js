import {View, Image, StyleSheet, Text} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const BuyTokenlist = props => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[
        '#d6fffd',
        '#f2fffe',
        '#ffff',
        '#fff',
        // '#fffaff',
        // '#fef8ff',
        // '#faf4ff',
        '#fcf5fe',
        '#f5eefe',
        '#f1e9fe',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="arrow-back-ios"
            size={18}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2.2),
            fontWeight: '600',
          }}>
          Earn Crypto
        </Text>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2.2),
            // fontWeight: '600',
          }}>
          Done
        </Text>
      </View>

      <View style={styles.cryptoCard}>
        <ScrollView>
          <Link to="/StakingScreen">
            <View style={styles.tokenWrapper}>
              <View style={styles.tokenInfo}>
                <View>
                  <Image
                    source={require('../../assets/coins/ethereum.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View>
                  <Text style={styles.tokenName}>
                    Evmos Staking Coin (EVMOS){' '}
                  </Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>APR:</Text>
                    <Text style={styles.green}> +35.42%</Text>
                  </View>
                </View>
              </View>
            </View>
          </Link>

          <Link to="/StakingScreen">
            <View style={styles.tokenWrapper}>
              <View style={styles.tokenInfo}>
                <View>
                  <Image
                    source={require('../../assets/coins/tron.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View>
                  <Text style={styles.tokenName}>
                    Stargaze Staking Coin (STARS)
                  </Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>APR:</Text>
                    <Text style={styles.green}> +27.84%</Text>
                  </View>
                </View>
              </View>
            </View>
          </Link>
          <Link to="/StakingScreen">
            <View style={styles.tokenWrapper}>
              <View style={styles.tokenInfo}>
                <View>
                  <Image
                    source={require('../../assets/coins/doge.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View>
                  <Text style={styles.tokenName}>Cosmos Staking Coin (ATOM)</Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>APR:</Text>
                    <Text style={styles.green}> +14.42%</Text>
                  </View>
                </View>
              </View>
            </View>
          </Link>
          <Link to="/StakingScreen">
            <View style={styles.tokenWrapper}>
              <View style={styles.tokenInfo}>
                <View>
                  <Image
                    source={require('../../assets/coins/avalanche.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View>
                  <Text style={styles.tokenName}>KAVA Staking Xoin (KAVA)</Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>APR:</Text>
                    <Text style={styles.green}> +12.48%</Text>
                  </View>
                </View>
              </View>
            </View>
          </Link>
          <Link to="/StakingScreen">
            <View style={styles.tokenWrapper}>
              <View style={styles.tokenInfo}>
                <View>
                  <Image
                    source={require('../../assets/coins/polygon.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View>
                  <Text style={styles.tokenName}>Terra Staking Coin (LUNA)</Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>APR:</Text>
                    <Text style={styles.green}> +35.142%</Text>
                  </View>
                </View>
              </View>
            </View>
          </Link>
          <Link to="/StakingScreen">
            <View style={styles.tokenWrapper}>
              <View style={styles.tokenInfo}>
                <View>
                  <Image
                    source={require('../../assets/coins/tether.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View>
                  <Text style={styles.tokenName}>
                    Injective Staking Coin (INJ)
                  </Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>APR:</Text>
                    <Text style={styles.green}> +35.42%</Text>
                  </View>
                </View>
              </View>
            </View>
          </Link>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f7',
    alignItems: 'center',
  },

  cryptoCard: {
    // backgroundColor: '#fff',
    marginHorizontal: hp(2),
    marginVertical: hp(2),
    padding: wp(3),
    borderRadius: 6,
    width: '90%',
    flex: 1,
    marginHorizontal: wp(20),
  },

  header: {
    width: '100%',
    paddingVertical: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },

  tokenWrapper: {   
    paddingBottom: wp(4),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCoin: {
    width: 40,
    height: 40,
    borderRadius: wp(50),
    marginEnd: wp(1),
  },

  tokenName: {
    color: '#000',
    fontSize: hp(1.8),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  subtoken: {
    color: '#999',
    fontSize: hp(1.5),
  },

  displayHori: {
    flexDirection: 'row',
  },

  green: {
    color: '#14b7af',
    fontSize: hp(1.5),
  },
  red: {
    color: 'red',
    fontSize: hp(1.5),
  },
});

export default BuyTokenlist;
