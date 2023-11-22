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
import LinearGradient from 'react-native-linear-gradient';

const BankScreen = props => {
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
          Payment Settings
        </Text>
      </View>

      <ScrollView>
        <View>
          <View style={styles.cardItemsWrapper}>
            <View style={{marginHorizontal: wp(3), marginVertical: wp(3)}}>
              <Text style={styles.headingMain}>
                Default Bank account to recieve or send money
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardInner}>
                <TouchableWithoutFeedback
                  onPress={() => handleOptionSelect('Option 1')}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderWidth: 1,
                        borderColor: '#14b7af',
                        borderRadius: 12,
                        marginRight: 8,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {selectedOption === 'Option 1' && (
                        <View
                          style={{
                            height: 12,
                            width: 12,
                            backgroundColor: '#14b7af',
                            borderRadius: 6,
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.headingLabel}>
                      <View>
                        <Text style={styles.headingBank}>
                          Kotak Mahindra Bank
                        </Text>
                        <Text style={styles.detailsTxt}>
                          Saving A/c No. -8781
                        </Text>
                        <Text style={styles.detailsTxt}>
                          A/c Holder Name: Aman Kumar Pandey
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <View>
                  <Image
                    source={require('../../assets/kotak-bank.png')}
                    style={{
                      width: wp(9),
                      backgroundColor: '#ccc',
                      height: wp(9),
                      borderRadius: wp(50),
                      margin: wp(1),
                      borderColor: '#eee',
                      borderWidth: 0.5,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.deleteBtnText}>Remove Account</Text>
                </View>

                <View>
                  <Text style={styles.balanceBtnText}>Check Balance</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardInner}>
                <TouchableWithoutFeedback
                  onPress={() => handleOptionSelect('Option 2')}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderWidth: 1,
                        borderColor: '#14b7af',
                        borderRadius: 12,
                        marginRight: 8,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {selectedOption === 'Option 2' && (
                        <View
                          style={{
                            height: 12,
                            width: 12,
                            backgroundColor: '#14b7af',

                            borderRadius: 6,
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.headingLabel}>
                      <View>
                        <Text style={styles.headingBank}>Paytm Bank</Text>
                        <Text style={styles.detailsTxt}>
                          Saving A/c No. -2681
                        </Text>
                        <Text style={styles.detailsTxt}>
                          A/c Holder Name: Aman Kumar Pandey
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <View>
                  <Image
                    source={require('../../assets/paytm-logo.png')}
                    style={{
                      width: wp(9),
                      backgroundColor: '#ccc',
                      height: wp(9),
                      borderRadius: wp(50),
                      margin: wp(1),
                      borderColor: '#eee',
                      borderWidth: 0.5,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.deleteBtnText}>Remove Account</Text>
                </View>

                <View>
                  <Text style={styles.balanceBtnText}>Check Balance</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardInner}>
                <TouchableWithoutFeedback
                  onPress={() => handleOptionSelect('Option 3')}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderWidth: 1,
                        borderColor: '#14b7af',
                        borderRadius: 12,
                        marginRight: 8,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {selectedOption === 'Option 3' && (
                        <View
                          style={{
                            height: 12,
                            width: 12,
                            backgroundColor: '#14b7af',

                            borderRadius: 6,
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.headingLabel}>
                      <View>
                        <Text style={styles.headingBank}>Induslnd Bank</Text>
                        <Text style={styles.detailsTxt}>
                          Saving A/c No. -8552
                        </Text>
                        <Text style={styles.detailsTxt}>
                          A/c Holder Name: Aman Kumar Pandey
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <View>
                  <Image
                    source={require('../../assets/indus-bank.png')}
                    style={{
                      width: wp(9),
                      backgroundColor: '#ccc',
                      height: wp(9),
                      borderRadius: wp(50),
                      margin: wp(1),
                      borderColor: '#eee',
                      borderWidth: 0.5,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.deleteBtnText}>Remove Account</Text>
                </View>

                <View>
                  <Text style={styles.balanceBtnText}>Check Balance</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.lastFooter}>
       <TouchableOpacity onPress={()=> navigation.navigate('AddBank')}>
       <View style={styles.addBtn}>
          <AntDesign
            name="plus"
            size={16}
            color={'#fff'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.addBtnText}> New Bank Account</Text>
        </View>
       </TouchableOpacity>
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
    // backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },

  detailsTxt: {
    color: '#666',
    fontWeight: 'normal',
    fontSize: wp(3.5),
    // fontWeight: '500',
  },

  tabsInner: {
    backgroundColor: '#fff',
    marginBottom: wp(1),
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
  title: {
    fontSize: wp(5),
    fontWeight: '500',
  },
  titleBox: {
    marginLeft: wp(7),
  },
  leftIocnStyle: {
    // width: wp(15),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cardItemsWrapper: {
    marginHorizontal: wp(1),
    marginTop: wp(4),
  },

  headingMain: {
    color: '#000',
    fontSize: wp(4.5),
    // fontWeight: '500',
  },

  card: {
    borderRadius: 4,
    paddingVertical: wp(3),
    marginHorizontal: wp(3),
    // backgroundColor: '#fff',
    borderWidth: 0.4,
    borderColor: '#d6c7ef',
    marginVertical: wp(3),
  },

  cardInner: {
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headingLabel: {
    marginBottom: wp(1),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  headingBank: {
    color: '#000',
    fontSize: wp(4.5),
    fontWeight: '500',
    lineHeight: wp(7),
  },

  cardFooter: {
    borderTopWidth: 0.4,
    borderTopColor: '#d6c7ef',
    paddingTop: wp(2),
    paddingHorizontal:wp(2),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  deleteBtnText: {
    color: '#f5685e',
    fontSize: wp(3.5),
    // fontWeight:'600'
  },

  pinBtnText: {
    color: '#888',
    fontSize: wp(3.5),
    // fontWeight:'600'
  },

  balanceBtnText: {
    color: '#14b7af',
    fontSize: wp(3.5),
    // fontWeight:'600'
  },

  lastFooter: {
    backgroundColor: '#000',
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
    marginHorizontal: wp(4),
    marginBottom: wp(10),
    alignItems: 'center',
    borderWidth: 0.187,
    borderColor: '#666',
    borderRadius: 4,
    alignItems: 'center',
  },

  addBtn: {
    // paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    // borderWidth: 0.5,
    // borderColor: '#000',
    // backgroundColor: '#000',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: wp(5),
    flexDirection: 'row',
    // width: '100%',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(4),
  },
});

export default BankScreen;
