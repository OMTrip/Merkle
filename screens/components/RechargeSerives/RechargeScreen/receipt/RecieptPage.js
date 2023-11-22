import React,{useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeHeader from '../../../HomeScreen/HomeHeader';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { htmlTemplate } from './htmlTemplate';
import { useNavigation } from '@react-navigation/native';
import { cutAfterDecimal, tax } from '../../../../../Utils/web3/helperFunction';


const ReceiptPage = ({route}) => {
  const navigation = useNavigation()
  const {
    params: {data,response,operator,number,type,priceInInr},
  } = route;

 

  const generatePDF = async () => {
    try {
      const options = {
        html:  `${htmlTemplate()}`,
        fileName: 'receipt',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);

      const shareOptions = {
        title: 'Share PDF',
        url: `file://${pdf.filePath}`,
        type: 'application/pdf',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error generating and sharing PDF:', error);
    }
  };


  return (
    <View style={styles.box}>
      <LinearGradient
        colors={['#52c234', '#061700']}
        start={{x: 0, y: 0}} // Start point of the gradient (top-left)
        end={{x: 1, y: 0}} // End point of the gradient (top-right)
        style={{
          height: hp(10),
          justifyContent: 'center',
          paddingHorizontal: hp(3),
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          title={'Reciept'}
          TextTitle={true}
          menu={false}
        />
      </LinearGradient>
      <View style={styles.bgSuccess}>
        <Text style={{color: '#fff', fontSize: 16}}>Payment Successfull</Text>
      </View>
      <View style={styles.planInfo}>
        <View style={styles.subContainer}>
          <Text style={{color: '#000', fontSize: 16}}>{operator?.operator_name}</Text>
          <Text style={{color: '#000', fontSize: 16}}>{number}</Text>
          <Text style={{color: '#535852', fontSize: 12}}>
            OrderId: {response?.order_id}{' '}
            <EntypoIcon
              name={'dot-single'}
              size={20}
              style={{
                // paddingBottom: hp(2.1),
                color: '#535852',
                position: 'absolute',
                bottom: 10,
              }}
            />{' '}
            {new Date().toLocaleString()}
          </Text>
        </View>
        <Image
          style={{
            width: 50,
            height: 50,
            alignSelf: 'flex-start',
            marginTop: 8.5,
            marginHorizontal: 2,
          }}
          source={require('./../../../../assets/mobileProvider/nute.png')}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={{color: '#535852', fontSize: 14, lineHeight: 20}}>
          For any queries regarding recharge contract Jio with reference number
          180025848988.{' '}
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.actionBtn} onPress={generatePDF}>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText} onPress={()=>{navigation.navigate("Home");}}>Pay Another Bill</Text>
          </TouchableOpacity>
        </View>
      </View>
     {type?.short=="mobile" && <View style={styles.subContainer}>
        <Text style={{color: '#535852', fontSize: 16, fontWeight: 600}}>
         PLAN DETAILS
        </Text>
        <View style={{paddingVertical:10}}>
         <Text style={styles.colorDark}>6GB Data, 200 SMS/day, Jio Cinema, Wynk Music </Text>
         <Text style={[styles.colorDark,{fontWeight:600,fontSize:14}]}>Validity: 600 days</Text>
        </View>
      </View>}
      <View style={styles.subContainer}>
        <Text style={{color: '#535852', fontSize: 16, fontWeight: 600}}>
         PAYMENT DETAILS
        </Text>
        <View style={styles.row}>
        <View>
          <Text style={styles.tableText}>Order Id</Text>
        </View>
        <View>
          <Text style={styles.tableText}> {response?.order_id}</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View>
          <Text style={styles.tableText}>Recharge Amount</Text>
        </View>
        <View>
          <Text style={styles.tableText}><Icon name="rupee" size={12} color="#000"/> {data?.rs}</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View>
          <Text style={styles.tableText}>TDS (1%)</Text>
        </View>
        <View>
          <Text style={styles.tableText}><Icon name="rupee" size={12} color="#000"/> {(tax.TDS) * Number(data.rs)}</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View>
          <Text style={styles.tableText}>Service Tax</Text>
        </View>
        <View>
          <Text style={styles.tableText}><Icon name="rupee" size={12} color="#000"/> {tax.service}</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View>
          <Text style={styles.tableText}>Total (Rs.)</Text>
        </View>
        <View>
          <Text style={styles.tableText}><Icon name="rupee" size={12} color="#000"/> {cutAfterDecimal(
                    (Number(data.rs) + ((tax.TDS) * Number(data.rs)) + tax?.service),
                    6,
                  )}</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View>
          <Text style={styles.tableText}>Total (BNB)</Text>
        </View>
        <View>
          <Text style={styles.tableText}>{cutAfterDecimal(
                    (Number(data.rs) + (tax.TDS) * Number(data.rs) + tax?.service) /
                      Number(priceInInr?.price),
                    6,
                  )}</Text>
        </View>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  subContainer:{justifyContent: 'center', padding: 15},
  bgSuccess: {
    backgroundColor: '#52c234',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  actionBtn: {
    marginRight: 10,
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#52c234',
    borderRadius:5
  },
  actionText:{
    color:"#52c234"
  },
  colorDark:{
    color:"#000",

    lineHeight:24
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:7
  },
  tableText:{
    fontSize:16,
    color:"#535852"
  }

});

export default ReceiptPage;
