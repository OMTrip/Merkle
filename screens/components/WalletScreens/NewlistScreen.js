import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewlistAccordionContent from './NewlistAccordionContent';

import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const NewlistScreen = props => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 1 ? prev + 0.01 : 1));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const [expandAll, setExpandAll] = useState(false);
  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  const [expandAllLearn, setExpandAllLearn] = useState(false);
  const toggleExpandAllLearn = () => {
    setExpandAllLearn(!expandAllLearn);
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
      style={{flex: 1, paddingBottom: wp(3)}}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={25}
          color={'#000'}
          onPress={() => navigation.goBack()}
        />

        <View style={{width:wp(60)}}>
        <Text
          style={{
            color: '#000',
            fontSize: wp(5),
            fontWeight: '600',
            
            // paddingLeft: 15,
          }}>
          My Tokens
        </Text>

        </View>
      
      </View>



      <ScrollView>
        <View>
          <View style={styles.cardItemsWrapper}>
            <View style={styles.card}>
              <View style={{marginHorizontal: wp(4), marginBottom: wp(4)}}>
                <Text style={styles.headingMain}>Your Created Tokens List</Text>
              </View>
              <View>
                <NewlistAccordionContent
                  title="Project- rally"
                  content={
                    <>
                      <View style={styles.displayFlex}>
                        <Text style={styles.accordionTitle}>Name</Text>
                        <Text style={styles.accordionContent}>rally</Text>
                      </View>
                      <View style={styles.displayFlex}>
                        <Text style={styles.accordionTitle}>Supply</Text>
                        <Text style={styles.accordionContent}>
                          1000000000000
                        </Text>
                      </View>
                      <View style={styles.displayFlex}>
                        <Text style={styles.accordionTitle}>Type</Text>
                        <Text style={styles.accordionContent}>customtoken</Text>
                      </View>
                      <View style={styles.displayFlex}>
                        <Text style={styles.accordionTitle}>Created at</Text>
                        <Text style={styles.accordionContent}>30-05-2023</Text>
                      </View>

                      <View style={styles.divider}></View>
                      <View style={styles.displayFlex}>
                        <Text style={styles.accordionTitle}>Symbol</Text>
                        <Text style={styles.accordionContent}>Rally</Text>
                      </View>
                      <View style={styles.displayFlex}>
                        <Text style={styles.accordionTitle}>Precision</Text>
                        <Text style={styles.accordionContent}>18</Text>
                      </View>
                      <View style={styles.displayFlex}>
                        <Text style={styles.accordionTitle}>Contract</Text>
                       <View style={{flexDirection:'row', alignItems:'center'}}>
                       <Text
                          style={
                          
                            {textDecorationLine: 'underline', marginEnd:wp(1), color:'#14b7af', fontSize:wp(3.2)}
                          }>
                          0x0665a...1690fD3
                        </Text>
                        <MaterialIcons
                          style={{color: '#14b7af'}}
                          name="content-copy"
                          size={13}
                        />

                       </View>                       
                      </View>

                      <View style={styles.send}>                     
                        <Text style={{color: '#fff'}}>Add to wallet</Text>
                      </View>
                    </>
                  }
                />   
                <NewlistAccordionContent
                  title="How to increase Credit Score?"
                  content={
                    <>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Name</Text>
                      <Text style={styles.accordionContent}>rally</Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Supply</Text>
                      <Text style={styles.accordionContent}>
                        1000000000000
                      </Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Type</Text>
                      <Text style={styles.accordionContent}>customtoken</Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Created at</Text>
                      <Text style={styles.accordionContent}>30-05-2023</Text>
                    </View>

                    <View style={styles.divider}></View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Symbol</Text>
                      <Text style={styles.accordionContent}>Rally</Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Precision</Text>
                      <Text style={styles.accordionContent}>18</Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Contract</Text>
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                     <Text
                        style={
                        
                          {textDecorationLine: 'underline', marginEnd:wp(1), color:'#14b7af', fontSize:wp(3.2)}
                        }>
                        0x0665a...1690fD3
                      </Text>
                      <MaterialIcons
                        style={{color: '#14b7af'}}
                        name="content-copy"
                        size={13}
                      />

                     </View>                       
                    </View>

                    <View style={styles.send}>                     
                      <Text style={{color: '#fff'}}>Add to wallet</Text>
                    </View>
                  </>
                  }
                />
                <NewlistAccordionContent
                  title="Factors affecting Credit Score?"
                  content={
                    <>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Name</Text>
                      <Text style={styles.accordionContent}>rally</Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Supply</Text>
                      <Text style={styles.accordionContent}>
                        1000000000000
                      </Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Type</Text>
                      <Text style={styles.accordionContent}>customtoken</Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Created at</Text>
                      <Text style={styles.accordionContent}>30-05-2023</Text>
                    </View>

                    <View style={styles.divider}></View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Symbol</Text>
                      <Text style={styles.accordionContent}>Rally</Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Precision</Text>
                      <Text style={styles.accordionContent}>18</Text>
                    </View>
                    <View style={styles.displayFlex}>
                      <Text style={styles.accordionTitle}>Contract</Text>
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                     <Text
                        style={
                        
                          {textDecorationLine: 'underline', marginEnd:wp(1), color:'#14b7af', fontSize:wp(3.2)}
                        }>
                        0x0665a...1690fD3
                      </Text>
                      <MaterialIcons
                        style={{color: '#14b7af'}}
                        name="content-copy"
                        size={13}
                      />

                     </View>                       
                    </View>

                    <View style={styles.send}>                     
                      <Text style={{color: '#fff'}}>Add to wallet</Text>
                    </View>
                  </>
                  }
                />
                {expandAll && (
                  <>
                    <NewlistAccordionContent
                      title="Factors affecting Credit Score?"
                      content={
                        <>
                          <Text style={styles.accordionTitle}>
                            {' '}
                            Factors affecting Credit Score?
                          </Text>
                          <Text style={styles.accordionContent}>
                            Your CIBIL score depends on factors such as your
                            previous credit behaviour, loan repayment history,
                            debt-to-income ratio, the nature of your existing
                            loans (secured or unsecured), and credit cards you
                            have used in the past, among others.
                          </Text>
                          <Text style={styles.accordionContent}>
                            credit scores to evaluate your credit worthiness, or
                            the likelihood that you will repay loans in a timely
                            manner. There are three major credit bureaus in the
                            U.S.: Equifax, Experian, and TransUnion. This trio
                            dominates the market for collecting, analyzing, and
                            disbursing information about consumers in the credit
                            markets.
                          </Text>
                          <Text style={styles.accordionTitle}>
                            Payment History: 35%
                          </Text>
                          <Text style={styles.accordionContent}>
                            A credit score can significantly affect your
                            financial life. It plays a key role in a lender’s
                            decision to offer you credit.
                          </Text>

                          <Text style={styles.accordionTitle}>
                            2. Amounts Owed: 30%
                          </Text>
                          <Text style={styles.accordionContent}>
                            The total amount you've borrowed affects your credit
                            score, as does the portion of your available credit
                            tied up in outstanding balances. Your credit
                            utilization ratio, or rate—the percentage of your
                            total borrowing limit you're using on your credit
                            cards and other revolving-credit accounts—is a
                            significant factor in determining credit scores
                          </Text>
                        </>
                      }
                    />

                    <NewlistAccordionContent
                      title="What is the important of a good credit score"
                      content={
                        <Text style={styles.accordionContent}>
                          Content for Section 1
                        </Text>
                      }
                    />
                    <NewlistAccordionContent
                      title="Increase your credit score -9 best practices to follow"
                      content={
                        <Text style={styles.accordionContent}>
                          Content for Section 2
                        </Text>
                      }
                    />
                    <NewlistAccordionContent
                      title="Factors affecting Credit Score?"
                      content={
                        <Text style={styles.accordionContent}>
                          Content for Section 3
                        </Text>
                      }
                    />
                  </>
                )}
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: wp(3),
                  alignItems: 'center',
                }}>
                <TouchableWithoutFeedback onPress={toggleExpandAll}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {expandAll ? 'See Less' : 'View More'}{' '}
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={20}
                      color={'#444'}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
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
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },

  accordionContent: {
    color: '#888',
    fontWeight: 'normal',
    fontSize: wp(3.2),
    marginBottom: wp(2),
  },

  button: {
    padding: wp(1.5),
    borderWidth: 1,
    borderColor: '#d6c7ef',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: wp(5),
    width: wp(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#444',
  },

  accordionTitle: {
    fontSize: wp(3.2),
    fontWeight: '500',
    color: '#000',
  },
  //   titleBox: {
  //     marginLeft: wp(7),
  //   },
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
    color: '#444',
    fontSize: wp(4.6),
    fontWeight: '600',
  },

  card: {
    // paddingVertical: wp(3),
    // marginHorizontal: wp(3),
    // backgroundColor: '#fff',
    // borderWidth: 0.5,
    // borderColor: '#d6c7ef',
    marginVertical: wp(3),
    // paddingStart: wp(2),
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
    fontSize: wp(4.6),
    fontWeight: '600',
    lineHeight: wp(7),
  },

  cardFooter: {
    borderTopWidth: 0.5,
    borderTopColor: '#d6c7ef',
    paddingTop: wp(2),
    paddingHorizontal: wp(2),
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
    color: '#888',
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
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    borderBottomWidth: 0.187,
    borderBottomColor: '#ccc',
    marginVertical: wp(2),
  },
  send: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    borderRadius: 6,
    // width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
    flexDirection: 'row',
    marginTop: wp(5),
  },
});

export default NewlistScreen;
