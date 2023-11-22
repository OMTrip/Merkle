import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../HomeScreen/HomeHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {transactionCollection} from '../../../Store/firebase/user';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {parseCustomDate} from '../../../Utils/web3/helperFunction';
import {wrap} from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const TransactionCard = ({item}) => {
  const navigation = useNavigation();  
  return (
    <View style={styles.card}>
      <View style={styles.sectionTwo}>
        <View style={styles.infoArea}>
          <View>
            <Image
              style={{
                width: 35,
                height: 35,
                alignSelf: 'flex-start',
                marginEnd: wp(3),
                borderColor: '#eee',
                borderWidth: 1,
                borderRadius: 50,
              }}
              source={require('../../assets/paytm-logo.png')}
            />
          </View>

          <View style={styles.InfoText}>
            <Text style={styles.text}>
              {item.message === 'SUCCESS'
                ? `Bill Payment for ${item.provider}`
                : `Transaction for ${item.bene_name}`}
            </Text>
            <Text style={styles.accNum}>
              {item.message === 'SUCCESS' ? item.number : item.account_no}
            </Text>
            <Text style={styles.successMsg}>
              <Icon name="rupee" size={12} color="#54C894" />{' '}
              {`${item.amount}, Your order is ${
                item.message === 'SUCCESS'
                  ? 'successful'
                  : 'submitted successfully'
              }`}
            </Text>
            <Text style={styles.dateText}>{ item.date} </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={styles.btnText}>Repeat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const PaymentHistory = () => {
  const {user} = useSelector(state => state);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  async function fetchHistory() {
    true;
    setReload(true);
    const res = await transactionCollection.getTransaction(
      user?.user?.phoneNumber,
    );
    const sortedData = [...res]?.sort((a, b) => {
      return parseCustomDate(b.date) - parseCustomDate(a.date);
    });
    setData(sortedData);
    setReload(false);
  }

  useEffect(() => {
    if (data.length == 0) {
      fetchHistory();
    }
  }, [user]);
  return (
    <>
      <View style={styles.box}>
        <View
          style={{
            paddingVertical: wp(3),
            justifyContent: 'center',
            paddingHorizontal: hp(2),
            backgroundColor: '#000',
          }}>
          <HomeHeader
            icons={true}
            iconName={'keyboard-backspace'}
            size={wp(8)}
            title={'My Orders'}
            TextTitle={true}
            menu={false}
          />
        </View>
        <View style={styles.innerContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cardItemsWrapper}>
              <TouchableOpacity>
                <View style={styles.Infobox}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={styles.iconBgSquare}>
                      <AntDesign name="mobile1" size={20} color={'#000'} />
                    </View>
                    <View style={styles.menuWrapper}>
                      <View>
                        <Text style={styles.menuName}>
                          Recharge & Bill Payments
                        </Text>
                      </View>

                      <View>
                        <MaterialIcons
                          name="keyboard-arrow-right"
                          size={20}
                          style={styles.infoIcon}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.Infobox}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={styles.iconBgSquare}>
                      <MaterialIcons
                        name="card-giftcard"
                        size={20}
                        color={'#000'}
                      />
                    </View>
                    <View style={styles.menuWrapper}>
                      <View>
                        <Text style={styles.menuName}>Gift Cards & Deals</Text>
                      </View>

                      <View>
                        <MaterialIcons
                          name="keyboard-arrow-right"
                          size={20}
                          style={styles.infoIcon}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.Infobox}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={styles.iconBgSquare}>
                      <MaterialIcons
                        name="wallet-travel"
                        size={20}
                        color={'#000'}
                      />
                    </View>
                    <View style={styles.menuWrapper}>
                      <View>
                        <Text style={styles.menuName}>Travel</Text>
                      </View>

                      <View>
                        <MaterialIcons
                          name="keyboard-arrow-right"
                          size={20}
                          style={styles.infoIcon}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.Infobox}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={styles.iconBgSquare}>
                      <MaterialCommunityIcons
                        name="movie-open-outline"
                        size={20}
                        color={'#000'}
                      />
                    </View>
                    <View style={styles.menuWrapper}>
                      <View>
                        <Text style={styles.menuName}>Movies & Events</Text>
                      </View>

                      <View>
                        <MaterialIcons
                          name="keyboard-arrow-right"
                          size={20}
                          style={styles.infoIcon}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginVertical: wp(4),
                marginHorizontal: wp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{fontWeight: '500', color: '#000', fontSize: wp(4.5)}}>
                  Recent Orders
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{paddingHorizontal: wp(5)}}>
                  <FontAwesome5 name="sliders-h" size={16} color={'#000'} />
                </View>
                <View>
                  <MaterialIcons name="search" size={20} color={'#000'} />
                </View>
              </View>
            </View>
            <FlatList
              scrollEnabled={false}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <TransactionCard item={item} />}
              refreshing={reload}
              onRefresh={() => {
                setReload(true);
                fetchHistory();
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      width: '100%',
                      height: wp(20),
                      flex: 1,
                      // alignItems: 'center',
                      paddingVertical: 10,

                      borderRadius: 10,
                      borderColor: '#eee',
                      borderWidth: 0.5,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        // marginTop: 20,
                        fontSize: wp(4),
                        color: '#666',
                      }}>
                      No Transactions Found.
                    </Text>
                  </View>
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  innerContainer: {
    marginHorizontal: wp(4),
  },

  cardItemsWrapper: {
    marginTop: wp(1),
  },

  Infobox: {
    marginBottom: wp(1),
    // backgroundColor: '#eee',
    borderRadius: 10,
    width: '100%',
    paddingVertical: wp(3),
    flexDirection: 'row',
  },
  menuWrapper: {
    paddingStart: wp(3),
    // borderBottomWidth: 0.187,
    // borderBottomColor: '#eee',
    // flex: 1,
    // paddingVertical: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#fff',
    width: '90%',
  },

  iconBgSquare: {
    backgroundColor: '#fff',
    height: wp(9),
    width: wp(9),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#eee',
    // marginHorizontal: wp(5),
    marginVertical: wp(1),
  },
  infoIcon: {
    color: '#555',
    // paddingEnd: wp(3),
  },

  headingLabel: {
    marginBottom: wp(2),
    paddingStart: wp(4),
    width: '98%',
    alignItems: 'flex-start',
  },
  menuName: {
    color: '#000',
    fontSize: wp(4),
    fontWeight: 'normal',
  },

  card: {
    flexDirection: 'row',
    width: '100%',
    // alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 0.5,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    marginBottom: wp(2),
  },
  sectionOne: {
    // width: '15%',
    // alignItems: 'flex-start',
    margin: wp(1),
  },
  sectionTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(3),
  },

  infoArea: {
    flexDirection: 'row',
    width: wp(70),
    // backgroundColor:'#ccc'
  },

  InfoText: {
    flex: 1,
  },

  text: {
    fontSize: wp(4),
    lineHeight: wp(6),
    fontWeight: '400',
    textTransform: 'capitalize',
    color: '#000',
    flexWrap: 'wrap',
  },

  accNum: {
    fontSize: wp(3.8),
    color: '#222',
  },

  successMsg: {
    fontSize: wp(3.5),
    lineHeight: 15,
    fontWeight: '500',
    color: '#3db082',
    textTransform: 'none',
    marginVertical: wp(3),
  },

  dateText: {
    fontSize: wp(3.1),
    color: '#999',
  },

  btn: {
    borderColor: '#444',
    borderRadius: 5,
    borderWidth: 0.8,
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    marginEnd: wp(2),
  },
  btnText: {
    color: '#000',
    fontSize: wp(3),
    // fontWeight: 'bold',
  },
});
