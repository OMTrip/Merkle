import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const AadharOtpVerificationScreen = () => {
    const route=useRoute();
    const data = route.params.data;
console.log(data,'in adhar otp screen')
    async function verifyadhar(clientid, mobileno, otp) {
        console.log(clientid, otp, 'result of send');
        if (otp) {
          setloading(true);
          try {
            axios
              .post(
                'https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-v2/submit-otp',
                {
                  client_id: clientid,
                  otp: otp,
                  mobile_number: mobileno,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0MTI4OTg5NiwianRpIjoiMmFmODgwMWUtNTU0NC00NDMzLWJlNWYtOGU5ZmFlNThhNDQ4IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmJpdGZsYXNoQGFhZGhhYXJhcGkuaW8iLCJuYmYiOjE2NDEyODk4OTYsImV4cCI6MTk1NjY0OTg5NiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInJlYWQiXX19.8-DTl7BMrqnimNXINKxRymjLp7tEyR96T4jLIG67STg',
                    responseType: 'json',
                  },
                },
              )
              .then(async data => {
                // Process the JSON data here
                if (data?.data) {
                  const res = data?.data;
                  if (res) {
                    const {
                      aadhaar_number,
                      address: {
                        country,
                        dist,
                        house,
                        landmark,
                        loc,
                        po,
                        state,
                        street,
                        subdist,
                        vtc,
                      },
                      care_of,
                      client_id,
                      dob,
                      full_name,
                      gender,
                      profile_image,
                    } = res.data;
    
                    const isexist = await userCollection.checkUser(user?.mobile);
                    if (isexist) {
                      const userdata = await userCollection.getUser(user?.mobile);
                      const uobj = {...userdata};
                      uobj.adhaarNumber = aadhaar_number;
                      uobj.aadharKyc = 1; // Set aadharKyc to 1
                      uobj.address = {
                        country,
                        dist,
                        house,
                        landmark,
                        loc,
                        po,
                        state,
                        street,
                        subdist,
                        vtc,
                      };
                      uobj.care_of = care_of;
                      uobj.dob = dob;
                      uobj.fullName = full_name;
                      uobj.gender = gender;
                      uobj.profile_image = profile_image;
    
                      await userCollection.updateUser({...uobj});
                      const user_data = {
                        mobile: user?.mobile,
                        name: full_name,
                      };
                      const user_kyc_status = {
                        aadharkyc: 1,
                        pankyc: 1,
                        aadhardockyc: 0,
                      };
                      if (profile_image) {
                        dispatch(setUserLogo(profile_image));
                      }
                      dispatch(setUserKycStatus(user_kyc_status));
                      dispatch(setUserData(user_data));
                      Toast.show({
                        type: 'success',
                        text1: 'Your Adhaar is verified',
                        text2: 'Thank you!',
                      });
                      // if(isNameSame){
                      navigation.navigate('DocumentVerificationScreen');
                      //   setloading(false);
                      // }
                    }
                  }
                }
              })
              .catch(error => {
                console.error(error);
              });
          } catch (e) {
            Toast.show({
              type: 'error',
              text1: 'Something webt wrong',
              text2: 'Please try again',
            });
            console.log(e, 'error in verifyadhaar');
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Invalid OTP',
            text2: 'Please enter valid OTP',
          });
        }
      }
    
      function check(otp) {
        if (adhardata) {
          verifyadhar(adhardata?.data?.client_id, '', otp);
        //   setOtpModalVisible(true);
    
        } else {
          checkadhaar(adhaarNumber);
        }
      }
  return (
    <View>
      <View style={styles.input}>
        <TextInput
          placeholder="Enter OTP"
          placeholderTextColor={'#444'}
          value={Otp}
          keyboardType="numeric"
          onChangeText={val => setOtp(val)}
          style={{flex: 0.94}}
          color={'#000'}
        />
      </View>

      <View style={styles.infowrapper}>
        <Text style={styles.listItem}>
          A one-time password (OTP) has been sent to the mobile number linked to
          your account.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.send, isButtonDisabled ? styles.sendDisabled : null]}
        onPress={() => {
          check(Otp);
        }}
        disabled={isButtonDisabled}>
        {loading ? (
          <ActivityIndicator
            size={20}
            color={'#fff'}
            style={{marginHorizontal: 5}}
          />
        ) : null}
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
          Proceed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AadharOtpVerificationScreen;

const styles = StyleSheet.create({});
