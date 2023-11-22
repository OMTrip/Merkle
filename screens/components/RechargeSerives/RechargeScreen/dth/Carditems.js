import React, {useState} from 'react';
import {Avatar, Card, IconButton} from 'react-native-paper';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Carditems = props => {
  const {source, title, onPress, Iscard, backgroundColor, cardicon} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageLoadError = () => {
    setIsLoading(false);
    setImageError(true);
  };
  return (
    <>
      {Iscard === true ? (
        <Card.Title        
          title={title}
          right={() => (
            <TouchableWithoutFeedback onPress={onPress}>
              {isLoading && (
                <ActivityIndicator
                  size="large"
                  color="#000"
                  style={styles.loader}
                />
              )}

              {!isLoading && !imageError && (
                <Image
                  source={source}
                  resizeMode="contain"
                  style={styles.imageDefault}
                  onLoad={handleImageLoad}
                  onError={handleImageLoadError}
                />
              )}
              {/* <Image
                source={source}
                resizeMode="contain"
                style={styles.imagedefault}
                onLoad={handleImageLoad}
                onError={handleImageLoadError}
              /> */}
            </TouchableWithoutFeedback>
          )}
        />
      ) : (
        <>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: wp(2),
              paddingHorizontal: 10,
              backgroundColor:'#fff',
              marginVertical: wp(1),
              borderRadius:wp(2)
            }}
            onPress={onPress}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#eee',
                backgroundColor: '#f3f4f7',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={source}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  borderWidth: 0.5,
                  borderColor: '#eee',
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flex:1}}>
                <Text
                  style={{
                    marginLeft: wp(5),
                    fontSize: wp(3.6),
                    fontWeight: '600',
                    color: '#000',
                    lineHeight:20,
                    maxWidth: '95%',
                    flexWrap:'wrap'
                  }}>
                  {title}
                </Text>
              </View>
              <View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={20}
                  color={'#999'}
                  style={styles.infoIcon}
                />
              </View>
            </View>
          </TouchableOpacity>
          {/* <Card.Title
            style={[
              styles.DefaultCard,
              {backgroundColor: backgroundColor, backgroundColor: '#fff'},
            ]}
            title={title}
            titleStyle={{
              marginLeft: wp(5),
              fontSize: wp(4.2),
              fontWeight: '500',
            }}
            left={() => (
              <TouchableWithoutFeedback onPress={onPress}>
                <Image
                  source={source}
                  style={{width: 46, height: 46, borderRadius: 30}}
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
            )}
          /> */}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Card: {
    margin: wp(1),
    backgroundColor: '#E7E6DD',
    // backgroundColor:"red"
  },
  DefaultCard: {
    marginBottom: wp(2),
  },
  imagedefault: {
    width: wp(10),
    height: hp(4),
  },
});

export default Carditems;
