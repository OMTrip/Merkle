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
import {blue} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import CircularProgress from './CircularProgress';
import Accordion from './Accordion';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const TrustScore = props => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 1 ? prev + 0.01 : 1));
    }, 50);

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
    style={{flex: 1, paddingBottom:wp(3)}}>
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
          Trust Score
        </Text>
      </View>

      <ScrollView>
        <View>
          <View style={styles.cardItemsWrapper}>
            <View
              style={{
                width: 150,
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
                // elevation: 5,
                // shadowColor: '#f50057',
                // shadowRadius: 1,
                // shadowOpacity: 1,
                // shadowOpacity: 0.1,
                borderRadius: 50,
                marginBottom: wp(4),
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <CircularProgress
                radius={70}
                strokeWidth={12}
                progress={progress}
                percentageText={`${Math.round(progress * 100)}%`}
                // progress={0.75} // Set progress to 80%
              //  percentageText="75%" // Optional: You can customize the displayed text
                innerImage={require('../../assets/mobileProvider/nute.png')}
              />
            </View>
            <TouchableOpacity onPress={() => setProgress(0)}>
              <Text
                style={{
                  color: '#666',
                  textAlign: 'center',                
                }}>
                Reset
              </Text>
            </TouchableOpacity>

            <View style={styles.card}>
              <View style={{marginHorizontal: wp(3), marginVertical: wp(3)}}>
                <Text style={styles.headingMain}>FAQs</Text>
              </View>
              <View style={styles.cardInnder}>
                <Accordion
                  title="What is Credit Score"
                  content={
                    <>
                      <Text style={styles.accordionTitle}>What Is a Credit Score?
                      </Text>
                      <Text style={styles.accordionContent}>
                        A credit score is a three-digit number that rates your
                        creditworthiness. FICO scores range from 300 to 850. The
                        higher the score, the more likely you are to get
                        approved for loans and for better rates. 1 A credit
                        score is based on your credit history, which includes
                        information like the number accounts, total levels of
                        debt, repayment history, and other factors.
                      </Text>
                      <Text style={styles.accordionContent}>
                        credit scores to evaluate your credit worthiness, or the
                        likelihood that you will repay loans in a timely manner.
                        There are three major credit bureaus in the U.S.:
                        Equifax, Experian, and TransUnion. This trio dominates
                        the market for collecting, analyzing, and disbursing
                        information about consumers in the credit markets.
                      </Text>
                      <Text style={styles.accordionTitle}>
                        How Credit Scores Work
                      </Text>
                      <Text style={styles.accordionContent}>
                        A credit score can significantly affect your financial
                        life. It plays a key role in a lender’s decision to
                        offer you credit. Lenders are more likely to approve you
                        for loans when you have a higher credit score, and are
                        more likely to decline your loan applications when you
                        have lower scores. You can also get better interest
                        rates when you have a higher credit score, which can
                        save you money in the long-term.
                      </Text>
                    </>
                  }
                />
                <Accordion
                  title="How to increase Credit Score?"
                  content={
                    <>
                      <Text style={styles.accordionTitle}>
                        {' '}
                        How to increase Credit Score?
                      </Text>
                      <Text style={styles.accordionContent}>
                        A credit score is a three-digit number that rates your
                        creditworthiness.
                      </Text>
                      <Text style={styles.accordionContent}>
                        credit scores to evaluate your credit worthiness, or the
                        likelihood that you will repay loans in a timely manner.
                        There are three major credit bureaus in the U.S.:
                        Equifax, Experian, and TransUnion. This trio dominates
                        the market for collecting, analyzing, and disbursing
                        information about consumers in the credit markets.
                      </Text>
                      <Text style={styles.accordionTitle}>
                        How Credit Scores Work
                      </Text>
                      <Text style={styles.accordionContent}>
                        A credit score can significantly affect your financial
                        life. It plays a key role in a lender’s decision to
                        offer you credit. Lenders are more likely to approve you
                        for loans when you have a higher credit score, and are
                        more likely to decline your loan applications when you
                        have lower scores. You can also get better interest
                        rates when you have a higher credit score, which can
                        save you money in the long-term.
                      </Text>
                    </>
                  }
                />
                <Accordion
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
                        debt-to-income ratio, the nature of your existing loans
                        (secured or unsecured), and credit cards you have used
                        in the past, among others.
                      </Text>
                      <Text style={styles.accordionContent}>
                        credit scores to evaluate your credit worthiness, or the
                        likelihood that you will repay loans in a timely manner.
                        There are three major credit bureaus in the U.S.:
                        Equifax, Experian, and TransUnion. This trio dominates
                        the market for collecting, analyzing, and disbursing
                        information about consumers in the credit markets.
                      </Text>
                      <Text style={styles.accordionTitle}>
                        Payment History: 35%
                      </Text>
                      <Text style={styles.accordionContent}>
                        A credit score can significantly affect your financial
                        life. It plays a key role in a lender’s decision to
                        offer you credit.
                      </Text>

                      <Text style={styles.accordionTitle}>
                        2. Amounts Owed: 30%
                      </Text>
                      <Text style={styles.accordionContent}>
                        The total amount you've borrowed affects your credit
                        score, as does the portion of your available credit tied
                        up in outstanding balances. Your credit utilization
                        ratio, or rate—the percentage of your total borrowing
                        limit you're using on your credit cards and other
                        revolving-credit accounts—is a significant factor in
                        determining credit scores
                      </Text>
                    </>
                  }
                />
                {expandAll && (
                  <>
                    <Accordion
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

                    <Accordion
                      title="What is the important of a good credit score"
                      content={
                        <Text style={styles.accordionContent}>
                          Content for Section 1
                        </Text>
                      }
                    />
                    <Accordion
                      title="Increase your credit score -9 best practices to follow"
                      content={
                        <Text style={styles.accordionContent}>
                          Content for Section 2
                        </Text>
                      }
                    />
                    <Accordion
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
              <View
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
              </View>
            </View>
            <View style={styles.card}>
              <View style={{marginHorizontal: wp(3), marginVertical: wp(3)}}>
                <Text style={styles.headingMain}>Learn More</Text>
              </View>
              <View style={styles.cardInnder}>
                <Accordion
                  title="What is the important of a good credit score"
                  content={
                    <Text style={styles.accordionContent}>
                      Content for Section 1
                    </Text>
                  }
                />
                <Accordion
                  title="Increase your credit score -9 best practices to follow"
                  content={
                    <Text style={styles.accordionContent}>
                      Content for Section 2
                    </Text>
                  }
                />
                <Accordion
                  title="Factors affecting Credit Score?"
                  content={
                    <Text style={styles.accordionContent}>
                      Content for Section 3
                    </Text>
                  }
                />

                {expandAllLearn && (
                  <>
                    <Accordion
                      title="Increase your credit score -9 best practices to follow"
                      content={
                        <Text style={styles.accordionContent}>
                          Content for Section 2
                        </Text>
                      }
                    />
                    <Accordion
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: wp(3),
                  alignItems: 'center',
                }}>
                <TouchableWithoutFeedback onPress={toggleExpandAllLearn}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {expandAllLearn ? 'See Less' : 'View More'}{' '}
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={20}
                      color={'#444'}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
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
    color: '#000',
    fontSize: wp(4.6),
    fontWeight: '600',
  },

  card: {
    borderRadius: 4,
    // paddingVertical: wp(3),
    marginHorizontal: wp(3),
    // backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#d6c7ef',
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
});

export default TrustScore;
